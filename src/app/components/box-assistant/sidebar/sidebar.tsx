"use client";

import EditIcon from "@/assets/images/icons/edit.svg";
import MessageIcon from "@/assets/images/icons/message.svg";
import SearchIcon from "@/assets/images/icons/search-normal.svg";
import DeleteIcon from "@/assets/images/icons/trash.svg";
import BoxAssistantLogo from "@/assets/images/logos/box-assistant.png";
import { NEW_CHAT } from "@/constants/button-primary-themes";
import { ThemeProvider } from "@/theme/themeContext";
import Image from "next/image";
import ButtonPrimary from "../../buttons/button-primary";
import classes from "./sidebar.module.css";
import { SidebarProps } from "./sidebar.types";

export default function Sidebar({
  sessionTitles,
  isLoading,
  onSessionSelect,
  onNewChat,
  selectedSessionId,
}: SidebarProps) {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.logoContainer}>
          <Image
            src={BoxAssistantLogo}
            alt="Box-Assistant"
            width={40}
            height={50}
          />
          <div className={classes.logoHeader}>
            <p>AI</p>
            <p>Assistant</p>
          </div>
        </div>
        <div className={classes.buttons}>
          <ThemeProvider value={NEW_CHAT}>
            <ButtonPrimary
              btnText="New chat"
              onClick={() => {
                if (onNewChat) onNewChat();
              }}
            />
          </ThemeProvider>
          <div className={classes.searchBtn}>
            <Image src={SearchIcon} alt="search" width={18} height={18} />
          </div>
        </div>
      </div>

      <div className={classes.yourConversations}>
        <p className={classes.text}>Your conversations</p>
        <p className={classes.clearBtn}>Clear All</p>
      </div>

      <div className={classes.recentConversationsContainer}>
        {isLoading ? (
          <p>Loading sessions...</p>
        ) : (
          sessionTitles?.map((session) => (
            <div
              key={session.id}
              onClick={() => {
                onSessionSelect(session.id);
              }}
              className={`${classes.recentConversations} ${
                selectedSessionId === session.id ? classes.selected : undefined
              }`}>
              <div className={`${classes.recentConversationInfo}`}>
                <Image src={MessageIcon} alt="message" width={16} height={16} />
                <p className={classes.truncateTitle}>{session.title}</p>
              </div>
              <div className={classes.modifyContainer}>
                {selectedSessionId === session.id && (
                  <div className={classes.modify}>
                    <Image
                      src={DeleteIcon}
                      alt="delete"
                      width={16}
                      height={16}
                    />
                    <Image src={EditIcon} alt="edit" width={16} height={16} />
                  </div>
                )}
                <div className={classes.rounded} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
