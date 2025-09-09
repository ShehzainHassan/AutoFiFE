"use client";
import React, { memo } from "react";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import classes from "./chat-messages.module.css";
import { ChatMessagesProps } from "./chat-messages.types";
import { useChatMessagesContainer } from "@/hooks/useChatMessageContainer";

function ChatMessages({ messages }: ChatMessagesProps) {
  const { parsedMessages, handleVote, getVoteForIndex } =
    useChatMessagesContainer(messages);

  const latestUserIndex = [...parsedMessages]
    .reverse()
    .findIndex((msg) => msg.sender === "User");
  const actualLatestUserIndex =
    latestUserIndex >= 0 ? parsedMessages.length - 1 - latestUserIndex : -1;

  const renderMessageContent = (msg: (typeof parsedMessages)[number]) => {
    return (
      <div>
        {msg.message && (
          <div
            className={classes.uiBlock}
            dangerouslySetInnerHTML={{ __html: msg.message }}
          />
        )}
      </div>
    );
  };

  return (
    <div
      className={classes.messageList}
      role="list"
      aria-live="polite"
      aria-busy="false">
      {parsedMessages.map((msg, index) => {
        const key = msg.id ?? index;
        const vote = getVoteForIndex(index);

        const showSuggestedActions =
          msg.sender === "AI" &&
          index === actualLatestUserIndex + 1 &&
          msg.suggestedActions &&
          msg.suggestedActions?.length > 0;

        return (
          <React.Fragment key={key}>
            <div
              className={`${classes.messageBox} ${
                msg.sender === "User" ? classes.userMessage : classes.botMessage
              }`}
              role="listitem"
              aria-label={
                msg.sender === "User" ? "User message" : "Assistant message"
              }>
              <div className={classes.messageContent}>
                {renderMessageContent(msg)}
              </div>

              {msg.sender === "AI" && msg.message !== "Thinking..." && (
                <div
                  className={classes.voteContainer}
                  role="group"
                  aria-label="Message feedback">
                  <div
                    role="button"
                    className={`${classes.iconButton} ${
                      vote === "up" ? classes.upvoted : ""
                    }`}
                    aria-pressed={vote === "up"}
                    aria-label="Upvote"
                    onClick={() => handleVote(index, "up")}>
                    <ThumbUpIcon fontSize="small" />
                  </div>

                  <div
                    role="button"
                    className={`${classes.iconButton} ${
                      vote === "down" ? classes.downvoted : ""
                    }`}
                    aria-pressed={vote === "down"}
                    aria-label="Downvote"
                    onClick={() => handleVote(index, "down")}>
                    <ThumbDownIcon fontSize="small" />
                  </div>
                </div>
              )}
            </div>

            {showSuggestedActions && (
              <div className={classes.suggestedActionsBox}>
                {msg.suggestedActions &&
                  msg.suggestedActions.map((action, i) => (
                    <button key={i} type="button">
                      {action}
                    </button>
                  ))}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default memo(ChatMessages);
