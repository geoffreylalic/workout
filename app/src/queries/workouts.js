import { client, CONFIG } from "./axios";

export const getWorkouts = {
  queryFn: async () => {
    return client
      .get("workouts", CONFIG)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },
  queryKey: ["workouts"],
};

export const createWorkoutFn = (workout) =>
  client.post("/workouts", workout, CONFIG);
