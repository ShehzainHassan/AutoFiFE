import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import classes from "./handle-watchlist.module.css";
import { HandleWatchListProps } from "./handle-watchlist.types";
export default function HandleWatchlist({
  isAddedToWatched,
  handleWatchlist,
}: HandleWatchListProps) {
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
