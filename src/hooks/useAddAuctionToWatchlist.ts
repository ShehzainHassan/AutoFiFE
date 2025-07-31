"use client";
import auctionAPI from "@/api/auctionAPI";
import { handleApiError } from "@/utilities/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface AddWatchInput {
  auctionId: number;
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
    mutationFn: async ({ auctionId }) => {
      await auctionAPI.addAuctionToWatchlist(auctionId);
    },

    onMutate: async ({ auctionId }) => {
      await queryClient.cancelQueries({ queryKey: ["userWatchList"] });
      await queryClient.cancelQueries({
        queryKey: ["auctionWatchers", auctionId],
      });

      const prevWatchlist = queryClient.getQueryData<Watchlist>([
        "userWatchList",
      ]);
      const prevWatchers = queryClient.getQueryData<Watchers>([
        "auctionWatchers",
        auctionId,
      ]);

      queryClient.setQueryData<Watchlist>(["userWatchList"], (old = []) =>
        old.includes(auctionId) ? old : [...old, auctionId]
      );
      return { prevWatchlist, prevWatchers };
    },

    onError: (error, { auctionId }, ctx) => {
      if (ctx?.prevWatchlist) {
        queryClient.setQueryData(["userWatchList"], ctx.prevWatchlist);
      }
      if (ctx?.prevWatchers) {
        queryClient.setQueryData(
          ["auctionWatchers", auctionId],
          ctx.prevWatchers
        );
      }
      handleApiError(error, router);
    },

    onSettled: (_data, _error, { auctionId }) => {
      queryClient.invalidateQueries({ queryKey: ["userWatchList"] });
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
