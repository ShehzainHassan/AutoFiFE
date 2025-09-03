"use client";

import useChatMessages from "@/hooks/useChatMessages";
import useGetUserSessionTitles from "@/hooks/useGetUserSessionTitles";
import { ChatMessage } from "@/interfaces/aiAssistant";
import { createContext, useContext, useEffect, useState } from "react";
import { SessionContextType } from "./session-context.types";

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { data: sessionTitles, isLoading: isSessionLoading } =
    useGetUserSessionTitles();
  const { data: sessionMessages } = useChatMessages(selectedSessionId ?? "");

  useEffect(() => {
    if (sessionMessages) {
      setMessages(sessionMessages.messages);
    } else {
      setMessages([]);
    }
  }, [sessionMessages, selectedSessionId]);

  const handleNewMessage = (msg: ChatMessage, replaceLast = false) => {
    setMessages((prev) =>
      replaceLast ? [...prev.slice(0, -1), msg] : [...prev, msg]
    );
  };

  const handleNewChat = () => {
    setSelectedSessionId(null);
    setMessages([]);
  };

  return (
    <SessionContext.Provider
      value={{
        selectedSessionId,
        setSelectedSessionId,
        sessionTitles,
        isSessionLoading,
        messages,
        setMessages,
        handleNewMessage,
        handleNewChat,
      }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return ctx;
};
