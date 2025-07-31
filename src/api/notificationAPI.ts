import { Notification } from "@/interfaces/notification";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const notificationAPI = {
  getUserNotifications: async (userId: number) => {
    const response = await axios.get<Notification>(
      `${API_BASE_URL}/api/notification?page=1&pageSize=10&userId=${userId}`
    );
    return response.data;
  },
};
export default notificationAPI;
