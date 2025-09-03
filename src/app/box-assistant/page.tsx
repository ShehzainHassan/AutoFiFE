"use client";

import { useSession } from "@/contexts/session-context";
import useGetUserSessionTitles from "@/hooks/useGetUserSessionTitles";
import { Footer, Navbar } from "../components";
import About from "../components/box-assistant/about/about";
import ChatMessages from "../components/box-assistant/chat-messages/chat-messages";
import InputQuery from "../components/box-assistant/input-query/input-query";
import Sidebar from "../components/box-assistant/sidebar/sidebar";
import classes from "./page.module.css";

export default function BoxAssistantPage() {
  const { messages } = useSession();

  const { data: sessionTitles, isLoading: isSessionLoading } =
    useGetUserSessionTitles();

  return (
    <div>
      <Navbar backgroundColor="var(--color-gray600)" />
      <div className={classes.container}>
        <Sidebar sessionTitles={sessionTitles} isLoading={isSessionLoading} />
        <div className={classes.chatContainer}>
          <About />
          <div className={classes.messageContainer}>
            <>
              <ChatMessages messages={messages} isPending={false} />
              <InputQuery messageCount={messages.length} />
            </>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
