import axios from "axios";
import rateLimit from "axios-rate-limit";
import { getAccessToken } from "@/store/tokenStore";

const baseClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

baseClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const rateLimitedClient = rateLimit(baseClient, {
  maxRequests: 5,
  perMilliseconds: 1000,
  maxRPS: 5,
});
