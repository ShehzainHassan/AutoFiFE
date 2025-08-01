"use client";

import useHighestBidderId from "@/hooks/useGetHighestBidderId";
import usePlaceBid from "@/hooks/usePlaceBid";
import { useParams } from "next/navigation";
import { getUserIdFromLocalStorage } from "@/utilities/utilities";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "@/app/components/loading";
import ManualBidView from "./manual-bid-view";
import { ManualBidProps } from "./manual-bid.types";
import { useSignalNotifications } from "@/hooks/useSignalNotifications";

export default function ManualBidContainer({
  startingPrice,
  currentBid,
}: ManualBidProps) {
  const [bid, setBid] = useState("");
  const authData = localStorage.getItem("authData") ?? "";
  const userId = getUserIdFromLocalStorage() ?? -1;

  const params = useParams();
  const auctionId = params.id ? Number(params.id) : -1;

  const { mutate: placeBid, isPending } = usePlaceBid();
  const { data: highestId, isLoading } = useHighestBidderId(auctionId);
  const queryClient = useQueryClient();

  useSignalNotifications(auctionId, () => {
    queryClient.invalidateQueries({ queryKey: ["highest-bidder", auctionId] });
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setBid(value);
    }
  };

  const handlePlaceBid = () => {
    placeBid(
      { auctionId, amount: Number(bid), userId },
      { onSuccess: () => setBid("") }
    );
  };

  const increaseBid = (amount: number) => {
    const current = bid === "" ? 0 : parseInt(bid, 10);
    setBid((current + amount).toString());
  };

  if (isLoading) return <Loading />;

  return (
    <ManualBidView
      bid={bid}
      setBid={setBid}
      authData={authData}
      currentBid={currentBid}
      startingPrice={startingPrice}
      highestId={highestId}
      userId={userId}
      isPending={isPending}
      handleInputChange={handleInputChange}
      handlePlaceBid={handlePlaceBid}
      increaseBid={increaseBid}
    />
  );
}
