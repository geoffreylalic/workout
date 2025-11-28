import z from "zod";

export type Period =
  | "current_week"
  | "last_week"
  | "current_month"
  | "last_month";

export const VolumeRange = z
  .object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  })
  .refine(({ startDate, endDate }) => startDate <= endDate, {
    error: "startDate must be lower than endDate",
    path: ["endDate"],
  })
  .refine(({ endDate }) => endDate < new Date(), {
    error: "endDate must me inferior or equals than today's date",
    path: ["endDate"],
  });

export type VolumeRangeType = z.infer<typeof VolumeRange>;
