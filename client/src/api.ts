import axios from "axios";
import { config } from "./config";

export const serverApi = axios.create({
  baseURL: config.serverHost,
});

serverApi.interceptors.request.use((config) => {
  config.headers["Authorization"] = localStorage.getItem("token");
  return config;
});
