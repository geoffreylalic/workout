import { PrismaClient } from "@prisma/client";
import { Response, NextFunction, Router, Request } from "express";
import { UserReq } from "../interfaces/request";
import { bodyValidator } from "../middlewares/bodyValidator";
import {
  SetCreate,
  SetCreateType,
  SetPut,
  SetPutType,
} from "../validators/set";
import { User } from "../interfaces/user";

const router = Router();
const prisma = new PrismaClient();

router.get("", async (req: Request, res: Response) => {
  const sets = await prisma.set.findMany({
    where: {
      createdBy: (req as UserReq).user,
    },
  });
  res.status(200).json(sets);
});

router.get("/:id", async (req: Request, res: Response) => {
  const setId = req.params.id;
  const set = await prisma.set.findFirst({
    where: {
      createdBy: (req as UserReq).user,
      id: parseInt(setId),
    },
  });
  res.status(200).json(set);
});

router.post(
  "",
  bodyValidator(SetCreate),
  async (req: Request<{}, {}, SetCreateType>, res: Response) => {
    const { exerciceId } = req.body;
    const set = await prisma.set.create({
      data: {
        exercice: { connect: { id: exerciceId } },
        createdBy: { connect: { id: (req as UserReq).user.id } },
      },
    });
    res.json(set);
  }
);

router.put(
  "/:id",
  bodyValidator(SetPut),
  async (
    req: Request<{ id: string }, { user: User }, SetPutType>,
    res: Response
  ) => {
    const setId = req.params.id;
    try {
      const set = await prisma.set.update({
        where: { id: parseInt(setId), createdBy: (req as UserReq).user },
        data: req.body,
      });
      res.status(200).json(set);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
);

router.delete("/:id", async (req: Request, res: Response) => {
  const setId = req.params.id;
  try {
    await prisma.set.delete({
      where: { id: parseInt(setId), createdBy: (req as UserReq).user },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default router;
