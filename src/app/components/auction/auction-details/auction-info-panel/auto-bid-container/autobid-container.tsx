"use client";
import { useEffect, useState } from "react";
import {
  formatBidTiming,
  formatBidStrategyType,
  getUserIdFromLocalStorage,
  formatBidStrategyTypeReverse,
  formatBidTimingReverse,
} from "@/utilities/utilities";
import { AutoBid, UpdateAutoBid } from "@/interfaces/auction";
import AutoPlaceBidView from "./auto-bid-view";
import { AutoBidTypeProps } from "../auction-info-panel.types";
import usePlaceAutoBid from "@/hooks/usePlaceAutoBid";
import useUpdateAutoBid from "@/hooks/useUpdateAutoBid";
import useIsAutoBidSet from "@/hooks/useIsAutoBidSet";
import useUserAutoBid from "@/hooks/useUserAutoBid";

export default function AutoPlaceBidContainer({
  auctionId,
  startingPrice,
  currentBid,
}: AutoBidTypeProps) {
  const [maxBidAmount, setMaxBidAmount] = useState("");
  const [biddingStrategy, setBiddingStrategy] = useState("");
  const [timingPreference, setTimingPreference] = useState("");
  const [bidDelaySeconds, setBidDelaySeconds] = useState("");
  const [maxBidsPerMinute, setMaxBidsPerMinute] = useState("");
  const [totalBids, setTotalBids] = useState("");
  const [isActive, setIsActive] = useState<boolean | null>(null);

  const authData = localStorage.getItem("authData") ?? "";
  const userId = getUserIdFromLocalStorage() ?? -1;

  const { mutate: placeAutoBid, isPending: placing } = usePlaceAutoBid();
  const { mutate: updateAutoBid, isPending: updating } = useUpdateAutoBid();

  const { data: isAutoBidSet = false, isLoading: isAutoBidLoading } =
    useIsAutoBidSet(auctionId, userId);
  const { data: userAutoBid = null, isLoading: userAutoBidLoading } =
    useUserAutoBid(userId, auctionId, isAutoBidSet);

  const handleSubmit = () => {
    if (isAutoBidSet) {
      const payload: UpdateAutoBid = {
        maxBidAmount: Number(maxBidAmount),
        bidStrategyType: formatBidStrategyType(biddingStrategy),
        isActive: isActive ?? true,
      };
      updateAutoBid({ auctionId, userId, updateAutoBid: payload });
    } else {
      const payload: AutoBid = {
        userId,
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

  return (
    <AutoPlaceBidView
      maxBidAmount={maxBidAmount}
      biddingStrategy={biddingStrategy}
      timingPreference={timingPreference}
      bidDelaySeconds={bidDelaySeconds}
      maxBidsPerMinute={maxBidsPerMinute}
      totalBids={totalBids}
      isActive={isActive}
      startingPrice={startingPrice}
      currentBid={currentBid}
      isAutoBidSet={isAutoBidSet}
      authData={authData}
      isLoading={isAutoBidLoading || userAutoBidLoading}
      isDisabled={isDisabled}
      onInputChange={(e) => setMaxBidAmount(e.target.value)}
      onStrategyChange={setBiddingStrategy}
      onTimingChange={setTimingPreference}
      onBidDelayChange={setBidDelaySeconds}
      onMaxBidsChange={setMaxBidsPerMinute}
      onTotalBidsChange={setTotalBids}
      onStatusChange={setIsActive}
      onSubmit={handleSubmit}
    />
  );
}
