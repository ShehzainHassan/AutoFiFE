"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSubmitFeedback from "@/hooks/useSubmitFeedback";
import { ChatMessage } from "@/interfaces/aiAssistant";

type Vote = "up" | "down" | null;

export function useChatMessagesContainer(messages: ChatMessage[]) {
  const [votes, setVotes] = useState<Record<number, Vote>>({});
  const submitFeedback = useSubmitFeedback();

  useEffect(() => {
    const initialVotes: Record<number, Vote> = {};
    messages.forEach((msg, index) => {
      initialVotes[index] =
        msg.feedback === 1 ? "up" : msg.feedback === 2 ? "down" : null;
    });
    setVotes(initialVotes);
  }, [messages]);

  const handleVote = useCallback(
    (index: number, type: "up" | "down") => {
      setVotes((prev) => {
        const current = prev[index];
        const newVote = current === type ? null : type;
        const next = { ...prev, [index]: newVote };
        return next;
      });

      const voteMap = {
        up: "UPVOTED",
        down: "DOWNVOTED",
        null: "NOTVOTED",
      } as const;
      const messageId = messages[index]?.id ?? -1;
      const newVoteValue = votes[index] === type ? "NOTVOTED" : voteMap[type];
      submitFeedback.mutate({ message_id: messageId, vote: newVoteValue });
    },
    [messages, submitFeedback, votes]
  );

  const parsedMessages = useMemo(() => {
    return messages.map((msg) => {
      const safeParse = (str: string) => {
        try {
          return JSON.parse(str);
        } catch {
          return null;
        }
      };
      const parsed = safeParse(msg.message);
      return { ...msg, parsed };
    });
  }, [messages]);

  const getVoteForIndex = useCallback(
    (index: number): Vote => {
      return votes[index] ?? null;
    },
    [votes]
  );

  return {
    parsedMessages,
    votes,
    handleVote,
    getVoteForIndex,
  };
}
