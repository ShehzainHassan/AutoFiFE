"use client";
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
  getUserIdFromLocalStorage,
} from "@/utilities/utilities";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AutoBidTypeProps } from "../auction-info-panel.types";
import AutoPlaceBidView from "./auto-bid-view";
import { useSignalNotifications } from "@/hooks/useSignalNotifications";

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
  const queryClient = useQueryClient();

  useSignalNotifications(auctionId, () => {
    queryClient.invalidateQueries({ queryKey: ["highest-bidder", auctionId] });
  });

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

  if (!authData) return <p>Please sign in to set autobid</p>;
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
