import client from "./client";

export const getExercices = {
  queryFn: async () => {
    return client
      .get("exercices")
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
    const res = await client.get(`exercices/${id}`);
    return res.data;
  } catch (error) {
    console.error("Erreur lors du getExercice:", error);
    throw error;
  }
};

export const createExerciceFn = async (exercice) => {
  const res = await client.post("/exercices", exercice);
  return res.data;
};

export const createExerciceWithSetsFn = (exercice) =>
  client.post("/exercices/sets", exercice);

export const deleteExerciceFn = async (id) => {
  const res = await client.delete(`/exercices/${id}`);
  return res.data;
};

export const putExerciceFn = async (data) => {
  const res = await client.put(`/exercices/${data.id}`, data.body);
  return res.data;
};

export const postSetPositionsFn = async (data) => {
  const res = await client.post(`/exercices/${data.id}/positions`, data.body);
  return res.data;
};
