"use client";
import notificationAPI from "@/api/notificationAPI";
import { useQuery } from "@tanstack/react-query";

const useGetUnreadCount = (enabled?: boolean) => {
  return useQuery({
    queryKey: ["unread-count"],
    queryFn: () => notificationAPI.getUnreadCount(),
    enabled,
  });
};

export default useGetUnreadCount;
