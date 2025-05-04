import { client } from "./axios";

export const loginQuery = async (data) => {
  return Promise.resolve(client.post("/auth/login", data));
};

export const me = {
  queryKey: ["me"],
  queryFn: async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No access token");
    }

    return client
      .get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Erreur lors de la récupération du profil:", error);
        throw error;
      });
  },
  retry: false,
};
