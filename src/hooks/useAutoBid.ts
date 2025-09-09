"use client";
import { useAuth } from "@/contexts/auth-context";
import useIsAutoBidSet from "@/hooks/useIsAutoBidSet";
import usePlaceAutoBid from "@/hooks/usePlaceAutoBid";
import useUpdateAutoBid from "@/hooks/useUpdateAutoBid";
import useUserAutoBid from "@/hooks/useUserAutoBid";
import { AutoBid, UpdateAutoBid } from "@/interfaces/auction";
import {
  formatBidStrategyType,
  formatBidStrategyTypeReverse,
  formatBidTiming,
  formatBidTimingReverse,
} from "@/utilities/utilities";
import { useEffect, useState } from "react";

export function useAutoBid(
  auctionId: number,
  startingPrice: number,
  currentBid: number
) {
  const [maxBidAmount, setMaxBidAmount] = useState("");
  const [biddingStrategy, setBiddingStrategy] = useState("");
  const [timingPreference, setTimingPreference] = useState("");
  const [bidDelaySeconds, setBidDelaySeconds] = useState("");
  const [maxBidsPerMinute, setMaxBidsPerMinute] = useState("");
  const [totalBids, setTotalBids] = useState("");
  const [isActive, setIsActive] = useState<boolean | null>(null);

  const { userId } = useAuth();
  const { mutate: placeAutoBid, isPending: placing } = usePlaceAutoBid();
  const { mutate: updateAutoBid, isPending: updating } = useUpdateAutoBid();

  const { data: isAutoBidSet = false, isLoading: isAutoBidLoading } =
    useIsAutoBidSet(auctionId);
  const { data: userAutoBid = null, isLoading: userAutoBidLoading } =
    useUserAutoBid(auctionId, isAutoBidSet);

  const handleSubmit = () => {
    if (isAutoBidSet) {
      const payload: UpdateAutoBid = {
        maxBidAmount: Number(maxBidAmount),
        bidStrategyType: formatBidStrategyType(biddingStrategy),
        isActive: isActive ?? true,
      };
      updateAutoBid({ auctionId, updateAutoBid: payload });
    } else {
      const payload: AutoBid = {
        userId: userId ?? -1,
        auctionId,
        maxBidAmount: Number(maxBidAmount),
        bidStrategyType: formatBidStrategyType(biddingStrategy),
        bidDelaySeconds: bidDelaySeconds ? Number(bidDelaySeconds) : null,
        maxBidsPerMinute: maxBidsPerMinute ? Number(maxBidsPerMinute) : null,
        preferredBidTiming: formatBidTiming(timingPreference),
        maxSpreadBids: totalBids ? Number(totalBids) : null,
        isActive: true,
      };
      placeAutoBid(payload);
    }
  };

  useEffect(() => {
    if (userAutoBid) {
      setMaxBidAmount(userAutoBid.maxBidAmount.toString());
      setBiddingStrategy(
        formatBidStrategyTypeReverse(userAutoBid.bidStrategyType)
      );
      setTimingPreference(
        formatBidTimingReverse(userAutoBid.preferredBidTiming)
      );
      setBidDelaySeconds(userAutoBid.bidDelaySeconds?.toString() ?? "");
      setMaxBidsPerMinute(userAutoBid.maxBidsPerMinute?.toString() ?? "");
      setTotalBids(userAutoBid.maxSpreadBids?.toString() ?? "");
      setIsActive(userAutoBid.isActive);
    }
  }, [userAutoBid]);

  const isDisabled =
    placing || updating || !maxBidAmount || Number(maxBidAmount) <= 0;

  return {
    maxBidAmount,
    biddingStrategy,
    timingPreference,
    bidDelaySeconds,
    maxBidsPerMinute,
    totalBids,
    isActive,
    isAutoBidSet,
    isLoading: isAutoBidLoading || userAutoBidLoading,
    isDisabled,
    startingPrice,
    currentBid,
    setMaxBidAmount,
    setBiddingStrategy,
    setTimingPreference,
    setBidDelaySeconds,
    setMaxBidsPerMinute,
    setTotalBids,
    setIsActive,
    handleSubmit,
  };
}
