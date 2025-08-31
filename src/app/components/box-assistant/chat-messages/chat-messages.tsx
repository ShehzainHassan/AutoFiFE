"use client";

import classes from "./chat-messages.module.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useState, useEffect } from "react";
import useSubmitFeedback from "@/hooks/useSubmitFeedback";
import { ChatMessagesProps } from "./chat-messages.types";

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const [votes, setVotes] = useState<Record<number, "up" | "down" | null>>({});
  const submitFeedback = useSubmitFeedback();

  useEffect(() => {
    const initialVotes: Record<number, "up" | "down" | null> = {};
    messages.forEach((msg, index) => {
      initialVotes[index] =
        msg.feedback === 1 ? "up" : msg.feedback === 2 ? "down" : null;
    });
    setVotes(initialVotes);
  }, [messages]);

  const handleVote = (index: number, type: "up" | "down") => {
    const currentVote = votes[index];
    const newVote = currentVote === type ? null : type;

    setVotes((prev) => ({
      ...prev,
      [index]: newVote,
    }));

    const voteMap = {
      up: "UPVOTED",
      down: "DOWNVOTED",
      null: "NOTVOTED",
    } as const;
    const messageId = messages[index].id;
    const vote = newVote === null ? "NOTVOTED" : voteMap[newVote];
    submitFeedback.mutate({
      message_id: messageId ?? -1,
      vote,
    });
  };

  return (
    <div className={classes.messageList}>
      {messages.map((msg, index) => (
        <div
          key={msg.id}
          className={`${classes.messageBox} ${
            msg.sender === "User" ? classes.userMessage : classes.botMessage
          }`}>
          <div>{msg.message}</div>

          {msg.sender === "AI" && msg.message !== "Thinking..." && (
            <div className={classes.voteContainer}>
              <ThumbUpIcon
                className={`${classes.voteIcon} ${
                  votes[index] === "up" ? classes.upvoted : ""
                }`}
                onClick={() => handleVote(index, "up")}
              />
              <ThumbDownIcon
                className={`${classes.voteIcon} ${
                  votes[index] === "down" ? classes.downvoted : ""
                }`}
                onClick={() => handleVote(index, "down")}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
