"use client";

import { useMemo } from "react";
import { toast } from "react-toastify";
import ErrorMessage from "@/app/components/error-message";
import Loading from "@/app/components/loading";

import FeaturedAuction from "@/assets/images/cars/2018_Honda_Civic.png";
import useUserWatchList from "@/hooks/useUserWatchList";
import useAddAuctionToWatchlist from "@/hooks/useAddAuctionToWatchlist";
import useRemoveFromWatchlist from "@/hooks/useRemoveAuctionFromWatchlist";
import { WatchlistImageCardProps } from "./watchlist-image-card.types";
import WatchlistImageCardView from "./watchlist-image-card-view";

export default function WatchlistImageCardContainer({
  auctionId,
  userId,
}: WatchlistImageCardProps) {
  const authData = localStorage.getItem("authData") ?? "";

  const {
    data: watchLists,
    isLoading,
    isError,
    error,
  } = useUserWatchList(userId);
  const { mutate: addToWatchlist } = useAddAuctionToWatchlist();
  const { mutate: removeFromWatchlist } = useRemoveFromWatchlist();

  const isWatchlisted = useMemo(() => {
    return watchLists?.some((w) => w.auctionId === auctionId) ?? false;
  }, [watchLists, auctionId]);

  const handleWatchlist = () => {
    if (!authData) {
      toast.error("Please sign in to watchlist vehicle");
      return;
    }

    if (!isWatchlisted) {
      addToWatchlist({ auctionId, userId });
    } else {
      removeFromWatchlist({ auctionId, userId });
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <WatchlistImageCardView
      imageSrc={FeaturedAuction}
      isWatchlisted={isWatchlisted}
      handleWatchlist={handleWatchlist}
    />
  );
}
