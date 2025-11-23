import client from "./client";

// export const getWorkouts = {
//   queryFn: async () => {
//     return client
//       .get("workouts")
//       .then((response) => Promise.resolve(response.data))
//       .catch((error) => {
//         console.error(error);
//         return Promise.reject(error);
//       });
//   },
//   queryKey: ["workouts"],
// };

export const getWorkouts = async () => {
  const res = await client.get("/workouts");
  return res.data;
};

export const getWorkout = async (id) => {
  try {
    const res = await client.get(`workouts/${id}`);
    return res.data;
  } catch (error) {
    console.error("Erreur lors du getWorkout:", error);
    throw error;
  }
};

export const createWorkoutFn = async (workout) => {
  const res = await client.post("/workouts", workout);
  return res.data;
};

export const deleteWorkoutFn = async (workoutId) => {
  const res = await client.delete(`/workouts/${workoutId}`);
  return res.data;
};

export const updateWorkoutFn = async (data) => {
  const res = await client.put(`/workouts/${data.id}`, data.body);
  return res.data;
};

export const postExercicePositionsFn = async (data) => {
  const res = await client.post(`/workouts/${data.id}/positions`, data.body);
  return res.data;
};
