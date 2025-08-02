"use client";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./auth-top-section.module.css";
import { useRouter } from "next/navigation";
import { TopSectionProps } from "./auth-top-section.types";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function TopSection({
  backText = "Return Home",
  textRight,
  btnText,
  onClick,
}: TopSectionProps) {
  const router = useRouter();
  const redirectToHome = () => {
    router.push("/");
  };

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      setIsDark(stored === "dark");
      document.body.classList.toggle("dark", stored === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark", newTheme === "dark");
    setIsDark(!isDark);
  };

  return (
    <div className={classes.buttonsContainer}>
      <div className={classes.buttonLeft} onClick={redirectToHome}>
        <FontAwesomeIcon icon={faChevronLeft} className={classes.icon} />
        <div>{backText}</div>
      </div>
      <div className={classes.buttonRight}>
        <div>{textRight}</div>
        <button
          aria-label={btnText}
          className={classes.loginBtn}
          onClick={onClick}>
          {btnText}
        </button>
        <IconButton onClick={toggleTheme} aria-label="Toggle dark mode">
          {isDark ? (
            <LightModeIcon style={{ color: "#ffffff" }} />
          ) : (
            <DarkModeIcon />
          )}
        </IconButton>
      </div>
    </div>
  );
}
