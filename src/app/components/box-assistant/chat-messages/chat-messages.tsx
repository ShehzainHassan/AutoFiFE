"use client";
import { useSession } from "@/contexts/session-context";
import { useChatMessagesContainer } from "@/hooks/useChatMessageContainer";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ChartRenderer } from "./chart-renderer/chart-renderer";
import classes from "./chat-messages.module.css";
import { ChatMessagesProps, ChatMessagesRef } from "./chat-messages.types";

const ChatMessages = forwardRef<ChatMessagesRef, ChatMessagesProps>(
  ({ messages }, ref) => {
    const { handleSend } = useSession();
    const { parsedMessages, handleVote, getVoteForIndex } =
      useChatMessagesContainer(messages);

    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      scrollToBottom: () => {
        if (containerRef.current) {
          containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      },
    }));

    const latestUserIndex = [...parsedMessages]
      .reverse()
      .findIndex((msg) => msg.sender === "User");
    const actualLatestUserIndex =
      latestUserIndex >= 0 ? parsedMessages.length - 1 - latestUserIndex : -1;

    const renderMessageContent = (msg: (typeof parsedMessages)[number]) => {
      if (msg.uiType === "CHART") {
        const chartDivMatch = msg.message?.match(
          /<div class="chart-block" data-chart-type="([^"]+)" data-chart="([^"]+)"><\/div>/
        );

        if (chartDivMatch) {
          const chartType = chartDivMatch[1];
          let chartData: unknown[] = [];

          try {
            chartData = JSON.parse(chartDivMatch[2].replace(/&quot;/g, '"'));
          } catch (err) {
            console.error("Failed to parse chart data:", err);
            return <p>Failed to load chart</p>;
          }

          const answerText = msg.message.split(chartDivMatch[0])[0];

          return (
            <div className={classes.uiBlock}>
              {answerText && (
                <div dangerouslySetInnerHTML={{ __html: answerText }} />
              )}
              <ChartRenderer
                chartType={chartType as "bar" | "line" | "pie"}
                chartData={chartData as Record<string, unknown>[]}
              />
            </div>
          );
        }
      }

      return (
        <div
          className={classes.uiBlock}
          dangerouslySetInnerHTML={{ __html: msg.message || "" }}
        />
      );
    };

    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleScroll = () => {
        const threshold = 100;
        const isNearBottom =
          container.scrollHeight -
            container.scrollTop -
            container.clientHeight <
          threshold;

        setShowScrollButton(!isNearBottom);
      };

      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <div
        ref={containerRef}
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
            msg.suggestedActions.length > 0;

          return (
            <React.Fragment key={key}>
              <div
                className={`${classes.messageBox} ${
                  msg.sender === "User"
                    ? classes.userMessage
                    : classes.botMessage
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
                  {msg.suggestedActions?.map((action, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSend(action)}>
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </React.Fragment>
          );
        })}
        {showScrollButton && (
          <div
            className={classes.scrollButton}
            onClick={() =>
              containerRef.current?.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth",
              })
            }>
            <ArrowDownwardIcon fontSize="small" />
          </div>
        )}
      </div>
    );
  }
);

ChatMessages.displayName = "ChatMessages";

export default memo(ChatMessages);
