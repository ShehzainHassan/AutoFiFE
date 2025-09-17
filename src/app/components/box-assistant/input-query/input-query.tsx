"use client";

import SendIcon from "@/assets/images/icons/send.png";
import ThinkIcon from "@/assets/images/icons/think.png";
import Image from "next/image";
import { useMemo, useState, useRef } from "react";
import Input from "../../input-field";
import classes from "./input-query.module.css";

import { useAuth } from "@/contexts/auth-context";
import { useSession } from "@/contexts/session-context";
import useContextualSuggestions from "@/hooks/useContextualSuggestions";
import usePopularQueries from "@/hooks/usePopularQueries";
import {
  InputQueryProps,
  CustomSpeechRecognition,
  CustomSpeechRecognitionEvent,
} from "./input-query.types";

import MicIcon from "@mui/icons-material/Mic";

export default function InputQuery({
  messageCount,
  userQuota,
  chatRef,
}: InputQueryProps) {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef<CustomSpeechRecognition | null>(null);

  const { userId } = useAuth();
  const { data: suggestions } = useContextualSuggestions(userId);
  const { data: popularQueries } = usePopularQueries(userId);
  const { selectedSessionId, handleSend } = useSession();

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

  const isSendDisabled = !input.trim();

  const sendMessage = () => {
    if (!isSendDisabled) {
      handleSend(input);
      setInput("");
      chatRef.current?.scrollToBottom();
    }
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      const SpeechRecognitionConstructor =
        (
          window as unknown as {
            SpeechRecognition?: new () => CustomSpeechRecognition;
            webkitSpeechRecognition?: new () => CustomSpeechRecognition;
          }
        ).SpeechRecognition ||
        (
          window as unknown as {
            webkitSpeechRecognition?: new () => CustomSpeechRecognition;
          }
        ).webkitSpeechRecognition;

      if (!SpeechRecognitionConstructor) {
        alert("Speech recognition not supported in this browser.");
        return;
      }

      recognitionRef.current = new SpeechRecognitionConstructor();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (
        event: CustomSpeechRecognitionEvent
      ) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };
  if (userQuota === 0) {
    const resetDate = new Date();
    resetDate.setHours(24, 0, 0, 0);

    return (
      <div className={classes.limitBanner}>
        <p className={classes.limitText}>Daily limit exceeded</p>
        <p className={classes.limitSubText}>
          Your limit will reset on{" "}
          {resetDate.toLocaleString([], {
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
    );
  }

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
              isDisabled={userQuota === 0}
              className={classes.input}
              type="text"
              placeholder="What's on your mind"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
          </Input>

          <MicIcon
            onClick={toggleMic}
            style={{
              cursor: "pointer",
              color: isListening ? "red" : "gray",
            }}
          />
        </div>

        <div
          className={`${classes.send} ${
            isSendDisabled ? classes.disabled : undefined
          }`}
          onClick={sendMessage}>
          <Image src={SendIcon} alt="share" width={23} height={23} />
        </div>
      </div>
    </div>
  );
}
