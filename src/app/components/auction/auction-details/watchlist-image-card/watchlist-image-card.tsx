"use client";

import Image from "next/image";
import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";

import ErrorMessage from "@/app/components/error-message";
import HandleWatchlist from "@/app/components/handle-watchlist/handle-watchlist";
import Loading from "@/app/components/loading";
import FeaturedAuction from "@/assets/images/cars/2018_Honda_Civic.png";

import useAddAuctionToWatchlist from "@/hooks/useAddAuctionToWatchlist";
import useRemoveFromWatchlist from "@/hooks/useRemoveAuctionFromWatchlist";
import useUserWatchList from "@/hooks/useUserWatchList";

import { getAccessToken } from "@/store/tokenStore";
import classes from "./watchlist-image-card.module.css";
import { WatchlistImageCardProps } from "./watchlist-image-card.types";

export default function WatchlistImageCardContainer({
  auctionId,
}: WatchlistImageCardProps) {
  const accessToken = getAccessToken();

  const {
    data: watchLists,
    isLoading,
    isError,
    error,
  } = useUserWatchList(!!accessToken);

  const { mutate: addToWatchlist } = useAddAuctionToWatchlist();
  const { mutate: removeFromWatchlist } = useRemoveFromWatchlist();
  const isWatchlisted = useMemo(() => {
    return watchLists?.some((w) => w.auctionId === auctionId) ?? false;
  }, [watchLists, auctionId]);

  const handleWatchlist = useCallback(() => {
    if (!accessToken) {
      toast.error("Please sign in to watchlist vehicle");
      return;
    }

    if (!isWatchlisted) {
      addToWatchlist({ auctionId });
    } else {
      removeFromWatchlist({ auctionId });
    }
  }, [
    accessToken,
    isWatchlisted,
    auctionId,
    addToWatchlist,
    removeFromWatchlist,
  ]);

  if (isLoading) {
    return (
      <div role="status" aria-live="polite">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert" aria-live="assertive">
        <ErrorMessage
          message={(error as Error)?.message ?? "Failed to load watchlist"}
        />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <Image
        src={FeaturedAuction}
        alt="Featured auction vehicle"
        fill
        className={classes.image}
        priority
        loading="eager"
      />
      <HandleWatchlist
        handleWatchlist={handleWatchlist}
        isAddedToWatched={isWatchlisted}
      />
    </div>
  );
}
