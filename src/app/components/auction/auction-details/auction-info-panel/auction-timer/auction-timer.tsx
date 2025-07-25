"use client";

import useCountdown from "@/hooks/useCountdown";
import headings from "@/styles/typography.module.css";
import classes from "../auction-info-panel.module.css";
import { AuctionTimerProps } from "./auction-timer.types";
import { useEffect } from "react";
import TimerUnit from "./timer-unit";

export default function AuctionTimer({
  auction,
  onTimerEnd,
}: AuctionTimerProps) {
  const isPreview = auction.status === "PreviewMode";
  const countdown = useCountdown(
    isPreview ? auction?.startUtc ?? "" : auction?.endUtc ?? ""
  );

  const { hours, minutes, seconds } = countdown;
  const isTimeUp = hours === 0 && minutes === 0 && seconds === 0;

  useEffect(() => {
    if (isTimeUp) {
      onTimerEnd?.();
    }
  }, [isTimeUp, onTimerEnd]);

  if (isTimeUp && !isPreview) {
    return <p className={classes.auctionEndedText}>Auction has ended</p>;
  }

  const headingText = isPreview ? "Auction starts in" : "Auction ends in";

  return (
    <>
      <p
        className={`${classes.center} ${classes.text} ${headings.auctionEndText}`}>
        {headingText}
      </p>
      <div className={classes.timerContainer}>
        <TimerUnit label="Hours" value={hours} />
        <TimerUnit
          label="Minutes"
          value={minutes.toString().padStart(2, "0")}
        />
        <TimerUnit
          label="Seconds"
          value={seconds.toString().padStart(2, "0")}
        />
      </div>
    </>
  );
}
