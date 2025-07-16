"use client";
import auctionAPI from "@/api/auctionAPI";
import { handleApiError } from "@/utilities/utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface RemoveWatchInput {
  auctionId: number;
  userId: number;
}

type Watchlist = number[];
type Watchers = number[];

const useRemoveFromWatchlist = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<
    void,
    unknown,
    RemoveWatchInput,
    { prevWatchlist?: Watchlist; prevWatchers?: Watchers }
  >({
    mutationFn: async ({ auctionId, userId }) => {
      await auctionAPI.removeFromWatchlist(auctionId, userId);
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
        (old = []) => old.filter((a) => a !== auctionId)
      );
      queryClient.setQueryData<Watchers>(
        ["auctionWatchers", auctionId],
        (old = []) => old.filter((u) => u !== userId)
      );

      return { prevWatchlist, prevWatchers };
    },
    onError: (error, { auctionId, userId }, ctx) => {
      if (ctx?.prevWatchlist)
        queryClient.setQueryData(["userWatchList", userId], ctx.prevWatchlist);
      if (ctx?.prevWatchers)
        queryClient.setQueryData(
          ["auctionWatchers", auctionId],
          ctx.prevWatchers
        );
      handleApiError(error, router);
    },
    onSettled: (_data, _error, { auctionId, userId }) => {
      queryClient.invalidateQueries({ queryKey: ["userWatchList", userId] });
      queryClient.invalidateQueries({
        queryKey: ["auctionWatchers", auctionId],
      });
    },
    onSuccess: () => {
      toast.success("Removed from watchlist");
    },
  });
};

export default useRemoveFromWatchlist;
