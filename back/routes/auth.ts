import { Router, Response, Request } from "express";
import { bodyValidator } from "../middlewares/bodyValidator";
import { UserCreate, UserWithoutPassword } from "../validators/user";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { User } from "../interfaces/user";
import { error } from "console";

const router = Router();
const prisma = new PrismaClient();

router.post(
  "/register",
  bodyValidator(UserCreate),
  async (req: Request, res: Response) => {
    const body = req.body;
    const exists: number = await prisma.user.count({
      where: { email: body.email },
    });
    if (exists > 0) {
      res.status(400).send({ error: "Email already exists" });
      return;
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(body.password, salt, async function (err, hash) {
        const data = { ...body, password: hash };
        const user = await prisma.user.create({ data: data });
        res.status(200).send(user);
      });
    });
  }
);

router.post("/login", async (req: Request, res: Response) => {
  const body = req.body;
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user) {
    bcrypt.compare(body.password, user?.password, (err, result) => {
      if (err) {
        res.status(500).send({ error: "Internal server error" });
        return;
      } else if (result) {
        const accessToken = jwt.sign(
          { id: user.id },
          process.env.AUTH_SECRET as Secret,
          {
            expiresIn: "2 days",
          }
        );
        res.status(200).send({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          accessToken: accessToken,
        });
      } else {
        res.status(401).send({ error: "Invalid username or password" });
      }
    });
    return;
  }

  res.status(400).send({ error: "User not found." });
});

router.get("/me", async (req: Request, res: Response) => {
  const authToken = req.headers.authorization?.split("Bearer ")[1];
  if (!authToken) {
    res.status(404).send({ error: "User not found." });
    return;
  }
  try {
    const payload = jwt.verify(
      authToken as string,
      process.env.AUTH_SECRET as Secret
    ) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: UserWithoutPassword,
    });
    res.status(200).send(user);
    return;
  } catch (error) {
    res.status(401).send({ error: error });
    return;
  }
});

export default router;
