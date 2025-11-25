import { PrismaClient } from "@prisma/client";
import e, { Response, NextFunction, Router, Request } from "express";
import { UserReq } from "../interfaces/request";
import dayjs from "dayjs";
import { type Period } from "../validators/dashboard";
const router = Router();
const prisma = new PrismaClient();

router.get(
  "/volume",
  async (req: Request<{}, {}, {}, { period?: Period }>, res: Response) => {
    const currentPeriod: Period = !req.query.period
      ? "current_week"
      : req.query.period;

    let startDate = null;
    let endDate = null;

    if (!currentPeriod) {
      return res.status(400).json({ error: "Missing period query parameter" });
    }

    if (currentPeriod === "current_week") {
      startDate = dayjs().startOf("week").toDate();
      endDate = dayjs().endOf("week").toDate();
    } else if (currentPeriod === "last_week") {
      startDate = dayjs().startOf("week").subtract(1, "week").toDate();
      endDate = dayjs().endOf("week").subtract(1, "week").toDate();
    } else if (currentPeriod === "current_month") {
      startDate = dayjs().startOf("month").toDate();
      endDate = dayjs().endOf("month").toDate();
    } else if (currentPeriod === "last_month") {
      startDate = dayjs().startOf("month").subtract(1, "month").toDate();
      endDate = dayjs().endOf("month").subtract(1, "month").toDate();
    } else {
      return res.status(400).json({ error: "Invalid period" });
    }

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
    });

    const foundExercices = workouts.flatMap((w) =>
      w.exercices.map((ex) => ex.id)
    );

    const sets = await prisma.set.groupBy({
      by: ["exerciceId"],
      _sum: { weight: true },
      where: {
        exerciceId: { in: foundExercices },
      },
    });

    const setsMap = new Map(
      sets.map((s) => [s.exerciceId, s._sum?.weight ?? 0])
    );

    const result = workouts.map((w) => ({
      createdAt: dayjs(w.createdAt).format("YYYY-MM-DD"),
      totalWeight: w.exercices.reduce(
        (acc, ex) => acc + (setsMap.get(ex.id) ?? 0),
        0
      ),
    }));

    res.status(200).json(result);
  }
);

export default router;
