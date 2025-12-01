import { PrismaClient } from "@prisma/client";
import { WorkoutVolume } from "../validators/workout";

const prisma = new PrismaClient();

export const countWorkouts = async (
  startDate: Date,
  endDate: Date,
  userId: number
) => {
  return await prisma.workout.count({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
      userId,
    },
  });
};

export const getWorkoutVolume = async (
  startDate: Date,
  endDate: Date,
  userId: number
): Promise<WorkoutVolume[]> => {
  return await prisma.workout.findMany({
    where: {
      userId,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      id: true,
      createdAt: true,
      name: true,
      exercices: {
        select: { id: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });
};

export const getWorkoutExercicesId = async (
  startDate: Date,
  endDate: Date,
  userId: number
) => {
  return await prisma.workout.findMany({
    where: {
      userId,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      exercices: {
        select: { id: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });
};
