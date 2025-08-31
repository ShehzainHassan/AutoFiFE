"use client";
import aiAssistantAPI from "@/api/aiAssistantAPI";
import { useQuery } from "@tanstack/react-query";

const useContextualSuggestions = (userId: number) => {
  return useQuery({
    queryKey: ["contextualSuggestions", userId],
    queryFn: () => aiAssistantAPI.getContextualSuggestion(userId),
  });
};

export default useContextualSuggestions;
