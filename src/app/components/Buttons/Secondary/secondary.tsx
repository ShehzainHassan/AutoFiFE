"use client";
import Image from "next/image";
import classes from "./secondary.module.css";
import headings from "@/styles/typography.module.css";
import { useState } from "react";

type ButtonSecondaryProps = {
  btnText: string;
  buttonColor?: string;
  hoverColor?: string;
};
export default function ButtonSecondary({
  btnText,
  buttonColor = "var(--color-blue500)",
  hoverColor = "var(--color-blue600)",
}: ButtonSecondaryProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={classes.btnContainer}
      style={{ backgroundColor: isHovered ? hoverColor : buttonColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <button className={`${headings.modelText} ${classes.btn}`}>
        {btnText}
      </button>
      <Image src="/images/arrow-white.png" alt="arrow" width={14} height={14} />
    </div>
  );
}
