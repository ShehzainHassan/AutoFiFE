import classes from "../compare-features.module.css";
import {
  FeatureCategory,
  FeatureSectionProps,
} from "../compare-features.types";

export default function FeatureSection<K extends FeatureCategory>({
  title,
  expanded,
  toggle,
  rows,
  features1,
  features2,
}: FeatureSectionProps<K>) {
  return (
    <div className={classes.section}>
      <div className={classes.sectionHeader} onClick={toggle}>
        <h2>{title}</h2>
        <span className={classes.toggle}>{expanded ? "−" : "+"}</span>
      </div>
      {expanded &&
        rows.map(({ label, key, subKey }) => (
          <div className={classes.row} key={label}>
            <div className={classes.label}>{label}</div>
            <div>
              {features1.features[key][subKey] != null
                ? typeof features1.features[key][subKey] === "object"
                  ? JSON.stringify(features1.features[key][subKey])
                  : String(features1.features[key][subKey])
                : "-"}
            </div>
            <div>
              {features2.features[key][subKey] != null
                ? typeof features2.features[key][subKey] === "object"
                  ? JSON.stringify(features2.features[key][subKey])
                  : String(features2.features[key][subKey])
                : "-"}
            </div>
          </div>
        ))}
    </div>
  );
}
