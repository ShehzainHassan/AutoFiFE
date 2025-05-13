import InputWithLabel from "../../input-with-label";
import classes from "./price-expanded.module.css";
export default function PriceExpanded() {
  return (
    <div>
      <div className={classes.price}>
        <InputWithLabel label="From" value={0} />
      </div>
      <div className={classes.price}>
        <InputWithLabel label="To" value={0} />
      </div>
    </div>
  );
}
