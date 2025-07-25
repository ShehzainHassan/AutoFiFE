import Image from "next/image";
import HandleWatchlist from "@/app/components/handle-watchlist/handle-watchlist";
import classes from "./watchlist-image-card.module.css";
import { WatchlistImageCardViewProps } from "./watchlist-image-card.types";

export default function WatchlistImageCardView({
  imageSrc,
  isWatchlisted,
  handleWatchlist,
}: WatchlistImageCardViewProps) {
  return (
    <div className={classes.container}>
      <Image
        src={imageSrc}
        alt="car-image"
        fill
        className={classes.image}
        priority
      />
      <HandleWatchlist
        handleWatchlist={handleWatchlist}
        isAddedToWatched={isWatchlisted}
      />
    </div>
  );
}
