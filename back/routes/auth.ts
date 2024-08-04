import { Router, Response, Request } from "express";
import { bodyValidator } from "../middlewares/bodyValidator";
import { UserCreate, UserWithoutPassword } from "../validators/user";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { authentication } from "../middlewares/auth";

const router = Router();
const prisma = new PrismaClient();

router.post(
  "/register",
  bodyValidator(UserCreate),
  (req: Request, res: Response) => {
    const body = req.body;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(body.password, salt, async function (err, hash) {
        const data = { ...body, password: hash };
        const user = await prisma.user.create({ data: data });
        res.status(200).send(user);
      });
    });
  }
);

router.post("/login", authentication, async (req: Request, res: Response) => {
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

export default router;
