import { z } from "zod";
import { Prisma } from "@prisma/client";

export const UserCreate = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

export type UserCreateType = z.infer<typeof UserCreate>;

export const UserWithoutPassword: Prisma.UserSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
};

export const UserLogin = z.object({
  email: z.string(),
  password: z.string(),
});

export type UserLoginType = z.infer<typeof UserLogin>;
