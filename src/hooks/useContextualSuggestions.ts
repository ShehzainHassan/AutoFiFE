"use client";
import aiAssistantAPI from "@/api/aiAssistantAPI";
import { useQuery } from "@tanstack/react-query";

const useContextualSuggestions = (userId: number | null) => {
  return useQuery({
    queryKey: ["contextualSuggestions", userId],
    queryFn: () => aiAssistantAPI.getContextualSuggestion(userId),
    enabled: !!userId,
  });
};

export default useContextualSuggestions;
