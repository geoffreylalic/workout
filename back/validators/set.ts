import { z } from "zod";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // ES 2015
dayjs.extend(utc);

export const SetCreateFull = z.object({
  repetitions: z.number(),
  weight: z.number(),
  rest: z.string().datetime(),
});

export const timeToDatetime = z.string().transform((val) => {
  const elements: string[] = val.split(":");
  // todo : error handling in vanilla js and interpret it in express
  // if (elements.length != 2) {
  //   return new Error("Time parsing is not good, it needs to be: mm:ss");
  // }
  return dayjs()
    .set("hour", 0)
    .set("minute", parseInt(elements[0]))
    .set("second", parseInt(elements[1]))
    .set("millisecond", 0)
    .utc(true)
    .toISOString();
});

export const SetCreate = z.object({
  repetitions: z.number(),
  weight: z.number(),
  rest: z.string(),
  exerciceId: z.number(),
});

export const SetPut = z.object({
  repetitions: z.number(),
  weight: z.number(),
  rest: z.string(),
});

export const SetId = z.object({
  id: z.number(),
});
