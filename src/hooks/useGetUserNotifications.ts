"use client";
import notificationAPI from "@/api/notificationAPI";
import { useQuery } from "@tanstack/react-query";

const useGetUserNotifications = (userId: number) => {
  return useQuery({
    queryKey: ["userNotifications", userId],
    queryFn: () => notificationAPI.getUserNotifications(userId),
  });
};

export default useGetUserNotifications;
