import { client } from "./axios";

export const login = async (data) => {
    return Promise.resolve(client.post("/auth/login", data))
};
