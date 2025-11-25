import client from "./client";

export const getVolume = async () => {
  const res = await client.get("/dashboard/volume");
  return res.data;
};
