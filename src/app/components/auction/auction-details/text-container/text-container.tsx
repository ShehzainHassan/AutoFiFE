import classes from "./text-container.module.css";
import headings from "@/styles/typography.module.css";
import { TextContainerProps } from "./text-container.types";
export default function TextContainer({
  value,
  className,
  onClick,
}: TextContainerProps) {
  return (
    <div
      onClick={onClick}
      className={`${classes.container} ${headings.vehicleTitle} ${className}`}>
      {value}
    </div>
  );
}
