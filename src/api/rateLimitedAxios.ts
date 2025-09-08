import axios from "axios";
import rateLimit from "axios-rate-limit";

const baseAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const limitedAxios = rateLimit(baseAxios, {
  maxRequests: 5,
  perMilliseconds: 1000,
  maxRPS: 5,
});
