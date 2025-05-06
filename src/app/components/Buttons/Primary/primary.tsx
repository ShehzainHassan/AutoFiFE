"use client";
import Image from "next/image";
import classes from "./primary.module.css";
import { useState } from "react";
type ButtonPrimaryProps = {
  imgSrc?: string;
  btnText: string;
  backgroundColor?: string;
  borderRadius?: string;
  textColor?: string;
  padding?: string;
  hoverColor?: string;
  border?: string;
};
export default function ButtonPrimary({
  imgSrc,
  btnText,
  backgroundColor = "var(--color-white100)",
  borderRadius = "46px",
  textColor = "var(--color-black100)",
  padding = "10px 25px",
  hoverColor = "var(--color-white200)",
  border = "none",
}: ButtonPrimaryProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={classes.btnContainer}
      style={{
        backgroundColor: isHovered ? hoverColor : backgroundColor,
        borderRadius,
        padding,
        border,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {imgSrc && <Image src={imgSrc} alt="icon" width={15} height={15} />}
      <button className={classes.btn} style={{ color: textColor }}>
        {btnText}
      </button>
    </div>
  );
}
