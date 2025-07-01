"use client";
import Image from "next/image";
import headings from "@/styles/typography.module.css";
import { useState } from "react";
import { ButtonSecondaryProps } from "./button-secondary.types";
import classes from "./button-secondary.module.css";
import ArrowWhite from "@/assets/images/icons/arrow-white.png";
export default function ButtonSecondary({
  btnText,
  buttonColor = "var(--color-blue500)",
  hoverColor = "var(--color-blue600)",
  padding = "19px 26px 26px 26px",
  onClick,
}: ButtonSecondaryProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={classes.btnContainer}
      style={{ backgroundColor: isHovered ? hoverColor : buttonColor, padding }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <button
        aria-label={btnText}
        className={`${headings.modelText} ${classes.btn}`}>
        {btnText}
      </button>
      <Image
        src={ArrowWhite}
        alt="arrow"
        width={14}
        height={14}
        loading="lazy"
        placeholder="blur"
      />
    </div>
  );
}
