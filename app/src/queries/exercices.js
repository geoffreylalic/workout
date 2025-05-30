import { client, CONFIG } from "./axios";

export const getExercices = {
  queryFn: async () => {
    return client
      .get("exercices", CONFIG)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },
  queryKey: ["exercices"],
};

export const getExercice = async (id) => {
  try {
    const res = await client.get(`exercices/${id}`, CONFIG);
    return res.data;
  } catch (error) {
    console.error("Erreur lors du getExercice:", error);
    throw error;
  }
};

export const createExerciceFn = async (exercice) => {
  const res = await client.post("/exercices", exercice, CONFIG);
  return res.data;
};

export const createExerciceWithSetsFn = (exercice) =>
  client.post("/exercices/sets", exercice, CONFIG);

export const deleteExerciceFn = async (id) => {
  const res = await client.delete(`/exercices/${id}`, CONFIG);
  return res.data;
};
