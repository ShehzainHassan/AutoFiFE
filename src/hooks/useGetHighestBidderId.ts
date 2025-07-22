"use client";
import auctionAPI from "@/api/auctionAPI";
import { useQuery } from "@tanstack/react-query";

const useHighestBidderId = (id: number) => {
  return useQuery({
    queryKey: ["highest-bidder", id],
    queryFn: () => auctionAPI.getHighestBidderId(id),
  });
};

export default useHighestBidderId;
