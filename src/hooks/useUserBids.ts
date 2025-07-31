"use client";
import auctionAPI from "@/api/auctionAPI";
import { useQuery } from "@tanstack/react-query";

const useUserBids = (enabled: boolean) => {
  return useQuery({
    queryKey: ["userBids"],
    queryFn: () => auctionAPI.getUserBidHistory(),
    enabled,
  });
};

export default useUserBids;
