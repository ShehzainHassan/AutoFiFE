import Expandable from "../Expandable Dropdown/expandable";
import classes from "./Filters.module.css";
export default function Filters() {
  return (
    <div className={classes.filters}>
      <Expandable title="Years" />
      <Expandable title="Location and delivery" />
      <Expandable title="Price" />
      <Expandable title="Mileage" />
      <Expandable title="Gearbox" />
      <Expandable title="Engine size" />
      <Expandable title="CO2" />
      <Expandable title="Insurance group" />
      <Expandable title="Variant" />
      <Expandable title="Days on market" />
      <Expandable title="Exterior color" />
      <Expandable title="Features" />
      <Expandable title="ULEZ compliance" />
      <Expandable title="Fuel economy" />
      <Expandable title="Price drops" roundedSides={true} />
    </div>
  );
}
