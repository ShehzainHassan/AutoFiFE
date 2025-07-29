import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import classes from "./handle-save-search.module.css";
import { HandleSaveSearchProps } from "./handle-save-search.types";

const SaveSearchButtonView = ({
  isSaved,
  handleSaveSearch,
}: HandleSaveSearchProps) => {
  return (
    <div className={classes.saveBtnContainer} onClick={handleSaveSearch}>
      {isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      <button aria-label="Save Search" className={classes.saveBtn}>
        Save Search
      </button>
    </div>
  );
};

export default SaveSearchButtonView;
