import { z } from "zod";
import { SetCreate } from "./set";

export const ExerciceCreateFull = z.object({
  name: z.string(),
  sets: z.array(SetCreate),
});

export const ExerciceCreate = z.object({
  name: z.string(),
  workoutId: z.number(),
});

export const ExercicePut = z.object({
  name: z.string()
});

export const ExerciceId = z.object({
  id: z.number(),
});
