"use client";
import auctionAPI from "@/api/auctionAPI";
import { useQuery } from "@tanstack/react-query";

const useUserBids = (id: number) => {
  return useQuery({
    queryKey: ["userBids", id],
    queryFn: () => auctionAPI.getUserBidHistory(id),
    enabled: id > 0,
  });
};

export default useUserBids;
