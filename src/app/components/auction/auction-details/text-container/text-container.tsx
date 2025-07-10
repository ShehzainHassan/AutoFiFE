import classes from "./text-container.module.css";
import headings from "@/styles/typography.module.css";
import { TextContainerProps } from "./text-container.types";
export default function TextContainer({
  value,
  className,
}: TextContainerProps) {
  return (
    <div
      className={`${classes.container} ${headings.vehicleTitle} ${className}`}>
      {value}
    </div>
  );
}
