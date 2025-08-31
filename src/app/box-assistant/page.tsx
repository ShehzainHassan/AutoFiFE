"use client";

import { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import About from "../components/box-assistant/about/about";
import InputQuery from "../components/box-assistant/input-query/input-query";
import Sidebar from "../components/box-assistant/sidebar/sidebar";
import ChatMessages from "../components/box-assistant/chat-messages/chat-messages";
import useGetUserSessionTitles from "@/hooks/useGetUserSessionTitles";
import useChatMessages from "@/hooks/useChatMessages";
import { ChatMessage } from "@/interfaces/aiAssistant";
import classes from "./page.module.css";
import { useQueryClient } from "@tanstack/react-query";

export default function BoxAssistantPage() {
  const queryClient = useQueryClient();
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
    setMessages((prev) => {
      if (replaceLast) {
        return [...prev.slice(0, -1), msg];
      }
      return [...prev, msg];
    });
  };
  const handleNewChat = () => {
    setSelectedSessionId(null);
    setMessages([]);
    queryClient.invalidateQueries({ queryKey: ["userSessions"] });
  };
  return (
    <div>
      <Navbar backgroundColor="var(--color-gray600)" />

      <div className={classes.container}>
        <Sidebar
          sessionTitles={sessionTitles}
          isLoading={isSessionLoading}
          onSessionSelect={setSelectedSessionId}
          onNewChat={handleNewChat}
          selectedSessionId={selectedSessionId}
        />

        <div className={classes.chatContainer}>
          <About />

          <div className={classes.messageContainer}>
            <>
              <ChatMessages messages={messages} isPending={false} />
              <InputQuery
                sessionId={selectedSessionId}
                onNewMessage={handleNewMessage}
                messageCount={messages.length}
              />
            </>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
