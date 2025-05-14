import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_URL;
// const BASE_URL = process.env.VITE_APP_API_URL;


export const CONFIG = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
};

export const client = axios.create({
  baseURL: BASE_URL,
  CONFIG,
});
