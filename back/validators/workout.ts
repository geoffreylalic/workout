import { z } from "zod";
import { ExerciceCreateFull } from "./exercice";

export const WorkoutCreateFull = z.object({
  name: z.string(),
  exercices: z.array(ExerciceCreateFull),
});

export const WorkoutCreate = z.object({
  name: z.string(),
});

export const WorkoutUpdate = z.object({
  name: z.string(),
});
