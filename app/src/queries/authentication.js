import { client, CONFIG } from "./axios";

export const login = async (data) => {
  return Promise.resolve(client.post("/auth/login", data));
};

export const me = {
  queryFn: async () => {
    return client
      .get("/auth/me", CONFIG)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  },
  queryKey: ["auth/me"],
  retry: false,
};
