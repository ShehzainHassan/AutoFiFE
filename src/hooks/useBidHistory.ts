"use client";
import auctionAPI from "@/api/auctionAPI";
import { useQuery } from "@tanstack/react-query";

const useBidHistory = (id: number) => {
  return useQuery({
    queryKey: ["bidHistory", id],
    queryFn: () => auctionAPI.getBidHistory(id),
    enabled: id > 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
};

export default useBidHistory;
