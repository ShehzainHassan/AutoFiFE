import classes from "./rating.module.css";
import headings from "@/styles/typography.module.css";

const Rating = () => (
  <div className={classes.rating}>
    <p className={headings.noRatings}>No rating</p>
  </div>
);
export default Rating;
