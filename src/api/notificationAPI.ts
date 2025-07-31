import { Notification, NotificationItem } from "@/interfaces/notification";
import apiClient from "./apiClient";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const notificationAPI = {
  getUserNotifications: async (page = 1, pageSize = 10) => {
    const response = await apiClient.get<Notification>(
      `/api/notification?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  },
  getNotificationById: async (id: number) => {
    const response = await apiClient.get<NotificationItem>(
      `/api/notification/${id}`
    );
    return response.data;
  },
  markAsRead: async (id: number) => {
    const response = await apiClient.post<Notification>(
      `${API_BASE_URL}/api/notification/${id}/mark-read`
    );
    return response.data;
  },
  getUnreadCount: async () => {
    const response = await apiClient.get<number>(
      `${API_BASE_URL}/api/notification/unread-count`
    );
    return response.data;
  },
};
export default notificationAPI;
