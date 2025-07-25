"use client";
import auctionAPI from "@/api/auctionAPI";
import { useQuery } from "@tanstack/react-query";

const useGetAuctionResult = (auctionId: number, enabled: boolean) => {
  return useQuery({
    queryKey: ["auctionResult", auctionId],
    queryFn: () => auctionAPI.processAuctionResult(auctionId),
    enabled,
  });
};

export default useGetAuctionResult;
