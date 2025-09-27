import { TextContainerProps } from "./text-container.types";
import classes from "./text-container.module.css";
import Image from "next/image";

import IncreaseIcon from "@/assets/images/icons/increase.svg";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

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
      <h1>{typeof value === "number" ? value.toLocaleString() : value}</h1>

      {formattedChange && (
        <div
          className={`${classes.changeWrapper} ${
            isPositive
              ? classes.positiveChange
              : isNegative
              ? classes.negativeChange
              : classes.neutralChange
          }`}>
          {isPositive && (
            <Image
              src={IncreaseIcon}
              alt="increase"
              width={16}
              height={16}
              className={classes.icon}
            />
          )}
          {isNegative && (
            <TrendingDownIcon
              className={`${classes.icon} ${classes.negativeIcon}`}
            />
          )}
          <span>{formattedChange}</span>
        </div>
      )}

      {status && <p className={classes.statusMessage}>{status}</p>}
    </div>
  );
}
