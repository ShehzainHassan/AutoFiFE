import { ThemeProvider } from "@/theme/themeContext";
import TextContainer from "../../text-container/text-container";
import classes from "../auction-info-panel.module.css";
import useCountdown from "@/hooks/useCountdown";
import { AuctionTimerProps } from "./auction-timer.types";

export default function AuctionTimer({ auction }: AuctionTimerProps) {
  const {
    hours: endHours,
    minutes: endMinutes,
    seconds: endSeconds,
  } = useCountdown(auction?.endUtc ?? "");
  const {
    hours: startHours,
    minutes: startMinutes,
    seconds: startSeconds,
  } = useCountdown(auction?.startUtc ?? "");

  return (
    <div className={classes.timerContainer}>
      <div className={classes.textContainer}>
        <ThemeProvider>
          <TextContainer
            value={auction.status === "PreviewMode" ? startHours : endHours}
          />
        </ThemeProvider>
        <p>Hours</p>
      </div>
      <div className={classes.textContainer}>
        <ThemeProvider>
          <TextContainer
            value={
              auction.status === "PreviewMode"
                ? startMinutes.toString().padStart(2, "0")
                : endMinutes.toString().padStart(2, "0")
            }
          />
        </ThemeProvider>
        <p>Minutes</p>
      </div>
      <div className={classes.textContainer}>
        <ThemeProvider>
          <TextContainer
            value={
              auction.status === "PreviewMode"
                ? startSeconds.toString().padStart(2, "0")
                : endSeconds.toString().padStart(2, "0")
            }
          />
        </ThemeProvider>
        <p>Seconds</p>
      </div>
    </div>
  );
}
