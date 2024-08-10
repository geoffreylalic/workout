import { z } from "zod";

export const SetCreate = z.object({
  repetitions: z.number(),
  weight: z.number(),
  rest: z.string().datetime(),
});


export const SetId = z.object({
  id: z.number()
});