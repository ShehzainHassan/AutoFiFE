"use client";

import aiAssistantAPI from "@/api/aiAssistantAPI";
import { useQuery } from "@tanstack/react-query";

const useChatMessages = (session_id: string) => {
  return useQuery({
    queryKey: ["userChats", session_id],
    queryFn: () => aiAssistantAPI.getSessionChats(session_id),
    enabled: !!session_id,
  });
};

export default useChatMessages;
