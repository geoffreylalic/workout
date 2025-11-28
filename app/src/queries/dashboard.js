import client from "./client";

export const getVolume = async (startDate, endDate) => {
  const res = await client.get(
    `/dashboard/volume?startDate=${startDate}&endDate=${endDate}`
  );
  return res.data;
};
