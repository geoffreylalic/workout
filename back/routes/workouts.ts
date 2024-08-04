import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction, Router } from "express";
import { UserReq } from "../interfaces/request";
import { WorkoutCreate, WorkoutUpdate } from "../validators/workout";
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
    const body = req.body;
    try {
      const workout = await prisma.workout.create({
        data: { ...body, userId: req.user.id },
      });
      res.status(201).send(workout);
    } catch (error) {
      res.status(400).send({ error: error });
    }
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
