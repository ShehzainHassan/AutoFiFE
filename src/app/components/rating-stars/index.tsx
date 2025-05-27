import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import classes from "./rating-stars.module.css";
type RatingStarsProps = {
  rating: number;
};

export default function RatingStars({ rating }: RatingStarsProps) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <FontAwesomeIcon key={i} icon={faStar} style={{ color: "blue" }} />
        );
      } else if (rating >= i - 0.5) {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStarHalfAlt}
            style={{ color: "blue" }}
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon key={i} icon={faStar} style={{ color: "gray" }} />
        );
      }
    }
    return <div className={classes.stars}>{stars}</div>;
  }
}
