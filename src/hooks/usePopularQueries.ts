"use client";
import aiAssistantAPI from "@/api/aiAssistantAPI";
import { useQuery } from "@tanstack/react-query";

const usePopularQueries = () => {
  return useQuery({
    queryKey: ["popularQueries"],
    queryFn: () => aiAssistantAPI.getPopularQueries(),
  });
};

export default usePopularQueries;
