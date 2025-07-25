"use client";

import { ThemeProvider } from "@/theme/themeContext";
import TextContainer from "../../text-container/text-container";
import classes from "../auction-info-panel.module.css";
import { TimerUnitProps } from "./auction-timer.types";

export default function TimerUnit({ label, value }: TimerUnitProps) {
  return (
    <div className={classes.textContainer} aria-label={`${value} ${label}`}>
      <ThemeProvider>
        <TextContainer value={value} />
      </ThemeProvider>
      <p>{label}</p>
    </div>
  );
}
