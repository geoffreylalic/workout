import { PrismaClient } from "@prisma/client";
import { Response, Router, Request } from "express";
import { UserReq } from "../interfaces/request";
import dayjs from "dayjs";
import { VolumeRange, VolumeRangeType } from "../validators/dashboard";
import { getAvgVolume, getTopWorkout, getVolume } from "../services/dashboard";
import { countWorkouts } from "../repository/workout";
const router = Router();
const prisma = new PrismaClient();

router.get(
  "/metrics",
  async (req: Request<{}, {}, {}, VolumeRangeType>, res: Response) => {
    const validated = VolumeRange.safeParse(req.query);
    if (!validated.success) {
      return res.status(400).json(validated.error);
    }
    const userId = (req as UserReq).user.id;
    const { startDate, endDate } = validated.data;
    const [volume, nbWorkout, avgVolume, topWorkout] = await Promise.all([
      getVolume(startDate, endDate, userId),
      countWorkouts(startDate, endDate, userId),
      getAvgVolume(startDate, endDate, userId),
      getTopWorkout(startDate, endDate, userId),
    ]);

    res.status(200).json({ volume, nbWorkout, avgVolume, topWorkout });
  }
);

export default router;
