import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { UserWithoutPassword } from "../validators/user";
import { UserReq } from "../interfaces/request";
import { User } from "../interfaces/user";

const prisma = new PrismaClient();

export const authentication: RequestHandler = async (
  req: Request,
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
    const user: User | null = await prisma.user.findUnique({
      where: { id: payload.id },
      select: UserWithoutPassword,
    });

    if (!user) {
      res.status(401).send({ error: "User not found" });
      return;
    }

    (req as UserReq).user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: error });
    return;
  }
};
