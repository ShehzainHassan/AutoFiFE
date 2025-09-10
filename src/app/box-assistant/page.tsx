"use client";

import { SessionProvider, useSession } from "@/contexts/session-context";
import { ChatMessages, Footer, Navbar } from "../components";
import About from "../components/box-assistant/about/about";
import InputQuery from "../components/box-assistant/input-query/input-query";
import Sidebar from "../components/box-assistant/sidebar/sidebar";
import classes from "./page.module.css";
import { useEffect, useRef } from "react";

function BoxAssistantContent() {
  const { messages, sessionTitles, isSessionLoading } = useSession();
  const chatRef = useRef<{ scrollToBottom: () => void }>(null);

  useEffect(() => {
    if (messages.length > 0 && chatRef.current) {
      chatRef.current.scrollToBottom();
    }
  }, [messages]);

  return (
    <div>
      <Navbar backgroundColor="var(--color-gray600)" />
      <div className={classes.container}>
        <Sidebar sessionTitles={sessionTitles} isLoading={isSessionLoading} />
        <div className={classes.chatContainer}>
          <About />
          <div className={classes.messageContainer}>
            <>
              <ChatMessages
                ref={chatRef}
                messages={messages}
                isPending={false}
              />
              <InputQuery messageCount={messages.length} chatRef={chatRef} />
            </>
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
