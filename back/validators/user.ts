import { z } from "zod";

export const UserCreate = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});
