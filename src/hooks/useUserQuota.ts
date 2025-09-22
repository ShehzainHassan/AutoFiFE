"use client";
import aiAssistantAPI from "@/api/aiAssistantAPI";
import { useQuery } from "@tanstack/react-query";

const useUserQuota = (userId: number | null) => {
  return useQuery({
    queryKey: ["userQuota", userId],
    queryFn: () => aiAssistantAPI.checkUserQuota(),
    enabled: !!userId,
  });
};

export default useUserQuota;
