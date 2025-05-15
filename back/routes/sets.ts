import { PrismaClient } from "@prisma/client";
import { Response, NextFunction, Router } from "express";
import { UserReq } from "../interfaces/request";
import { WorkoutUpdate } from "../validators/workout";
import { bodyValidator } from "../middlewares/bodyValidator";
import { ExerciceCreate, ExercicePut } from "../validators/exercice";
import { SetCreate, SetPut, timeToDatetime } from "../validators/set";

const router = Router();
const prisma = new PrismaClient();

router.get("", async (req: UserReq, res: Response, next: NextFunction) => {
  const sets = await prisma.set.findMany({
    where: {
      createdBy: req.user,
    },
  });
  res.status(200).send(sets);
});

router.get("/:id", async (req: UserReq, res: Response, next: NextFunction) => {
  const setId = req.params.id;
  const set = await prisma.set.findFirst({
    where: {
      createdBy: req.user,
      id: parseInt(setId),
    },
  });
  res.status(200).send(set);
});

// router.post(
//   "",
//   bodyValidator(SetCreate),
//   async (req: UserReq, res: Response, next: NextFunction) => {
//     const { repetitions, weight, rest, exerciceId } = req.body;
//     const restDateTime = timeToDatetime.parse(rest);
//     const exercice = await prisma.set.create({
//       data: {
//         repetitions,
//         weight,
//         rest: restDateTime,
//         createdBy: { connect: { id: req.user.id } },
//         exercice: { connect: { id: exerciceId } },
//       },
//     });
//     res.send({ exercice });
//   }
// );

router.post(
  "",
  bodyValidator(SetCreate),
  async (req: UserReq, res: Response, next: NextFunction) => {
    const { exerciceId } = req.body;
    const set = await prisma.set.create({
      data: {
        exercice: { connect: { id: exerciceId } },
        createdBy: { connect: { id: req.user.id } },
      },
    });
    res.send(set);
  }
);

router.put(
  "/:id",
  bodyValidator(SetPut),
  async (req: UserReq, res: Response, next: NextFunction) => {
    const setId = req.params.id;
    const body = { ...req.body, rest: timeToDatetime.parse(req.body.rest) };
    try {
      const set = await prisma.set.update({
        where: { id: parseInt(setId), createdBy: req.user },
        data: body,
      });
      res.status(200).send(set);
    } catch (error) {
      res.status(400).send({ error: error });
    }
  }
);

router.delete(
  "/:id",
  async (req: UserReq, res: Response, next: NextFunction) => {
    const setId = req.params.id;
    try {
      await prisma.set.delete({
        where: { id: parseInt(setId), createdBy: req.user },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).send({ error: error });
    }
  }
);

export default router;
