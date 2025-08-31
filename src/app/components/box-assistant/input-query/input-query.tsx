"use client";

import SendIcon from "@/assets/images/icons/send.png";
import ThinkIcon from "@/assets/images/icons/think.png";
import useAIResponse from "@/hooks/useAIResponse";
import { AIResponseModel, ChatMessage } from "@/interfaces/aiAssistant";
import {
  getRandomItems,
  getUserIdFromLocalStorage,
} from "@/utilities/utilities";
import Image from "next/image";
import { useState } from "react";
import Input from "../../input-field";
import classes from "./input-query.module.css";

import useContextualSuggestions from "@/hooks/useContextualSuggestions";
import { InputQueryProps } from "./input-query.types";

export default function InputQuery({
  sessionId,
  onNewMessage,
  messageCount,
}: InputQueryProps) {
  const [input, setInput] = useState("");

  const userId = getUserIdFromLocalStorage() ?? -1;
  const { data: suggestions } = useContextualSuggestions(userId);

  const { mutate: askAI } = useAIResponse({
    onSuccess: (res: AIResponseModel) => {
      const aiMessage: ChatMessage = {
        sender: "AI",
        message: res.answer,
        timestamp: new Date().toISOString(),
      };
      onNewMessage(aiMessage, true);
    },
  });

  const handleSend = (text?: string) => {
    const finalInput = text ?? input;
    if (!finalInput.trim()) return;

    const userMessage: ChatMessage = {
      sender: "User",
      message: finalInput,
      timestamp: new Date().toISOString(),
    };
    onNewMessage(userMessage);

    const botPlaceholder: ChatMessage = {
      sender: "AI",
      message: "Thinking...",
      timestamp: new Date().toISOString(),
    };
    onNewMessage(botPlaceholder);

    askAI({
      userId,
      question: finalInput,
      session_id: sessionId,
    });

    setInput("");
  };

  const isSendDisabled = !input.trim();

  return (
    <div>
      {!sessionId &&
        messageCount === 0 &&
        suggestions &&
        suggestions.length > 0 && (
          <div className={classes.suggestions}>
            {getRandomItems<string>(suggestions, 4).map((s, i) => (
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
