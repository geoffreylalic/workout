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

export const createExerciceFn = (exercice) =>
  client.post("/exercices/", exercice, CONFIG);

export const createExerciceWithSetsFn = (exercice) =>
  client.post("/exercices/sets", exercice, CONFIG);
