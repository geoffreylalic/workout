import { client, CONFIG } from "./axios";

export const getWorkouts = {
  queryFn: async () => {
    return client
      .get("workouts", CONFIG)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
        return Promise.reject(error);
      });
  },
  queryKey: ["workouts"],
};
