"use client";
import { useEffect, useState } from "react";
import classes from "./auth-header.module.css";
import headings from "@/styles/typography.module.css";
import { AuthHeaderProps } from "./auth-header.types";

export default function AuthHeader({ title, subTitle }: AuthHeaderProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(document.body.classList.contains("dark"));
    }
  }, []);

  return (
    <div className={classes.container}>
      <div
        className={`${classes.title} ${headings.authHeading} ${
          isDark ? classes.white : ""
        } `}
        style={{
          color: isDark ? "var(--color-white100)" : "var(--color-black1000)",
        }}>
        {title}
      </div>
      <div className={`${classes.subTitle} ${headings.authDescription}`}>
        {subTitle}
      </div>
    </div>
  );
}
