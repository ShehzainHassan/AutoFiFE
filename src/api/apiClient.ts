import axios from "axios";
import rateLimit from "axios-rate-limit";
import { getAccessToken, setAccessToken } from "@/store/tokenStore";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
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

baseClient.interceptors.response.use(
  (response) => {
    const newToken = response.headers["x-new-access-token"];
    if (newToken) {
      setAccessToken(newToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axios.post(
          `${API_BASE_URL}/user/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = refreshRes.data.accessToken;
        setAccessToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch {
        setAccessToken(null);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export const rateLimitedClient = rateLimit(baseClient, {
  maxRequests: 5,
  perMilliseconds: 1000,
  maxRPS: 5,
});
