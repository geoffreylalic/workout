import { PrismaClient, User } from "@prisma/client";
import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { UserWithoutPassword } from "../validators/user";
import { UserReq } from "../interfaces/request";

const prisma = new PrismaClient();

export const authentication = async (
  req: UserReq,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    res.status(401).send({ error: "Missing authentication prefix." });
    return;
  }
  let payload: JwtPayload;
  try {
    payload = jwt.verify(
      token as string,
      process.env.AUTH_SECRET as Secret
    ) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: UserWithoutPassword,
    });
    req.user = user;
  } catch (error) {
    res.status(401).send({ error: error });
    return;
  }

  next();
};
