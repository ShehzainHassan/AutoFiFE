"use client";
import auctionAPI from "@/api/auctionAPI";
import { useMutation } from "@tanstack/react-query";

const useTrackAuctionView = () => {
  return useMutation({
    mutationFn: async (auctionId: number) => {
      return await auctionAPI.trackAuctionView(auctionId);
    },
  });
};

export default useTrackAuctionView;
