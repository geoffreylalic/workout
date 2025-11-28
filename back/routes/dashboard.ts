import { PrismaClient } from "@prisma/client";
import e, { Response, NextFunction, Router, Request } from "express";
import { UserReq } from "../interfaces/request";
import dayjs from "dayjs";
import {
  VolumeRange,
  VolumeRangeType,
  type Period,
} from "../validators/dashboard";
import { parse } from "path";
const router = Router();
const prisma = new PrismaClient();

router.get(
  "/volume",
  async (req: Request<{}, {}, {}, VolumeRangeType>, res: Response) => {
    const validated = VolumeRange.safeParse(req.query);
    if (!validated.success) {
      return res.status(400).json(validated.error);
    }
    const { startDate, endDate } = validated.data;

    const workouts = await prisma.workout.findMany({
      where: {
        userId: (req as UserReq).user.id,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        id: true,
        createdAt: true,
        exercices: {
          select: { id: true },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    const foundExercices = workouts.flatMap((w) =>
      w.exercices.map((ex) => ex.id)
    );

    const sets = await prisma.set.groupBy({
      by: ["exerciceId"],
      _sum: { weight: true, repetitions: true, rest: true },
      where: {
        exerciceId: { in: foundExercices },
      },
    });

    const setsMap = new Map(
      sets.map((s) => [
        s.exerciceId,
        {
          weight: s._sum?.weight ?? 0,
          repetitions: s._sum?.repetitions ?? 0,
          rest: s._sum?.rest ?? 0,
        },
      ])
    );

    const result = workouts.map((w) => {
      return {
        createdAt: dayjs(w.createdAt).format("YYYY-MM-DD"),
        weight: w.exercices.reduce(
          (acc, ex) => acc + (setsMap.get(ex.id)?.weight ?? 0),
          0
        ),
        repetitions: w.exercices.reduce(
          (acc, ex) => acc + (setsMap.get(ex.id)?.repetitions ?? 0),
          0
        ),
        rest: w.exercices.reduce(
          (acc, ex) => acc + (setsMap.get(ex.id)?.rest ?? 0),
          0
        ),
      };
    });

    res.status(200).json(result);
  }
);

export default router;
