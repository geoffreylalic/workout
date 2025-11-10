import client from "./client";

export const createSetFn = async (data) => {
  const res = await client.post("/sets", data);
  return res.data;
};

export const getSet = async (id) => {
  try {
    const res = await client.get(`sets/${id}`);
    return res.data;
  } catch (error) {
    console.error("Erreur lors du getSet:", error);
    throw error;
  }
};

export const putSetFn = async ({ id, data }) => {
  const res = await client.put("/sets/" + id, data);
  return res.data;
};

export const deleteSetFn = async (id) => {
  const res = await client.delete("/sets/" + id);
  return res.data;
};
