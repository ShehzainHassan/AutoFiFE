import Expandable from "../expandable-dropdown";
import classes from "./filters.module.css";
export default function Filters() {
  return (
    <div className={classes.filters}>
      <Expandable title="Years" />
      <Expandable title="Price" />
      <Expandable title="Mileage" />
      <Expandable title="Gearbox" />
      <Expandable title="Exterior color" />
    </div>
  );
}
