"use client";
import auctionAPI from "@/api/auctionAPI";
import { useQuery } from "@tanstack/react-query";

const useIsAutoBidSet = (auctionId: number, userId: number | null) => {
  return useQuery({
    queryKey: ["isAutoBidSet", auctionId, userId],
    queryFn: () => auctionAPI.isAutoBidSet(auctionId),
    enabled: !!userId,
  });
};

export default useIsAutoBidSet;
