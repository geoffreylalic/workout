import { z } from "zod";
import { ExerciceCreateFull } from "./exercice";
import { Exercice } from "@prisma/client";

export const WorkoutCreateFull = z.object({
  name: z.string(),
  exercices: z.array(ExerciceCreateFull),
});

export type WorkoutCreateFullType = z.infer<typeof WorkoutCreateFull>;

export const WorkoutCreate = z.object({
  name: z.string(),
  createdAt: z.iso.datetime().optional(),
});

export type WorkoutCreateType = z.infer<typeof WorkoutCreate>;

export const WorkoutUpdate = z.object({
  name: z.string(),
});

export type WorkoutUpdateType = z.infer<typeof WorkoutUpdate>;

export const WorkoutExercicesPositions = z.object({
  exerciceId: z.number(),
  position: z.number(),
});

export type WorkoutExercicesPositionsType = z.infer<
  typeof WorkoutExercicesPositions
>;

export type WorkoutVolume = {
  id: number;
  createdAt: Date | null;
  name: string;
  exercices: Pick<Exercice, "id">[];
};
