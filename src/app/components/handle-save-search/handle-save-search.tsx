import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import classes from "./handle-save-search.module.css";
import { HandleSaveSearchProps } from "./handle-save-search.types";

const SaveSearchButton = ({
  isSaved,
  handleSaveSearch,
}: HandleSaveSearchProps) => {
  return (
    <div className={classes.saveBtnContainer} onClick={handleSaveSearch}>
      {isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      <button className={classes.saveBtn}>Save Search</button>
    </div>
  );
};

export default SaveSearchButton;
