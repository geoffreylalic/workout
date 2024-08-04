import { z } from "zod";

export const WorkoutCreate = z.object({
  name: z.string(),
});


export const WorkoutUpdate = z.object({
  name: z.string(),
});