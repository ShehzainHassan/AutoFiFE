"use client";
import auctionAPI from "@/api/auctionAPI";
import { useQuery } from "@tanstack/react-query";

const useUserAutoBid = (id: number, auctionId: number, enabled: boolean) => {
  return useQuery({
    queryKey: ["userAutoBid", id, auctionId],
    queryFn: () => auctionAPI.getUserAutoBid(id, auctionId),
    enabled: id > 0 && auctionId > 0 && enabled,
  });
};

export default useUserAutoBid;
