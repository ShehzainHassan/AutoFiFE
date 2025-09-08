"use client";

import headings from "@/styles/typography.module.css";
import classes from "./auth-header.module.css";
import { AuthHeaderProps } from "./auth-header.types";

export default function AuthHeader({ title, subTitle }: AuthHeaderProps) {
  return (
    <header className={classes.container} role="banner">
      <h1 className={`${classes.title} ${headings.authHeading}`}>{title}</h1>
      <p
        className={`${classes.subTitle} ${headings.authDescription}`}
        aria-label="Authentication subtitle">
        {subTitle}
      </p>
    </header>
  );
}
