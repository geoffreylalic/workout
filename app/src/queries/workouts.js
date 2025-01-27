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

export const getWorkout = (id) => {
  return {
    queryFn: async () => {
      return client
        .get(`workouts/${id}`, CONFIG)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => {
          console.error(error);
          return Promise.reject(error);
        });
    },
    queryKey: ["workouts", id],
  };
};

export const createWorkoutFn = (workout) =>
  client.post("/workouts", workout, CONFIG);

export const deleteWorkoutFn = (workoutId) =>
  client.delete(`/workouts/${workoutId}`, CONFIG);
