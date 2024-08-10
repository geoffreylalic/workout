import { z } from "zod";
import { SetCreate } from "./set";

export const ExerciceCreate = z.object({
  name: z.string(),
  sets: z.array(SetCreate),
});

export const ExerciceId = z.object({
  id: z.number(),
});
