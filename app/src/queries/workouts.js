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

export const createWorkoutFn = async (workout) => {
  const res = await client.post("/workouts", workout, CONFIG);
  return res.data;
};

export const deleteWorkoutFn = (workoutId) =>
  client.delete(`/workouts/${workoutId}`, CONFIG);

export const updateWorkoutFn = (workoutId, body) =>
  client.put(`/workouts/${workoutId}`, body, CONFIG);
