import { client, CONFIG } from "./axios";

export const createSetFn = async (data) => {
  const res = await client.post("/sets", data, CONFIG);
  return res.data;
};

export const getSet = async (id) => {
  try {
    const res = await client.get(`sets/${id}`, CONFIG);
    return res.data;
  } catch (error) {
    console.error("Erreur lors du getSet:", error);
    throw error;
  }
};

export const putSetFn = (data) => client.put("/sets/" + data.id, data, CONFIG);

export const deleteSetFn = (id) => client.delete("/sets/" + id, CONFIG);
