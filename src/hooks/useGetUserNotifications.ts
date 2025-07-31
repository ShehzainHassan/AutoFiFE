"use client";
import notificationAPI from "@/api/notificationAPI";
import { useQuery } from "@tanstack/react-query";

const useGetUserNotifications = () => {
  return useQuery({
    queryKey: ["userNotifications"],
    queryFn: () => notificationAPI.getUserNotifications(),
  });
};

export default useGetUserNotifications;
