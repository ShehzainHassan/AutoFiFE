import Expandable from "../expandable-dropdown";
import classes from "./filters.module.css";
export default function Filters() {
  return (
    <div className={`${classes.filters} `}>
      <Expandable title="Status" className={classes.border} />
      <Expandable title="Years" className={classes.border} />
      <Expandable title="Price" className={classes.border} />
      <Expandable title="Mileage" className={classes.border} />
      <Expandable title="Gearbox" className={classes.border} />
      <Expandable title="Exterior color" />
    </div>
  );
}
