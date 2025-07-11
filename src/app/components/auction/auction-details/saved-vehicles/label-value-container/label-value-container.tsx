import { LabelValueProps } from "./label-value-container.types";
import classes from "./label-value-container.module.css";
export default function LabelValueContainer({ label, value }: LabelValueProps) {
  return (
    <div className={classes.container}>
      <p>{label}</p>
      <p className={classes.value}>{value}</p>
    </div>
  );
}
