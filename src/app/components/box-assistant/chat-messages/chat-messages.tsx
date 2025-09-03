"use client";

import useSubmitFeedback from "@/hooks/useSubmitFeedback";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useEffect, useState } from "react";
import classes from "./chat-messages.module.css";
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

    setVotes((prev) => ({ ...prev, [index]: newVote }));

    const voteMap = {
      up: "UPVOTED",
      down: "DOWNVOTED",
      null: "NOTVOTED",
    } as const;
    const messageId = messages[index].id ?? -1;
    const vote = newVote === null ? "NOTVOTED" : voteMap[newVote];
    submitFeedback.mutate({ message_id: messageId, vote });
  };

  const renderMessageContent = (msg: ChatMessagesProps["messages"][number]) => {
    const safeParse = (str: string) => {
      try {
        return JSON.parse(str);
      } catch {
        return null;
      }
    };

    switch (msg.uiType) {
      case "TEXT":
        return <div>{msg.message}</div>;

      case "TABLE": {
        const data = safeParse(msg.message);
        if (Array.isArray(data) && data.length > 0) {
          const columns = Object.keys(data[0]);
          return (
            <table className={classes.table}>
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx}>
                    {columns.map((col) => (
                      <td key={col}>{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        }
        return <div>{msg.message}</div>;
      }

      case "CARD_GRID": {
        const data = safeParse(msg.message);
        if (Array.isArray(data) && data.length > 0) {
          return (
            <div className={classes.cardGrid}>
              {data.map((item, idx) => (
                <div key={idx} className={classes.card}>
                  {Object.entries(item).map(([key, value]) => (
                    <div key={key}>
                      <strong>{key}:</strong> {String(value)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        }
        return <div>{msg.message}</div>;
      }

      case "CALCULATOR":
        return (
          <div>
            <strong>Calculation Result:</strong>
            <pre>{msg.message}</pre>
          </div>
        );

      case "CHART":
        return (
          <div>
            <strong>Chart Data:</strong>
            <pre>{msg.message}</pre>
          </div>
        );

      default:
        return <div>{msg.message}</div>;
    }
  };

  return (
    <div className={classes.messageList}>
      {messages.map((msg, index) => (
        <div
          key={msg.id ?? index}
          className={`${classes.messageBox} ${
            msg.sender === "User" ? classes.userMessage : classes.botMessage
          }`}>
          {renderMessageContent(msg)}

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
