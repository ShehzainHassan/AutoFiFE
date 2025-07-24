import { ThemeProvider } from "@/theme/themeContext";
import TextContainer from "../../text-container/text-container";
import classes from "../auction-info-panel.module.css";
import useCountdown from "@/hooks/useCountdown";
import { AuctionTimerProps } from "./auction-timer.types";
import headings from "@/styles/typography.module.css";

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

  const isEnded = endHours === 0 && endMinutes === 0 && endSeconds === 0;

  if (isEnded) {
    return <p className={classes.center}>Auction has ended</p>;
  }

  const isPreview = auction.status === "PreviewMode";
  const headingText = isPreview ? "Auction starts in" : "Auction ends in";

  const hours = isPreview ? startHours : endHours;
  const minutes = isPreview ? startMinutes : endMinutes;
  const seconds = isPreview ? startSeconds : endSeconds;

  return (
    <>
      <p
        className={`${classes.center} ${classes.text} ${headings.auctionEndText}`}>
        {headingText}
      </p>
      <div className={classes.timerContainer}>
        <div className={classes.textContainer}>
          <ThemeProvider>
            <TextContainer value={hours} />
          </ThemeProvider>
          <p>Hours</p>
        </div>
        <div className={classes.textContainer}>
          <ThemeProvider>
            <TextContainer value={minutes.toString().padStart(2, "0")} />
          </ThemeProvider>
          <p>Minutes</p>
        </div>
        <div className={classes.textContainer}>
          <ThemeProvider>
            <TextContainer value={seconds.toString().padStart(2, "0")} />
          </ThemeProvider>
          <p>Seconds</p>
        </div>
      </div>
    </>
  );
}
