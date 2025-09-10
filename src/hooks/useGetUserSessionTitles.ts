"use client";
import aiAssistantAPI from "@/api/aiAssistantAPI";
import { useQuery } from "@tanstack/react-query";

const useGetUserSessionTitles = (userId: number | null) => {
  return useQuery({
    queryKey: ["userSessions", userId],
    queryFn: () => aiAssistantAPI.getUserSessionTitles(),
    enabled: !!userId,
  });
};

export default useGetUserSessionTitles;
