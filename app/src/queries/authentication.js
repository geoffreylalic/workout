import client from "./client";

export const loginQuery = async (data) => {
  return Promise.resolve(client.post("/auth/login", data));
};

export const signUp = async (data) => {
  try {
    await client.post("/auth/register", data);
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};

export const me = {
  queryKey: ["me"],
  queryFn: async () => {
    return client
      .get("/auth/me")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Erreur lors de la récupération du profil:", error);
        throw error;
      });
  },
  retry: false,
  enabled: !!localStorage.getItem("accessToken"),
};
