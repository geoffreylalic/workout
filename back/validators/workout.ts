import { z } from "zod";
import { ExerciceCreateFull } from "./exercice";

export const WorkoutCreateFull = z.object({
  name: z.string(),
  exercices: z.array(ExerciceCreateFull),
});

export type WorkoutCreateFullType = z.infer<typeof WorkoutCreateFull>;

export const WorkoutCreate = z.object({
  name: z.string(),
});

export type WorkoutCreateType = z.infer<typeof WorkoutCreate>;

export const WorkoutUpdate = z.object({
  name: z.string(),
});

export type WorkoutUpdateType = z.infer<typeof WorkoutUpdate>;
