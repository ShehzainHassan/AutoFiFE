import classes from "../compare-features.module.css";
import { OptionProps } from "../compare-features.types";

export default function OptionsSection({
  expanded,
  toggle,
  features1,
  features2,
}: OptionProps) {
  const allOptions = Array.from(
    new Set([...features1.features.options, ...features2.features.options])
  ).sort();

  return (
    <div className={classes.section}>
      <div className={classes.sectionHeader} onClick={toggle}>
        <h2>Options</h2>
        <span className={classes.toggle}>{expanded ? "−" : "+"}</span>
      </div>
      {expanded &&
        allOptions.map((option) => (
          <div className={classes.row} key={option}>
            <div className={classes.label}>{option}</div>
            <div>
              <span
                className={
                  features1.features.options.includes(option)
                    ? classes.tick
                    : classes.cross
                }>
                {features1.features.options.includes(option) ? "✓" : "✗"}
              </span>
            </div>
            <div>
              <span
                className={
                  features2.features.options.includes(option)
                    ? classes.tick
                    : classes.cross
                }>
                {features2.features.options.includes(option) ? "✓" : "✗"}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}
