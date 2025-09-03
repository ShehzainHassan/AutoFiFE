"use client";

import Logout from "@/assets/images/icons/logout.svg";
import SearchIcon from "@/assets/images/icons/search-normal.svg";
import SettingsIcon from "@/assets/images/icons/settings.svg";
import User from "@/assets/images/icons/user.svg";
import BoxAssistantLogo from "@/assets/images/logos/box-assistant.png";
import { NEW_CHAT } from "@/constants/button-primary-themes";
import { useSession } from "@/contexts/session-context";
import useSidebarLogic from "@/hooks/useSidebarLogic";
import { ChatSessionSummary } from "@/interfaces/aiAssistant";
import { ThemeProvider } from "@/theme/themeContext";
import Image from "next/image";
import React from "react";
import ButtonPrimary from "../../buttons/button-primary";
import ClearAllModal from "../../modals/clear-all-modal/clear-all-modal";
import DeleteSessionModal from "../../modals/delete-modal/delete-modal";
import EditSessionModal from "../../modals/edit-modal/edit-modal";
import ConversationList from "../conversation-list/conversation-list";
import classes from "./sidebar.module.css";

export interface SidebarProps {
  sessionTitles?: ChatSessionSummary[] | null;
  isLoading?: boolean;
}

function BoxAssistantSidebar({
  sessionTitles,
  isLoading = false,
}: SidebarProps) {
  const {
    modalType,
    currentTitle,
    setCurrentTitle,
    recentSessions,
    olderSessions,
    deleteSessionPending,
    deleteAllPending,
    editSessionPending,
    openEditModal,
    openDeleteModal,
    openClearAllModal,
    closeModal,
    handleUpdateTitle,
    handleDeleteSession,
    handleDeleteAll,
  } = useSidebarLogic(sessionTitles);

  const { selectedSessionId, setMessages, setSelectedSessionId } = useSession();
  return (
    <aside className={classes.container} aria-label="Chat sidebar">
      <div>
        <div className={classes.header}>
          <div className={classes.logoContainer}>
            <Image
              src={BoxAssistantLogo}
              alt="Box Assistant logo"
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
                  setSelectedSessionId(null);
                  setMessages([]);
                }}
                aria-label="Start new chat"
              />
            </ThemeProvider>

            <div
              className={classes.searchBtn}
              role="button"
              tabIndex={0}
              aria-label="Search"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                }
              }}>
              <Image src={SearchIcon} alt="search" width={18} height={18} />
            </div>
          </div>
        </div>

        {isLoading ? (
          <p>Loading sessions...</p>
        ) : (
          <>
            {recentSessions.length > 0 && (
              <>
                <div className={classes.yourConversations}>
                  <p className={classes.text}>Your conversations</p>
                  <p
                    className={classes.clearBtn}
                    role="button"
                    tabIndex={0}
                    onClick={openClearAllModal}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openClearAllModal();
                      }
                    }}>
                    Clear All
                  </p>
                </div>
                <ConversationList
                  sessions={recentSessions}
                  selectedId={selectedSessionId}
                  onSelect={setSelectedSessionId}
                  onDelete={openDeleteModal}
                  onEdit={openEditModal}
                />
              </>
            )}

            {olderSessions.length > 0 && (
              <>
                <div className={classes.yourConversations}>
                  <p className={classes.text}>Last 7 Days</p>
                </div>
                <ConversationList
                  sessions={olderSessions}
                  selectedId={selectedSessionId}
                  onSelect={setSelectedSessionId}
                  onDelete={openDeleteModal}
                  onEdit={openEditModal}
                />
              </>
            )}
          </>
        )}
      </div>

      <div className={classes.bottomContainer}>
        <div className={classes.settingsContainer}>
          <div className={classes.settings}>
            <Image src={SettingsIcon} alt="settings" width={16} height={16} />
          </div>
          <p>Settings</p>
        </div>

        <div className={classes.nameContainer}>
          <div className={classes.name}>
            <div className={classes.settings}>
              <Image src={User} alt="user" width={34} height={34} />
            </div>
            <p>Andrew Neilson</p>
          </div>
          <div className={classes.logout}>
            <Image src={Logout} alt="logout" width={13} height={13} />
          </div>
        </div>
      </div>

      <EditSessionModal
        isOpen={modalType === "edit"}
        currentTitle={currentTitle}
        editSessionPending={editSessionPending}
        onClose={closeModal}
        onChange={setCurrentTitle}
        onUpdate={handleUpdateTitle}
      />
      <DeleteSessionModal
        isOpen={modalType === "delete"}
        deleteSessionPending={deleteSessionPending}
        onClose={closeModal}
        onDelete={handleDeleteSession}
      />

      <ClearAllModal
        isOpen={modalType === "clearAll"}
        deleteAllPending={deleteAllPending}
        onClose={closeModal}
        onClearAll={handleDeleteAll}
      />
    </aside>
  );
}

export default React.memo(BoxAssistantSidebar);
