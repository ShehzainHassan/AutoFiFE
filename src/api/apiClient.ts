import axios from "axios";
import rateLimit from "axios-rate-limit";
import { getTokenFromLocalStorage } from "@/utilities/utilities";

const baseClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

baseClient.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const rateLimitedClient = rateLimit(baseClient, {
  maxRequests: 5,
  perMilliseconds: 1000,
  maxRPS: 5,
});

export default rateLimitedClient;
