"use client";
import auctionAPI from "@/api/auctionAPI";
import { handleApiError } from "@/utilities/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
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

    onError: (error: unknown, { auctionId }, context) => {
      if (context?.previousAuction) {
        queryClient.setQueryData<AuctionDetails>(
          ["placeBid", auctionId],
          context.previousAuction
        );
      }

      if (
        typeof error === "object" &&
        error !== null &&
        "isAxiosError" in error &&
        (error as AxiosError).isAxiosError
      ) {
        const axiosError = error as AxiosError<{ error?: string }>;

        const status = axiosError.response?.status;
        if (status === 401 || status === 403) {
          handleApiError(axiosError, router);
        } else {
          const message =
            axiosError.response?.data?.error ||
            "Failed to place bid. Please try again.";
          toast.error(message);
        }
      } else {
        toast.error("An unknown error occurred.");
      }
    },

    onSettled: (_, __, { auctionId }) => {
      queryClient.invalidateQueries({ queryKey: ["placeBid", auctionId] });
    },

    onSuccess: (_, variables) => {
      const { auctionId } = variables;
      queryClient.invalidateQueries({
        queryKey: ["placeBid", auctionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["highest-bidder", auctionId],
      });

      queryClient.invalidateQueries({
        queryKey: ["userBids"],
      });
      queryClient.invalidateQueries({ queryKey: ["bidHistory", auctionId] });
      toast.success("Bid placed successfully!");
    },
  });
};

export default usePlaceBid;
