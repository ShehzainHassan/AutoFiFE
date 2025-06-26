import classes from "./features.module.css";
import headings from "@/styles/typography.module.css";
const Features = () => (
  <div className={`${classes.features} ${headings.smallText}`}>
    <p>Leather seats</p>
    <p>.</p>
    <p>Alloy wheels</p>
  </div>
);
export default Features;
