import axios from "axios";
import rateLimit from "axios-rate-limit";
import { getAccessToken, setAccessToken } from "@/store/tokenStore";
import { trackError } from "@/utilities/error-tracking";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const baseClient = axios.create({
  baseURL: API_BASE_URL,
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
        return baseClient(originalRequest);
      } catch (refreshError) {
        trackError(refreshError as Error, {
          source: "axios-interceptor",
          reason: "refresh_failed",
          url: originalRequest.url,
        });

        setAccessToken(null);
        if (window.location.pathname !== "/sign-in") {
          alert("Session expired. Please sign in again.");
          window.location.href = "/sign-in";
        }
      }
    } else {
      trackError(error as Error, {
        source: "axios-interceptor",
        url: originalRequest?.url,
        status: error.response?.status,
      });
    }

    return Promise.reject(error);
  }
);

export const rateLimitedClient = rateLimit(baseClient, {
  maxRequests: 5,
  perMilliseconds: 1000,
  maxRPS: 5,
});
