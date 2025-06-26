import classes from "./monthly-estimate.module.css";
import headings from "@/styles/typography.module.css";
const EstimatedMonthly = () => (
  <div className={`${classes.perMonth} ${headings.smallText}`}>
    <p>Est. $388/mo</p>
    <div className={classes.circle}>i</div>
  </div>
);
export default EstimatedMonthly;
