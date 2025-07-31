import { Notification } from "@/interfaces/notification";
import apiClient from "./apiClient";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const notificationAPI = {
  getUserNotifications: async () => {
    const response = await apiClient.get<Notification>(
      `${API_BASE_URL}/api/notification?page=1&pageSize=10`
    );
    return response.data;
  },
};
export default notificationAPI;
