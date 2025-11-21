import { PrismaClient } from "@prisma/client";
import { Response, NextFunction, Router, Request } from "express";
import { UserReq } from "../interfaces/request";
import { bodyValidator } from "../middlewares/bodyValidator";
import {
  ExerciceCreate,
  ExerciceCreateType,
  ExercicePut,
  ExercicePutType,
  ExerciceSetCreate,
  ExerciceSetCreateType,
  ExerciceSetPositionsType,
} from "../validators/exercice";
import { timeToDatetime } from "../validators/set";

const router = Router();
const prisma = new PrismaClient();

router.get("", async (req: Request, res: Response) => {
  const exercices = await prisma.exercice.findMany({
    where: {
      createdBy: (req as UserReq).user,
    },
  });
  res.status(200).json(exercices);
});

router.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
  const exerciceId = req.params.id;
  const exercice = await prisma.exercice.findFirst({
    where: {
      createdBy: (req as UserReq).user,
      id: parseInt(exerciceId),
    },
    include: {
      sets: true,
    },
  });
  res.status(200).json(exercice);
});

router.post(
  "",
  bodyValidator(ExerciceCreate),
  async (req: Request<{}, {}, ExerciceCreateType>, res: Response) => {
    const { name, workoutId, position } = req.body;
    const exercice = await prisma.exercice.create({
      data: {
        name,
        position,
        workout: { connect: { id: workoutId } },
        createdBy: { connect: { id: (req as UserReq).user.id } },
      },
    });
    res.json(exercice);
  }
);

router.post(
  "/sets",
  bodyValidator(ExerciceSetCreate),
  async (req: Request<{}, {}, ExerciceSetCreateType>, res: Response) => {
    const { name, sets, workoutId } = req.body;
    try {
      await prisma.$transaction(async (tx) => {
        const createdExercice = await tx.exercice.create({
          data: {
            userId: (req as UserReq).user.id,
            name: name,
            workoutId: workoutId,
          },
        });

        await tx.set.createMany({
          data: sets.map((set: any) => {
            set.rest = timeToDatetime.parse(set.rest);
            return {
              exerciceId: createdExercice.id,
              userId: (req as UserReq).user.id,
              ...set,
            };
          }),
        });
        res.json(createdExercice);
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error });
      return;
    }
  }
);

router.put(
  "/:id",
  bodyValidator(ExercicePut),
  async (req: Request<{ id: string }, {}, ExercicePutType>, res: Response) => {
    const exerciceId = req.params.id;
    const body = req.body;
    try {
      const exercice = await prisma.exercice.update({
        where: { id: parseInt(exerciceId) },
        data: body,
      });
      res.status(200).json(exercice);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
);

router.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
  const exerciceId = req.params.id;
  try {
    await prisma.exercice.delete({
      where: { id: parseInt(exerciceId) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post(
  "/:id/positions",
  async (
    req: Request<{ id: string }, {}, ExerciceSetPositionsType>,
    res: Response
  ) => {
    const { id } = req.params;
    const { position, setId } = req.body;
    const exerciceId = Number(id);

    if (isNaN(exerciceId)) {
      res.status(404).json({ error: "Exercice id must be a number." });
    }

    try {
      const exercice = await prisma.exercice.findFirstOrThrow({
        where: { id: Number(id) },
      });

      const selectedSet = await prisma.set.findFirstOrThrow({
        where: { id: setId, exerciceId },
      });

      if (!selectedSet) {
        res
          .status(404)
          .json({ error: "Set id does not exists in this exercice" });
        return;
      }

      if (position === selectedSet.position) {
        res.status(200).json(exercice);
        return;
      }

      const increment = selectedSet.position < position ? -1 : 1;

      const initPosition: number = selectedSet.position;
      const minPos = Math.min(initPosition, position);
      const maxPos = Math.max(initPosition, position);

      await prisma.set.updateMany({
        where: {
          exerciceId,
          userId: (req as UserReq).user.id,
          position: { gte: minPos, lte: maxPos },
          NOT: { id: selectedSet.id },
        },
        data: { position: { increment } },
      });

      await prisma.set.update({
        where: { id: selectedSet.id },
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
