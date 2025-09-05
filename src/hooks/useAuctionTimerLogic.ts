import { useMemo, useEffect } from "react";
import useCountdown from "@/hooks/useCountdown";
import { AuctionTimerProps } from "@/app/components/auction/auction-details/auction-info-panel/auction-timer/auction-timer.types";

export function useAuctionTimerLogic(
  auction: AuctionTimerProps["auction"],
  onTimerEnd?: AuctionTimerProps["onTimerEnd"]
) {
  const isPreview = auction.status === "PreviewMode";

  const countdownTarget = useMemo(() => {
    return isPreview
      ? auction?.scheduledStartTime ?? ""
      : auction?.endUtc ?? "";
  }, [isPreview, auction?.scheduledStartTime, auction?.endUtc]);

  const countdown = useCountdown(countdownTarget);
  const { hours, minutes, seconds } = countdown;

  const isTimeUp = useMemo(() => {
    return hours === 0 && minutes === 0 && seconds === 0;
  }, [hours, minutes, seconds]);

  useEffect(() => {
    if (isTimeUp) {
      onTimerEnd?.();
    }
  }, [isTimeUp, onTimerEnd]);

  const headingText = useMemo(() => {
    return isPreview ? "Auction starts in" : "Auction ends in";
  }, [isPreview]);

  return {
    hours,
    minutes,
    seconds,
    isTimeUp,
    headingText,
    isPreview,
  };
}
