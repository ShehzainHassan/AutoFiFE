import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./vehicle-highlight-info.module.css";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import RatingStars from "../rating-stars/ratings-stars";
import { CURRENCY } from "@/constants";
import { VehicleHighlightInfoProps } from "./vehicle-highlight-info.types";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const VehicleHighlightInfo = ({ vehicle }: VehicleHighlightInfoProps) => {
  return (
    <div>
      <div className={classes.carTitleContainer}>
        <h1 className={classes.carTitle}>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h1>
        <p className={classes.carPrice}>
          {CURRENCY}
          {vehicle.price.toLocaleString()}
        </p>
      </div>
      <div className={classes.carDetails}>
        <div className={classes.marketPrice}>
          <div className={classes.arrowContainer}>
            <FontAwesomeIcon icon={faArrowCircleUp} />
            <div className={classes.deal}>Great Deal</div>
          </div>
          <div className={classes.marketContainer}>
            $1,557 below market
            <InfoOutlinedIcon className={classes.icon} />
          </div>
        </div>
        <div className={classes.dealerRating}>
          <p className={classes.dealer}>Dealer rating</p>
          <RatingStars rating={4.5} />
        </div>
      </div>
    </div>
  );
};
export default VehicleHighlightInfo;
