"use client";
import auctionAPI from "@/api/auctionAPI";
import { useQuery } from "@tanstack/react-query";

const useAuctionWatchers = (id: number) => {
  return useQuery({
    queryKey: ["auctionWatchers", id],
    queryFn: () => auctionAPI.getAuctionWatchers(id),
    enabled: id > 0,
  });
};

export default useAuctionWatchers;
