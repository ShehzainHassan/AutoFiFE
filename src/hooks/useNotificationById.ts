"use client";
import notificationAPI from "@/api/notificationAPI";
import { useQuery } from "@tanstack/react-query";

const useNotificationById = (id: number) => {
  return useQuery({
    queryKey: ["notificationById", id],
    queryFn: () => notificationAPI.getNotificationById(id),
  });
};

export default useNotificationById;
