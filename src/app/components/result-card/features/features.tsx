import classes from "./features.module.css";
import headings from "@/styles/typography.module.css";
import { FeaturesProps } from "./features.types";

const Features = ({ features }: FeaturesProps) => {
  const featureList = features
    .split(".")
    .map((f) => f.trim())
    .filter(Boolean);

  return (
    <div
      className={`${classes.features} ${headings.smallText}`}
      aria-label="Vehicle features">
      <ul className={classes.featureList}>
        {featureList.map((feature, index) => (
          <li key={index} className={classes.featureItem}>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Features;
