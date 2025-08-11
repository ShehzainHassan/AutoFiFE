import Image from "next/image";
import { ReportTypeProps } from "./report-type.types";
import classes from "./report-type.module.css";
export default function ReportType({
  imageSrc,
  title,
  description,
  selected,
  onClick,
}: ReportTypeProps) {
  return (
    <div
      className={`${classes.reportTypeContainer} ${
        selected ? classes.selected : ""
      }`}
      onClick={onClick}>
      <Image src={imageSrc} alt="report-type" width={96} height={96} />
      <div className={classes.reportTypeText}>
        <h2>{title}</h2>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  );
}
