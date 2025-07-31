"use client";
import auctionAPI from "@/api/auctionAPI";
import { useQuery } from "@tanstack/react-query";

const useIsAutoBidSet = (auctionId: number) => {
  return useQuery({
    queryKey: ["isAutoBidSet", auctionId],
    queryFn: () => auctionAPI.isAutoBidSet(auctionId),
  });
};

export default useIsAutoBidSet;
