"use client";

import { SessionProvider, useSession } from "@/contexts/session-context";
import { ChatMessages, Footer, Navbar } from "../components";
import About from "../components/box-assistant/about/about";
import InputQuery from "../components/box-assistant/input-query/input-query";
import Sidebar from "../components/box-assistant/sidebar/sidebar";
import classes from "./page.module.css";
import { useEffect, useRef } from "react";
import useUserQuota from "@/hooks/useUserQuota";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useFeatureFlags } from "@/hooks/useFeatureFlags";

function BoxAssistantContent() {
  const { messages, sessionTitles, isSessionLoading } = useSession();
  const router = useRouter();
  const { isAIEnabled } = useFeatureFlags();
  const { userId } = useAuth();

  const { data: quota } = useUserQuota(userId ?? -1);

  const chatRef = useRef<{ scrollToBottom: () => void }>(null);

  useEffect(() => {
    if (messages.length > 0 && chatRef.current) {
      chatRef.current.scrollToBottom();
    }
  }, [messages]);

  if (!isAIEnabled) {
    if (typeof window !== "undefined") {
      router.replace("/");
    }
    return null;
  }
  return (
    <div>
      <Navbar backgroundColor="var(--color-gray600)" />
      <div className={classes.container}>
        <Sidebar sessionTitles={sessionTitles} isLoading={isSessionLoading} />
        <div className={classes.chatContainer}>
          <About />
          <div className={classes.messageContainer}>
            <ChatMessages ref={chatRef} messages={messages} isPending={false} />
            <InputQuery
              messageCount={messages.length}
              userQuota={quota}
              chatRef={chatRef}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function BoxAssistantPage() {
  return (
    <SessionProvider>
      <BoxAssistantContent />
    </SessionProvider>
  );
}
