"use client";
import Image from "next/image";
import classes from "./primary.module.css";
import { useState } from "react";
import { useTheme } from "@/theme/themeContext";
type ButtonPrimaryProps = {
  imgSrc?: string;
  btnText: string;
  backgroundColor?: string;
  borderRadius?: string;
  textColor?: string;
  padding?: string;
  hoverColor?: string;
  border?: string;
  className?: string;
  isDisabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
};
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

  return (
    <div
      className={`${classes.btnContainer} ${className}`}
      style={{
        backgroundColor: isHovered
          ? hoverColor || themeValues?.hoverColor
          : backgroundColor || themeValues?.backgroundColor,
        borderRadius: borderRadius || themeValues?.borderRadius,
        padding: padding || themeValues?.padding,
        border: border || themeValues?.border,
        opacity: isDisabled ? 0.6 : 1,
        pointerEvents: isDisabled ? "none" : "auto",
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {imgSrc && <Image src={imgSrc} alt="icon" width={15} height={15} />}
      <button
        type={type}
        className={classes.btn}
        style={{ color: textColor || themeValues?.textColor }}>
        {btnText}
      </button>
    </div>
  );
}
