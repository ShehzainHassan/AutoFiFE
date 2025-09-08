"use client";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./auth-top-section.module.css";
import { useRouter } from "next/navigation";
import { TopSectionProps } from "./auth-top-section.types";
import { IconButton } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function TopSection({
  backText = "Return Home",
  textRight,
  btnText,
  onClick,
}: TopSectionProps) {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);

  const redirectToHome = useCallback(() => {
    router.push("/");
  }, [router]);

  const toggleTheme = useCallback(() => {
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark", newTheme === "dark");
    setIsDark(!isDark);
  }, [isDark]);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const dark = stored === "dark";
    setIsDark(dark);
    document.body.classList.toggle("dark", dark);
  }, []);

  return (
    <section
      className={classes.buttonsContainer}
      role="region"
      aria-label="Authentication top section">
      <div
        className={classes.buttonLeft}
        role="link"
        tabIndex={0}
        onClick={redirectToHome}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") redirectToHome();
        }}
        aria-label={backText}>
        <FontAwesomeIcon icon={faChevronLeft} className={classes.icon} />
        <span>{backText}</span>
      </div>

      <div className={classes.buttonRight}>
        <span>{textRight}</span>
        <button
          aria-label={btnText}
          className={classes.loginBtn}
          onClick={onClick}
          type="button">
          {btnText}
        </button>
        <IconButton
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}>
          {isDark ? (
            <LightModeIcon style={{ color: "var(--color-white100)" }} />
          ) : (
            <DarkModeIcon />
          )}
        </IconButton>
      </div>
    </section>
  );
}
