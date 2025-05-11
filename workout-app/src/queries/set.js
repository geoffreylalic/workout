import { client, CONFIG } from "./axios";

export const createSetFn = (data) => client.post("/sets", data, CONFIG);

export const putSetFn = (data) => client.put("/sets/" + data.id, data, CONFIG);

export const deleteSetFn = (id) => client.delete("/sets/" + id, CONFIG);
