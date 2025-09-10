"use client";

import useChatMessages from "@/hooks/useChatMessages";
import useGetUserSessionTitles from "@/hooks/useGetUserSessionTitles";
import { ChatMessage, AIResponseModel } from "@/interfaces/aiAssistant";
import { createContext, useContext, useEffect, useState } from "react";
import { SessionContextType } from "./session-context.types";
import { useAuth } from "@/contexts/auth-context";
import useAIResponse from "@/hooks/useAIResponse";

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
  const { userId } = useAuth();
  const { data: sessionTitles, isLoading: isSessionLoading } =
    useGetUserSessionTitles(userId);
  const { data: sessionMessages } = useChatMessages(selectedSessionId ?? "");

  const { mutate: askAI } = useAIResponse({
    onSuccess: (res: AIResponseModel) => {
      if (res.session_id) {
        setSelectedSessionId(res.session_id);
      }
      const aiMessage: ChatMessage = {
        sender: "AI",
        message: res.answer,
        timestamp: new Date().toISOString(),
      };
      handleNewMessage(aiMessage, true);
    },
  });

  useEffect(() => {
    if (sessionMessages) {
      setSelectedSessionId(sessionMessages.id);
      setMessages(sessionMessages.messages);
    }
  }, [sessionMessages]);

  const handleNewMessage = (msg: ChatMessage, replaceLast = false) => {
    setMessages((prev) =>
      replaceLast ? [...prev.slice(0, -1), msg] : [...prev, msg]
    );
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      sender: "User",
      message: text,
      timestamp: new Date().toISOString(),
    };
    handleNewMessage(userMessage);

    const botPlaceholder: ChatMessage = {
      sender: "AI",
      message: "Thinking...",
      timestamp: new Date().toISOString(),
    };
    handleNewMessage(botPlaceholder);

    askAI({
      userId: userId ?? -1,
      question: text,
      session_id: selectedSessionId,
    });
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
        handleSend,
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
