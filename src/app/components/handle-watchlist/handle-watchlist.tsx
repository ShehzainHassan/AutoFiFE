import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import classes from "./handle-watchlist.module.css";
import { HandleWatchListProps } from "./handle-watchlist.types";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import useAuctionById from "@/hooks/useAuctionById";
export default function HandleWatchlist({
  isAddedToWatched,
  handleWatchlist,
}: HandleWatchListProps) {
  const params = useParams();

  const id = useMemo(() => (params.id ? Number(params.id) : -1), [params.id]);
  const { data: auction } = useAuctionById(id);
  if (auction?.status === "Ended") return;
  return (
    <div className={classes.icon} onClick={handleWatchlist}>
      {isAddedToWatched ? (
        <BookmarkIcon className={classes.watchlist} />
      ) : (
        <BookmarkBorderIcon className={classes.watchlist} />
      )}
    </div>
  );
}
