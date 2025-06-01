import { client, CONFIG } from "./axios";

// export const getWorkouts = {
//   queryFn: async () => {
//     return client
//       .get("workouts", CONFIG)
//       .then((response) => Promise.resolve(response.data))
//       .catch((error) => {
//         console.error(error);
//         return Promise.reject(error);
//       });
//   },
//   queryKey: ["workouts"],
// };

export const getWorkouts = async () => {
  const res = await client.get("/workouts", CONFIG);
  return res.data;
};

export const getWorkout = async (id) => {
  try {
    const res = await client.get(`workouts/${id}`, CONFIG);
    return res.data;
  } catch (error) {
    console.error("Erreur lors du getWorkout:", error);
    throw error;
  }
};

export const createWorkoutFn = async (workout) => {
  const res = await client.post("/workouts", workout, CONFIG);
  return res.data;
};

export const deleteWorkoutFn = async (workoutId) => {
  const res = await client.delete(`/workouts/${workoutId}`, CONFIG);
  return res.data;
};

export const updateWorkoutFn = (workoutId, body) =>
  client.put(`/workouts/${workoutId}`, body, CONFIG);
