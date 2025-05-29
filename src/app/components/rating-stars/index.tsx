import { Star, StarHalf, StarBorder } from "@mui/icons-material";
import classes from "./rating-stars.module.css";

type RatingStarsProps = {
  rating: number;
};

export default function RatingStars({ rating }: RatingStarsProps) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<Star key={i} style={{ color: "var(--color-blue300)" }} />);
    } else if (rating >= i - 0.5) {
      stars.push(
        <StarHalf key={i} style={{ color: "var(--color-blue300)" }} />
      );
    } else {
      stars.push(
        <StarBorder key={i} style={{ color: "var(--color-gray550)" }} />
      );
    }
  }

  return <div className={classes.stars}>{stars}</div>;
}
