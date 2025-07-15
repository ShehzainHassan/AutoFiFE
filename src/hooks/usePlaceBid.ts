"use client";
import auctionAPI from "@/api/auctionAPI";
import { useMutation } from "@tanstack/react-query";

const usePlaceBid = (id: number, amount: number, userId: number) => {
  return useMutation({
    mutationFn: async () => {
      return await auctionAPI.placeBid(id, amount, userId);
    },
  });
};
export default usePlaceBid;
