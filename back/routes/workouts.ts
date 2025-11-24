import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { UserReq } from "../interfaces/request";
import { bodyValidator } from "../middlewares/bodyValidator";
import {
  WorkoutCreate,
  WorkoutCreateFull,
  WorkoutCreateFullType,
  WorkoutCreateType,
  WorkoutExercicesPositionsType,
  WorkoutUpdate,
  WorkoutUpdateType,
} from "../validators/workout";

const router = Router();
const prisma = new PrismaClient();

router.get("", async (req: Request, res: Response) => {
  const workouts = await prisma.workout.findMany({
    where: {
      createdBy: (req as UserReq).user,
    },
  });
  res.status(200).json(workouts);
  return;
});

router.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
  const workoutId = parseInt(req.params.id);
  try {
    const workout = await prisma.workout.findUnique({
      where: {
        id: workoutId,
        createdBy: (req as UserReq).user,
      },
      include: {
        exercices: {
          include: { sets: true },
        },
      },
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post(
  "",
  bodyValidator(WorkoutCreate),
  async (req: Request<{}, {}, WorkoutCreateType>, res: Response) => {
    const { name, createdAt } = req.body;
    const workout = await prisma.workout.create({
      data: {
        name,
        createdAt,
        userId: (req as UserReq).user.id,
      },
    });
    res.status(200).json(workout);
  }
);

router.post(
  "/full",
  bodyValidator(WorkoutCreateFull),
  async (req: Request<{}, {}, WorkoutCreateFullType>, res: Response) => {
    const { exercices, ...workout } = req.body;
    const sets = exercices.map((ex: any) => {
      return ex.sets;
    });
    try {
      await prisma.$transaction(async (tx) => {
        const createdWorkout = await tx.workout.create({
          data: {
            userId: (req as UserReq).user.id,
            ...workout,
          },
        });
        await tx.exercice.createMany({
          data: exercices.map((ex: any) => {
            delete ex.sets;
            return {
              workoutId: createdWorkout.id,
              userId: (req as UserReq).user.id,
              ...ex,
            };
          }),
        });
        const createdExercices = await tx.exercice.findMany({
          where: {
            workoutId: createdWorkout.id,
          },
        });

        const setsToCreate = createdExercices
          .map((exercice, index) => {
            return sets[index].map((set: any) => {
              set.exerciceId = exercice.id;
              set.userId = (req as UserReq).user.id;
              return set;
            });
          })
          .flat();
        await tx.set.createMany({ data: setsToCreate });
      });
    } catch (error) {
      res.status(400).json({ error });
      return;
    }
    res.json({ succes: true });

    return;
  }
);

router.put(
  "/:id",
  bodyValidator(WorkoutUpdate),
  async (
    req: Request<{ id: string }, {}, WorkoutUpdateType>,
    res: Response
  ) => {
    const workoutId = req.params.id;
    const body = req.body;
    try {
      const workout = await prisma.workout.update({
        where: { id: parseInt(workoutId) },
        data: body,
      });
      res.status(200).json(workout);
    } catch (error) {
      res.status(400).json({ error });
    }
    return;
  }
);

router.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
  const workoutId = req.params.id;
  try {
    await prisma.workout.delete({
      where: { id: parseInt(workoutId) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error });
  }
  return;
});

router.post(
  "/:id/positions",
  async (
    req: Request<{ id: string }, {}, WorkoutExercicesPositionsType>,
    res: Response
  ) => {
    const { id } = req.params;
    const { position, exerciceId } = req.body;
    const workoutId = Number(id);

    if (isNaN(exerciceId)) {
      res.status(404).json({ error: "Exercice id must be a number." });
    }

    try {
      const workout = await prisma.workout.findFirstOrThrow({
        where: { id: workoutId },
      });

      const selectedExercice = await prisma.exercice.findFirstOrThrow({
        where: { id: exerciceId, workoutId },
      });

      if (!selectedExercice) {
        res
          .status(404)
          .json({ error: "Set id does not exists in this exercice" });
        return;
      }

      if (position === selectedExercice.position) {
        res.status(200).json(workout);
        return;
      }

      const increment = selectedExercice.position < position ? -1 : 1;

      const initPosition: number = selectedExercice.position;
      const minPos = Math.min(initPosition, position);
      const maxPos = Math.max(initPosition, position);

      await prisma.exercice.updateMany({
        where: {
          workoutId,
          userId: (req as UserReq).user.id,
          position: { gte: minPos, lte: maxPos },
          NOT: { id: selectedExercice.id },
        },
        data: { position: { increment } },
      });

      await prisma.exercice.update({
        where: { id: selectedExercice.id },
        data: { position },
      });

      const updatedExercice = await prisma.exercice.findFirstOrThrow({
        where: {
          id: exerciceId,
          userId: (req as UserReq).user.id,
        },
      });
      res.status(200).json(updatedExercice);
      return;
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

export default router;
