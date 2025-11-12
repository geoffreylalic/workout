import { z } from "zod";
import { SetCreateFull } from "./set";

export const ExerciceCreateFull = z.object({
  name: z.string(),
  sets: z.array(SetCreateFull),
});

export const ExerciceCreate = z.object({
  name: z.string(),
  workoutId: z.number(),
});

export type ExerciceCreateType = z.infer<typeof ExerciceCreate>;

export const ExerciceSetCreate = z.object({
  name: z.string(),
  workoutId: z.number(),
  sets: z.array(SetCreateFull),
});

export type ExerciceSetCreateType = z.infer<typeof ExerciceSetCreate>;

export const ExercicePut = z.object({
  name: z.string(),
});

export type ExercicePutType = z.infer<typeof ExercicePut>;

export const ExerciceId = z.object({
  id: z.number(),
});
