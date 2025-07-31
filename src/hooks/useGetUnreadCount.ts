"use client";
import notificationAPI from "@/api/notificationAPI";
import { useQuery } from "@tanstack/react-query";

const useGetUnreadCount = () => {
  return useQuery({
    queryKey: ["unread-count"],
    queryFn: () => notificationAPI.getUnreadCount(),
  });
};

export default useGetUnreadCount;
