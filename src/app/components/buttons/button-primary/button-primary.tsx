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
  width,
  type = "button",
  imgPos = "left",
}: ButtonPrimaryProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { buttonPrimary: themeValues } = useTheme();

  const currentBackground = isHovered
    ? hoverColor ?? themeValues?.hoverColor
    : backgroundColor ?? themeValues?.backgroundColor;

  const currentTextColor = isHovered
    ? themeValues?.hoverTextColor ?? textColor ?? themeValues?.textColor
    : textColor ?? themeValues?.textColor;

  const handleClick = () => {
    if (!isDisabled) onClick?.();
  };

  return (
    <button
      type={type}
      aria-label={typeof btnText === "string" ? btnText : undefined}
      className={`${classes.btnContainer} ${className ?? ""}`}
      style={{
        backgroundColor: currentBackground,
        borderRadius: borderRadius ?? themeValues?.borderRadius,
        padding: padding ?? themeValues?.padding,
        border: border ?? themeValues?.border,
        opacity: isDisabled ? 0.6 : 1,
        width: width ?? themeValues?.width,
        pointerEvents: isDisabled ? "none" : "auto",
        cursor: isDisabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isDisabled}>
      {imgSrc && imgPos === "left" && (
        <Image
          src={imgSrc}
          alt=""
          width={15}
          height={15}
          loading="lazy"
          aria-hidden="true"
        />
      )}
      <span className={classes.btn} style={{ color: currentTextColor }}>
        {btnText}
      </span>
      {imgSrc && imgPos === "right" && (
        <Image
          src={imgSrc}
          alt=""
          width={15}
          height={15}
          loading="lazy"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
