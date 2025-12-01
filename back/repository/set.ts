import { PrismaClient } from "@prisma/client";
import {
  SetSum,
  SetSumWeight,
  SetSumWeightByExercice,
} from "../validators/set";

const prisma = new PrismaClient();

export const getSumWeightRepetitionRestSet = async (
  foundExercices: number[]
): Promise<SetSum[]> => {
  const result = await prisma.set.groupBy({
    by: ["exerciceId"],
    _sum: { weight: true, repetitions: true, rest: true },
    where: { exerciceId: { in: foundExercices } },
  });

  return result;
};

export const getSumWeightSet = async (
  foundExercices: number[]
): Promise<SetSumWeight> => {
  const result = await prisma.set.aggregate({
    _sum: { weight: true },
    where: { exerciceId: { in: foundExercices } },
  });

  return result;
};

export const getSumWeightSetByExercice = async (
  foundExercices: number[]
): Promise<SetSumWeightByExercice[]> => {
  const result = await prisma.set.groupBy({
    by: ["exerciceId"],
    _sum: { weight: true },
    where: { exerciceId: { in: foundExercices } },
  });

  return result;
};
