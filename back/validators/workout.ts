import { z } from "zod";
import { ExerciceCreate } from "./exercice";

export const WorkoutCreate = z.object({
  name: z.string(),
  exercices: z.array(ExerciceCreate),
});

export const WorkoutUpdate = z.object({
  name: z.string(),
});
