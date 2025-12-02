import client from "./client";

export const getVolume = async (startDate, endDate) => {
  const res = await client.get(
    `/dashboard/metrics?startDate=${startDate}&endDate=${endDate}`
  );
  return res.data;
};
