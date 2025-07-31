import { StaticImageData } from "next/image";

export interface WatchlistImageCardProps {
  auctionId: number;
}

export interface WatchlistImageCardViewProps {
  imageSrc: string | StaticImageData;
  isWatchlisted: boolean;
  handleWatchlist: () => void;
}
