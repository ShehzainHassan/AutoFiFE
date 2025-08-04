"use client";
import auctionAPI from "@/api/auctionAPI";
import { useQuery } from "@tanstack/react-query";

const useHighestBidderId = (id: number) => {
  return useQuery({
    queryKey: ["highest-bidder", id],
    queryFn: () => auctionAPI.getHighestBidderId(id),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
};

export default useHighestBidderId;
