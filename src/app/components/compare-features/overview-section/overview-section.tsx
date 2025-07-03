import classes from "../compare-features.module.css";
import { OverviewSectionProps } from "../compare-features.types";

export default function OverviewSection({
  expanded,
  toggle,
  features1,
  features2,
  vehicle1,
  vehicle2,
}: OverviewSectionProps) {
  return (
    <div className={classes.section}>
      <div className={classes.sectionHeader} onClick={toggle}>
        <h2>Overview</h2>
        <span className={classes.toggle}>{expanded ? "−" : "+"}</span>
      </div>
      {expanded && (
        <>
          <div className={classes.row}>
            <div className={classes.label}>Make</div>
            <div>{features1.make}</div>
            <div>{features2.make}</div>
          </div>
          <div className={classes.row}>
            <div className={classes.label}>Model</div>
            <div>{features1.model}</div>
            <div>{features2.model}</div>
          </div>
          <div className={classes.row}>
            <div className={classes.label}>Year</div>
            <div>{vehicle1.year}</div>
            <div>{vehicle2.year}</div>
          </div>
        </>
      )}
    </div>
  );
}
