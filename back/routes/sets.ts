import { PrismaClient } from "@prisma/client";
import { Response, NextFunction, Router, Request } from "express";
import { UserReq } from "../interfaces/request";
import { bodyValidator } from "../middlewares/bodyValidator";
import { SetCreate, SetPut } from "../validators/set";

const router = Router();
const prisma = new PrismaClient();

router.get("", async (req: Request, res: Response) => {
  const sets = await prisma.set.findMany({
    where: {
      createdBy: (req as UserReq).user,
    },
  });
  res.status(200).send(sets);
});

router.get("/:id", async (req: Request, res: Response) => {
  const setId = req.params.id;
  const set = await prisma.set.findFirst({
    where: {
      createdBy: (req as UserReq).user,
      id: parseInt(setId),
    },
  });
  res.status(200).send(set);
});

router.post(
  "",
  bodyValidator(SetCreate),
  async (req: Request, res: Response, next: NextFunction) => {
    const { exerciceId } = req.body;
    const set = await prisma.set.create({
      data: {
        exercice: { connect: { id: exerciceId } },
        createdBy: { connect: { id: (req as UserReq).user.id } },
      },
    });
    res.send(set);
  }
);

router.put(
  "/:id",
  bodyValidator(SetPut),
  async (req: Request, res: Response, next: NextFunction) => {
    const setId = req.params.id;
    const body = { ...req.body };
    try {
      const set = await prisma.set.update({
        where: { id: parseInt(setId), createdBy: (req as UserReq).user },
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
  async (req: Request, res: Response, next: NextFunction) => {
    const setId = req.params.id;
    try {
      await prisma.set.delete({
        where: { id: parseInt(setId), createdBy: (req as UserReq).user },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).send({ error: error });
    }
  }
);

export default router;
