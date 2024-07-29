import { Router, Response, Request } from "express";
import { bodyValidator } from "../middlewares/bodyValidator";
import { UserCreate, UserWithoutPassword } from "../validators/user";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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

router.post("/login", async (req: Request, res: Response) => {
  const body = req.body;
  const user = await prisma.user.findUnique({
    where: { email: body.email },
    select: UserWithoutPassword,
  });
  if (user) res.status(200).send(user);
  res.status(400).send({ error: "User not found." });
});

export default router;
