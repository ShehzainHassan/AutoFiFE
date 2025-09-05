"use client";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import useCountdown from "@/hooks/useCountdown";
import { trackError } from "@/utilities/error-tracking";

export const useAuctionCard = (auctionId: number, endUTC: string) => {
  const { hours, minutes, seconds, totalSeconds } = useCountdown(endUTC);
  const router = useRouter();

  const handleRedirect = useCallback(() => {
    try {
      router.push(`/auction/${auctionId}`);
    } catch (error) {
      trackError(error as Error, { context: "AuctionCard Redirect" });
    }
  }, [auctionId, router]);

  const timerText = useMemo(() => {
    if (totalSeconds > 0) {
      return `Ends in: ${hours}h ${minutes
        .toString()
        .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
    }
    return "ENDED";
  }, [hours, minutes, seconds, totalSeconds]);

  return {
    hours,
    minutes,
    seconds,
    totalSeconds,
    timerText,
    handleRedirect,
  };
};
