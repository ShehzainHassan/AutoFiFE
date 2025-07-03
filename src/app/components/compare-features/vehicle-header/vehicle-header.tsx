import classes from "../compare-features.module.css";
import { VehicleHeaderProps } from "../compare-features.types";

export default function VehicleHeader({
  vehicle1,
  vehicle2,
  features1,
  features2,
}: VehicleHeaderProps) {
  return (
    <div className={classes.row}>
      <div></div>
      <div>{`${vehicle1.year} ${features1.make} ${features1.model}`}</div>
      <div>{`${vehicle2.year} ${features2.make} ${features2.model}`}</div>
    </div>
  );
}
