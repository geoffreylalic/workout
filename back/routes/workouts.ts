import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction, Router } from "express";
import { UserReq } from "../interfaces/request";
import {
  WorkoutCreate,
  WorkoutCreateFull,
  WorkoutUpdate,
} from "../validators/workout";
import { bodyValidator } from "../middlewares/bodyValidator";

const router = Router();
const prisma = new PrismaClient();

router.get("", async (req: UserReq, res: Response, next: NextFunction) => {
  const workouts = await prisma.workout.findMany({
    where: {
      createdBy: req.user,
    },
  });
  res.status(200).send(workouts);
  return;
});

router.post(
  "",
  bodyValidator(WorkoutCreate),
  async (req: UserReq, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const workout = await prisma.workout.create({
      data: {
        name: name,
        userId: req.user.id,
      },
    });
    res.status(200).send(workout);
  }
);

router.post(
  "/full",
  bodyValidator(WorkoutCreateFull),
  async (req: UserReq, res: Response, next: NextFunction) => {
    const { exercices, ...workout } = req.body;
    const sets = exercices.map((ex: any) => {
      return ex.sets;
    });
    try {
      await prisma.$transaction(async (tx) => {
        const createdWorkout = await tx.workout.create({
          data: {
            userId: req.user.id,
            ...workout,
          },
        });
        await tx.exercice.createMany({
          data: exercices.map((ex: any) => {
            delete ex.sets;
            return {
              workoutId: createdWorkout.id,
              userId: req.user.id,
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
              set.userId = req.user.id;
              return set;
            });
          })
          .flat();
        await tx.set.createMany({ data: setsToCreate });
      });
    } catch (error) {
      res.status(400).send(error);
      return;
    }
    res.send({ succes: true });

    return;
  }
);

router.put(
  "/:id",
  bodyValidator(WorkoutUpdate),
  async (req: UserReq, res: Response, next: NextFunction) => {
    const workoutId = req.params.id;
    const body = req.body;
    try {
      const workout = await prisma.workout.update({
        where: { id: parseInt(workoutId) },
        data: body,
      });
      res.status(200).send(workout);
    } catch (error) {
      res.status(400).send({ error: error });
    }
    return;
  }
);

router.delete(
  "/:id",
  async (req: UserReq, res: Response, next: NextFunction) => {
    const workoutId = req.params.id;
    try {
      await prisma.workout.delete({
        where: { id: parseInt(workoutId) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).send({ error: error });
    }
    return;
  }
);

export default router;
