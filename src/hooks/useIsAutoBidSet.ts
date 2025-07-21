"use client";
import auctionAPI from "@/api/auctionAPI";
import { useQuery } from "@tanstack/react-query";

const useIsAutoBidSet = (auctionId: number, userId: number) => {
  return useQuery({
    queryKey: ["isAutoBidSet", auctionId, userId],
    queryFn: () => auctionAPI.isAutoBidSet(auctionId, userId),
  });
};

export default useIsAutoBidSet;
