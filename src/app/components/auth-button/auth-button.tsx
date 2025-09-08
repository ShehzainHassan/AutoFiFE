"use client";

import Image from "next/image";
import classes from "./auth-button.module.css";
import { AuthButtonProps } from "./auth-button.types";
import arrowWhiteIcon from "@/assets/images/icons/arrow-white.png";
import { useCallback } from "react";

export default function AuthButton({
  btnText,
  onClick,
  disabled = false,
}: AuthButtonProps) {
  const handleClick = useCallback(() => {
    if (!disabled) {
      onClick();
    }
  }, [disabled, onClick]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!disabled && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onClick();
      }
    },
    [disabled, onClick]
  );

  return (
    <div
      className={`${classes.button} ${disabled ? classes.disabled : ""}`}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label={btnText}
      onClick={handleClick}
      onKeyDown={handleKeyDown}>
      <span>{btnText}</span>
      <Image
        src={arrowWhiteIcon}
        alt=""
        width={20}
        height={20}
        loading="lazy"
        placeholder="blur"
        style={{ rotate: "45deg" }}
        aria-hidden="true"
      />
    </div>
  );
}
