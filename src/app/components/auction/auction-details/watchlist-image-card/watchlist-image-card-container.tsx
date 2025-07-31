"use client";

import Loading from "@/app/components/loading";
import { useMemo } from "react";
import { toast } from "react-toastify";

import FeaturedAuction from "@/assets/images/cars/2018_Honda_Civic.png";
import useAddAuctionToWatchlist from "@/hooks/useAddAuctionToWatchlist";
import useRemoveFromWatchlist from "@/hooks/useRemoveAuctionFromWatchlist";
import useUserWatchList from "@/hooks/useUserWatchList";
import WatchlistImageCardView from "./watchlist-image-card-view";
import { WatchlistImageCardProps } from "./watchlist-image-card.types";
import ErrorMessage from "@/app/components/error-message";

export default function WatchlistImageCardContainer({
  auctionId,
}: WatchlistImageCardProps) {
  const authData = localStorage.getItem("authData") ?? "";

  const {
    data: watchLists,
    isLoading,
    isError,
    error,
  } = useUserWatchList(!!authData);
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
      addToWatchlist({ auctionId });
    } else {
      removeFromWatchlist({ auctionId });
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
