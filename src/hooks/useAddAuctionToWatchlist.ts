"use client";
import auctionAPI from "@/api/auctionAPI";
import { handleApiError } from "@/utilities/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface AddWatchInput {
  auctionId: number;
  userId: number;
}

type Watchlist = number[];
type Watchers = number[];

const useAddAuctionToWatchlist = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<
    void,
    unknown,
    AddWatchInput,
    {
      prevWatchlist?: Watchlist;
      prevWatchers?: Watchers;
    }
  >({
    mutationFn: async ({ auctionId, userId }) => {
      await auctionAPI.addAuctionToWatchlist(auctionId, userId);
    },

    onMutate: async ({ auctionId, userId }) => {
      await queryClient.cancelQueries({ queryKey: ["userWatchList", userId] });
      await queryClient.cancelQueries({
        queryKey: ["auctionWatchers", auctionId],
      });

      const prevWatchlist = queryClient.getQueryData<Watchlist>([
        "userWatchList",
        userId,
      ]);
      const prevWatchers = queryClient.getQueryData<Watchers>([
        "auctionWatchers",
        auctionId,
      ]);

      queryClient.setQueryData<Watchlist>(
        ["userWatchList", userId],
        (old = []) => (old.includes(auctionId) ? old : [...old, auctionId])
      );

      queryClient.setQueryData<Watchers>(
        ["auctionWatchers", auctionId],
        (old = []) => (old.includes(userId) ? old : [...old, userId])
      );

      return { prevWatchlist, prevWatchers };
    },

    onError: (error, { auctionId, userId }, ctx) => {
      if (ctx?.prevWatchlist) {
        queryClient.setQueryData(["userWatchList", userId], ctx.prevWatchlist);
      }
      if (ctx?.prevWatchers) {
        queryClient.setQueryData(
          ["auctionWatchers", auctionId],
          ctx.prevWatchers
        );
      }
      handleApiError(error, router);
    },

    onSettled: (_data, _error, { auctionId, userId }) => {
      queryClient.invalidateQueries({ queryKey: ["userWatchList", userId] });
      queryClient.invalidateQueries({
        queryKey: ["auctionWatchers", auctionId],
      });
    },

    onSuccess: () => {
      toast.success("Added to your watchlist!");
    },
  });
};

export default useAddAuctionToWatchlist;
