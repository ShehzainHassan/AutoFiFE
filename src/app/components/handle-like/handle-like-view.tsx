import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import classes from "./handle-like.module.css";
import { HandleLikeProps } from "./handle-like.types";

export default function HandleLikeView({
  handleLike,
  isLiked,
}: HandleLikeProps) {
  return (
    <div
      className={classes.imgContainer}
      data-testid="like-button"
      onClick={handleLike}>
      {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </div>
  );
}
