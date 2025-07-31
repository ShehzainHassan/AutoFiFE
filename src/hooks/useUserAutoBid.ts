"use client";
import auctionAPI from "@/api/auctionAPI";
import { useQuery } from "@tanstack/react-query";

const useUserAutoBid = (auctionId: number, enabled: boolean) => {
  return useQuery({
    queryKey: ["userAutoBid", auctionId],
    queryFn: () => auctionAPI.getUserAutoBid(auctionId),
    enabled: auctionId > 0 && enabled,
  });
};

export default useUserAutoBid;
