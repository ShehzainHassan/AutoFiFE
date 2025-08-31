"use client";
import aiAssistantAPI from "@/api/aiAssistantAPI";
import { useQuery } from "@tanstack/react-query";

const useGetUserSessionTitles = () => {
  return useQuery({
    queryKey: ["userSessions"],
    queryFn: () => aiAssistantAPI.getUserSessionTitles(),
  });
};

export default useGetUserSessionTitles;
