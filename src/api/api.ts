import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4200/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 2500,
  validateStatus: (status) => {
    return status < 500;
  },
});
