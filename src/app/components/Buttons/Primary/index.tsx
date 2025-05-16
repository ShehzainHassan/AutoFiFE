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
  onClick?: () => void;
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
  onClick,
}: ButtonPrimaryProps) {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const themeValues = theme.buttonPrimary;

  return (
    <div
      className={classes.btnContainer}
      style={{
        backgroundColor: isHovered
          ? hoverColor || themeValues?.hoverColor
          : backgroundColor || themeValues?.backgroundColor,
        borderRadius: borderRadius || themeValues?.borderRadius,
        padding: padding || themeValues?.padding,
        border: border || themeValues?.border,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {imgSrc && <Image src={imgSrc} alt="icon" width={15} height={15} />}
      <button
        className={classes.btn}
        style={{ color: textColor || themeValues?.textColor }}>
        {btnText}
      </button>
    </div>
  );
}
