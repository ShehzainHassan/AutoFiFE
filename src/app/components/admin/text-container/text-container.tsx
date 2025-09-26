import { TextContainerProps } from "./text-container.types";
import classes from "./text-container.module.css";

export default function TextContainer({
  label,
  value,
  change,
  status,
}: TextContainerProps) {
  const isPositive = typeof change === "number" && change > 0;
  const isNegative = typeof change === "number" && change < 0;

  const isRawNumberChange = label === "Active Sessions";

  const formattedChange =
    typeof change === "number"
      ? isRawNumberChange
        ? `${isPositive ? "+" : isNegative ? "-" : ""}${Math.abs(change)}`
        : `${isPositive ? "+" : isNegative ? "-" : ""}${Math.abs(
            change
          ).toFixed(2)}%`
      : null;

  return (
    <div className={classes.container}>
      <p>{label}</p>
      <h1>{value.toLocaleString()}</h1>
      {formattedChange && (
        <p
          className={
            isPositive
              ? classes.positiveChange
              : isNegative
              ? classes.negativeChange
              : classes.neutralChange
          }>
          {formattedChange}
        </p>
      )}
      {status && <p className={classes.statusMessage}>{status}</p>}
    </div>
  );
}
