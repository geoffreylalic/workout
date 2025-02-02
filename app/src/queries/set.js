import { client, CONFIG } from "./axios";

export const createSetFn = (data) =>
  client.post("/sets", data, CONFIG);
