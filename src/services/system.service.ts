import axios from "axios";
import type { SystemInformation } from "../types/system";

const api = axios.create({
  baseURL: "http://127.0.0.1:45454/api/v1",
  timeout: 8000,
});

export const getSystemInformation = async () => {
  const response = await api.get<SystemInformation>("/system");

  return response.data;
};
