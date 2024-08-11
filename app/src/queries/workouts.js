import { client, CONFIG } from "./axios";

export const getWorkouts = async () => {
  return await client.get("/workouts", CONFIG);
};
