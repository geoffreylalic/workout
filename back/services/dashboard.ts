import dayjs from "dayjs";
import { getWorkoutExercicesId, getWorkoutVolume } from "../repository/workout";
import {
  getSumWeightRepetitionRestSet,
  getSumWeightSet,
  getSumWeightSetByExercice,
} from "../repository/set";

export const getVolume = async (
  startDate: Date,
  endDate: Date,
  userId: number
) => {
  try {
    const workouts = await getWorkoutVolume(startDate, endDate, userId);

    const foundExercices = workouts.flatMap((w) =>
      w.exercices.map((ex) => ex.id)
    );

    const sets = await getSumWeightRepetitionRestSet(foundExercices);

    const setsMap = new Map(
      sets.map((s) => [
        s.exerciceId,
        {
          weight: s._sum?.weight ?? 0,
          repetitions: s._sum?.repetitions ?? 0,
          rest: s._sum?.rest ?? 0,
        },
      ])
    );

    return workouts.map((w) => ({
      createdAt: dayjs(w.createdAt).format("YYYY-MM-DD"),
      name: w.name,
      weight: w.exercices.reduce(
        (acc, ex) => acc + (setsMap.get(ex.id)?.weight ?? 0),
        0
      ),
      repetitions: w.exercices.reduce(
        (acc, ex) => acc + (setsMap.get(ex.id)?.repetitions ?? 0),
        0
      ),
      rest: w.exercices.reduce(
        (acc, ex) => acc + (setsMap.get(ex.id)?.rest ?? 0),
        0
      ),
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
};

export const getAvgVolume = async (
  startDate: Date,
  endDate: Date,
  userId: number
) => {
  try {
    const workouts = await getWorkoutExercicesId(startDate, endDate, userId);

    const foundExercices = workouts.flatMap((w) =>
      w.exercices.map((ex) => ex.id)
    );

    const sumWeightSet = await getSumWeightSet(foundExercices);

    const nbWorkout = workouts.length;

    return Math.ceil(
      sumWeightSet._sum.weight !== null
        ? sumWeightSet._sum.weight / nbWorkout
        : 0
    );
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
};

export const getTopWorkout = async (
  startDate: Date,
  endDate: Date,
  userId: number
) => {
  const workoutExerices = await getWorkoutExercicesId(
    startDate,
    endDate,
    userId
  );
  const foundExercices = workoutExerices.flatMap((w) =>
    w.exercices.map((e) => e.id)
  );

  const sumWeightByExercice = await getSumWeightSetByExercice(foundExercices);

  const setsMap = new Map(
    sumWeightByExercice.map((s) => [
      s.exerciceId,
      {
        weight: s._sum?.weight ?? 0,
      },
    ])
  );

  const workouts = workoutExerices.map((w) => {
    return {
      id: w.id,
      name: w.name,
      createdAt: dayjs(w.createdAt).format("YYYY-MM-DD"),
      weight: w.exercices.reduce(
        (acc, ex) => acc + (setsMap.get(ex.id)?.weight ?? 0),
        0
      ),
    };
  });

  return workouts.sort((a, b) => b.weight - a.weight)[0];
};
