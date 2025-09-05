"use client";

import { memo } from "react";
import headings from "@/styles/typography.module.css";
import classes from "../auction-info-panel.module.css";
import TimerUnit from "./timer-unit";
import { AuctionTimerProps } from "./auction-timer.types";
import { useAuctionTimerLogic } from "@/hooks/useAuctionTimerLogic";
import { ErrorBoundary } from "@sentry/nextjs";

function AuctionTimer({ auction, onTimerEnd }: AuctionTimerProps) {
  const { hours, minutes, seconds, isTimeUp, headingText, isPreview } =
    useAuctionTimerLogic(auction, onTimerEnd);

  if (isTimeUp && !isPreview) {
    return (
      <p
        className={classes.auctionEndedText}
        role="alert"
        aria-live="assertive">
        Auction has ended
      </p>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Failed to load auction timer</div>}>
      <section
        className={classes.timerContainer}
        role="region"
        aria-label={headingText}>
        <p
          className={`${classes.center} ${classes.text} ${headings.auctionEndText}`}
          role="heading"
          aria-level={2}>
          {headingText}
        </p>
        <div className={classes.time}>
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
      </section>
    </ErrorBoundary>
  );
}

export default memo(AuctionTimer);
