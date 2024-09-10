import { PrismaClient } from "@prisma/client";
import { Response, NextFunction, Router } from "express";
import { UserReq } from "../interfaces/request";
import { WorkoutUpdate } from "../validators/workout";
import { bodyValidator } from "../middlewares/bodyValidator";
import { ExerciceCreate, ExercicePut } from "../validators/exercice";

const router = Router();
const prisma = new PrismaClient();

router.get("", async (req: UserReq, res: Response, next: NextFunction) => {
  const exercices = await prisma.exercice.findMany({
    where: {
      createdBy: req.user,
    },
  });
  res.status(200).send(exercices);
});

router.post(
  "",
  bodyValidator(ExerciceCreate),
  async (req: UserReq, res: Response, next: NextFunction) => {
    const { name, workoutId } = req.body;
    console.log("🚀 ~ workoutId:", workoutId);
    console.log("🚀 ~ name:", name);
    const exercice = await prisma.exercice.create({
      data: {
        name: name,
        workout: { connect: { id: workoutId } },
        createdBy: { connect: { id: req.user.id } },
      },
    });
    res.send({ exercice });
  }
);

router.put(
  "/:id",
  bodyValidator(ExercicePut),
  async (req: UserReq, res: Response, next: NextFunction) => {
    const exerciceId = req.params.id;
    const body = req.body;
    try {
      const exercice = await prisma.exercice.update({
        where: { id: parseInt(exerciceId) },
        data: body,
      });
      res.status(200).send(exercice);
    } catch (error) {
      res.status(400).send({ error: error });
    }
  }
);

router.delete(
  "/:id",
  async (req: UserReq, res: Response, next: NextFunction) => {
    const exerciceId = req.params.id;
    try {
      await prisma.exercice.delete({
        where: { id: parseInt(exerciceId) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).send({ error: error });
    }
  }
);

export default router;
