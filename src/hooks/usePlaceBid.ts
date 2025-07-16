"use client";
import auctionAPI from "@/api/auctionAPI";
import {
  getUserIdFromLocalStorage,
  handleApiError,
} from "@/utilities/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Bid {
  id: number;
  amount: number;
  userId: number;
  createdAt: string;
  optimistic?: boolean;
}

interface AuctionDetails {
  id: number;
  highestBid: number;
  bids: Bid[];
}

interface PlaceBidInput {
  auctionId: number;
  amount: number;
  userId: number;
}

const usePlaceBid = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<
    void,
    unknown,
    PlaceBidInput,
    { previousAuction?: AuctionDetails }
  >({
    mutationFn: async ({ auctionId, amount, userId }) => {
      await auctionAPI.placeBid(auctionId, amount, userId);
    },

    onMutate: async ({ auctionId, amount, userId }) => {
      await queryClient.cancelQueries({ queryKey: ["placeBid", auctionId] });

      const previousAuction = queryClient.getQueryData<AuctionDetails>([
        "placeBid",
        auctionId,
      ]);

      queryClient.setQueryData<AuctionDetails>(
        ["placeBid", auctionId],
        (old) => {
          if (!old) return old;

          const newBid: Bid = {
            id: Date.now(),
            amount,
            userId,
            createdAt: new Date().toISOString(),
            optimistic: true,
          };

          return {
            ...old,
            highestBid: Math.max(old.highestBid, amount),
            bids: [...old.bids, newBid],
          };
        }
      );

      return { previousAuction };
    },

    onError: (error, { auctionId }, context) => {
      if (context?.previousAuction) {
        queryClient.setQueryData<AuctionDetails>(
          ["placeBid", auctionId],
          context.previousAuction
        );
      }
      handleApiError(error, router);
    },

    onSettled: (_, __, { auctionId }) => {
      queryClient.invalidateQueries({ queryKey: ["placeBid", auctionId] });
    },

    onSuccess: (_, variables) => {
      const { auctionId } = variables;
      const userId = getUserIdFromLocalStorage() ?? -1;
      queryClient.invalidateQueries({
        queryKey: ["placeBid", auctionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["auctionById", auctionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["userBids", userId],
      });
      queryClient.invalidateQueries({ queryKey: ["bidHistory", auctionId] });
      toast.success("Bid placed successfully!");
    },
  });
};

export default usePlaceBid;
