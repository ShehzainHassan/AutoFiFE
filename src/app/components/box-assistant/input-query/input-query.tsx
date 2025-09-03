"use client";

import SendIcon from "@/assets/images/icons/send.png";
import ThinkIcon from "@/assets/images/icons/think.png";
import useAIResponse from "@/hooks/useAIResponse";
import { AIResponseModel, ChatMessage } from "@/interfaces/aiAssistant";
import { getUserIdFromLocalStorage } from "@/utilities/utilities";
import Image from "next/image";
import { useState, useMemo } from "react";
import Input from "../../input-field";
import classes from "./input-query.module.css";

import useContextualSuggestions from "@/hooks/useContextualSuggestions";
import { InputQueryProps } from "./input-query.types";
import usePopularQueries from "@/hooks/usePopularQueries";
import { useSession } from "@/contexts/session-context";

export default function InputQuery({ messageCount }: InputQueryProps) {
  const [input, setInput] = useState("");

  const userId = getUserIdFromLocalStorage() ?? -1;
  const { data: suggestions } = useContextualSuggestions(userId);
  const { data: popularQueries } = usePopularQueries();
  const { selectedSessionId, setSelectedSessionId, setMessages } = useSession();
  const { mutate: askAI } = useAIResponse({
    onSuccess: (res: AIResponseModel) => {
      if (res.session_id) {
        setSelectedSessionId(res.session_id);
      }
      const aiMessage: ChatMessage = {
        sender: "AI",
        message: res.answer,
        timestamp: new Date().toISOString(),
      };
      handleNewMessage(aiMessage, true);
    },
  });

  const mergedSuggestions = useMemo(() => {
    const contextual = suggestions ?? [];
    const popular = (popularQueries ?? []).map((pq) => pq.text);

    const selectedContextual = contextual.slice(0, 3);
    const selectedPopular = popular.slice(0, 2);

    let combined = [...selectedContextual, ...selectedPopular];

    if (combined.length < 5) {
      const moreContextual = contextual.filter((c) => !combined.includes(c));
      const morePopular = popular.filter((p) => !combined.includes(p));

      combined = [...combined, ...moreContextual, ...morePopular].slice(0, 5);
    }

    return combined.filter((v, i, arr) => arr.indexOf(v) === i).slice(0, 5);
  }, [suggestions, popularQueries]);

  const handleSend = (text?: string) => {
    const finalInput = text ?? input;
    if (!finalInput.trim()) return;

    const userMessage: ChatMessage = {
      sender: "User",
      message: finalInput,
      timestamp: new Date().toISOString(),
    };
    handleNewMessage(userMessage);

    const botPlaceholder: ChatMessage = {
      sender: "AI",
      message: "Thinking...",
      timestamp: new Date().toISOString(),
    };
    handleNewMessage(botPlaceholder);

    askAI({
      userId,
      question: finalInput,
      session_id: selectedSessionId,
    });

    setInput("");
  };

  const handleNewMessage = (msg: ChatMessage, replaceLast = false) => {
    setMessages((prev) => {
      if (replaceLast) {
        return [...prev.slice(0, -1), msg];
      }
      return [...prev, msg];
    });
  };
  const isSendDisabled = !input.trim();
  return (
    <div>
      {!selectedSessionId &&
        messageCount === 0 &&
        mergedSuggestions.length > 0 && (
          <div className={classes.suggestions}>
            {mergedSuggestions.map((s, i) => (
              <div
                key={i}
                className={classes.suggestion}
                onClick={() => handleSend(s)}>
                {s}
              </div>
            ))}
          </div>
        )}

      <div className={classes.container}>
        <div className={classes.inputContainer}>
          <Image src={ThinkIcon} alt="brain" width={23} height={23} />
          <Input width="100%">
            <Input.Field
              className={classes.input}
              type="text"
              placeholder="What's on your mind"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
          </Input>
        </div>

        <div
          className={`${classes.send} ${
            isSendDisabled ? classes.disabled : undefined
          }`}
          onClick={() => {
            if (!isSendDisabled) handleSend();
          }}>
          <Image src={SendIcon} alt="share" width={23} height={23} />
        </div>
      </div>
    </div>
  );
}
