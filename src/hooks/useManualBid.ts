"use client";

import { useAuth } from "@/contexts/auth-context";
import useHighestBidderId from "@/hooks/useGetHighestBidderId";
import usePlaceBid from "@/hooks/usePlaceBid";
import { useParams } from "next/navigation";
import { useState } from "react";

export function useManualBid() {
  const [bid, setBid] = useState("");
  const { userId } = useAuth();
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
      { auctionId, amount: Number(bid), userId: userId ?? -1 },
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
    highestId,
    userId,
    isPending,
    isLoading,
    handleInputChange,
    handlePlaceBid,
    increaseBid,
  };
}
