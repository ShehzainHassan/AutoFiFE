"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import useHighestBidderId from "@/hooks/useGetHighestBidderId";
import usePlaceBid from "@/hooks/usePlaceBid";
import { getUserIdFromLocalStorage } from "@/utilities/utilities";

export function useManualBid() {
  const [bid, setBid] = useState("");
  const authData = localStorage.getItem("authData") ?? "";
  const userId = getUserIdFromLocalStorage() ?? -1;

  const params = useParams();
  const auctionId = params.id ? Number(params.id) : -1;

  const { mutate: placeBid, isPending } = usePlaceBid();
  const { data: highestId, isLoading } = useHighestBidderId(auctionId);

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

  return {
    bid,
    setBid,
    authData,
    highestId,
    userId,
    isPending,
    isLoading,
    handleInputChange,
    handlePlaceBid,
    increaseBid,
  };
}
