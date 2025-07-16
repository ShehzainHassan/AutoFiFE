"use client";
import ErrorMessage from "@/app/components/error-message";
import HandleWatchlist from "@/app/components/handle-watchlist/handle-watchlist";
import Loading from "@/app/components/loading";
import FeaturedAuction from "@/assets/images/cars/2018_Honda_Civic.png";
import useAddAuctionToWatchlist from "@/hooks/useAddAuctionToWatchlist";
import useRemoveFromWatchlist from "@/hooks/useRemoveAuctionFromWatchlist";
import useUserWatchList from "@/hooks/useUserWatchList";
import Image from "next/image";
import { toast } from "react-toastify";
import classes from "./image-container.module.css";
import { ImageContainerProps } from "./image-container.types";

export default function ImageContainer({
  auctionId,
  userId,
}: ImageContainerProps) {
  const {
    data: watchLists,
    isLoading,
    isError,
    error,
  } = useUserWatchList(userId);

  const { mutate: addToWatchlist } = useAddAuctionToWatchlist();
  const { mutate: removeFromWatchlist } = useRemoveFromWatchlist();
  const authData = localStorage.getItem("authData") ?? "";

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;

  const isWatchlisted =
    watchLists?.some((w) => w.auctionId === auctionId) ?? false;

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
  return (
    <div className={classes.container}>
      <Image
        src={FeaturedAuction}
        alt="car-image"
        fill
        className={classes.image}
      />
      <HandleWatchlist
        handleWatchlist={handleWatchlist}
        isAddedToWatched={isWatchlisted}
      />
    </div>
  );
}
