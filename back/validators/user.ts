import { z } from "zod";
import { Prisma } from "@prisma/client";

export const UserCreate = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

export const UserWithoutPassword: Prisma.UserSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
};
