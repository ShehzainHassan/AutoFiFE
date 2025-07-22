"use client";
import Image from "next/image";
import classes from "./button-primary.module.css";
import { useState } from "react";
import { useTheme } from "@/theme/themeContext";
import { ButtonPrimaryProps } from "./button-primary.types";

export default function ButtonPrimary({
  imgSrc,
  btnText,
  backgroundColor,
  borderRadius,
  textColor,
  padding,
  hoverColor,
  border,
  className,
  isDisabled,
  onClick,
  type = "button",
}: ButtonPrimaryProps) {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const themeValues = theme.buttonPrimary;

  const currentBackground = isHovered
    ? hoverColor || themeValues?.hoverColor
    : backgroundColor || themeValues?.backgroundColor;

  const currentTextColor = isHovered
    ? themeValues?.hoverTextColor || textColor || themeValues?.textColor
    : textColor || themeValues?.textColor;

  return (
    <button
      type={type}
      aria-label={typeof btnText === "string" ? btnText : undefined}
      className={`${classes.btnContainer} ${className}`}
      style={{
        backgroundColor: currentBackground,
        borderRadius: borderRadius || themeValues?.borderRadius,
        padding: padding || themeValues?.padding,
        border: border || themeValues?.border,
        opacity: isDisabled ? 0.6 : 1,
        pointerEvents: isDisabled ? "none" : "auto",
        cursor: isDisabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
      onClick={(e) => {
        if (isDisabled) {
          e.stopPropagation();
          return;
        }
        onClick?.();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {imgSrc && (
        <Image src={imgSrc} alt="icon" width={15} height={15} loading="lazy" />
      )}
      <span
        className={classes.btn}
        style={{
          color: currentTextColor,
        }}>
        {btnText}
      </span>
    </button>
  );
}
