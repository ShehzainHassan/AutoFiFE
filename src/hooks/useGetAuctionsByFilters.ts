"use client";
import auctionAPI from "@/api/auctionAPI";
import { AuctionFilters } from "@/interfaces/auction";
import { useQuery } from "@tanstack/react-query";

const useGetAuctionByFilters = (filters: AuctionFilters) => {
  return useQuery({
    queryKey: ["auction-by-filters", filters],
    queryFn: () => auctionAPI.getAuctionByFilters(filters),
  });
};

export default useGetAuctionByFilters;
