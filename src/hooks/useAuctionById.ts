"use client";
import auctionAPI from "@/api/auctionAPI";
import { useQuery } from "@tanstack/react-query";

const useAuctionById = (id: number) => {
  return useQuery({
    queryKey: ["auctionById", id],
    queryFn: () => auctionAPI.getAuctionById(id),
    enabled: id > 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
};

export default useAuctionById;
