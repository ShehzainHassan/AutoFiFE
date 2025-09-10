"use client";
import aiAssistantAPI from "@/api/aiAssistantAPI";
import { useQuery } from "@tanstack/react-query";

const usePopularQueries = (userId: number | null) => {
  return useQuery({
    queryKey: ["popularQueries", userId],
    queryFn: () => aiAssistantAPI.getPopularQueries(),
    enabled: !!userId,
  });
};

export default usePopularQueries;
