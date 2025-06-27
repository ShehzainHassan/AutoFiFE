import headings from "@/styles/typography.module.css";
import classes from "../vehicle-features.module.css";
import { OptionsProps } from "../vehicle-features.types";

const Options = ({ vehicleFeatures }: OptionsProps) => {
  return (
    <div className={classes.titleContainer}>
      <h1 className={headings.carPageTitle}>Options</h1>
      <div className={`${classes.features} ${classes.space}`}>
        {vehicleFeatures?.features.options.map((option, index) => (
          <p key={index}>{option}</p>
        ))}
      </div>
    </div>
  );
};
export default Options;
