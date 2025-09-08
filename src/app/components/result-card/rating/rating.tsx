import classes from "./rating.module.css";
import headings from "@/styles/typography.module.css";
import { RatingProps } from "./rating.types";

const Rating = ({ rating }: RatingProps) => (
  <div className={classes.rating}>
    <p className={headings.noRatings}>{rating ?? "No Rating"}</p>
  </div>
);
export default Rating;
