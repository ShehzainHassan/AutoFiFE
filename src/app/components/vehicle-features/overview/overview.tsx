import headings from "@/styles/typography.module.css";
import classes from "../vehicle-features.module.css";

import { OverviewProps } from "../vehicle-features.types";
const Overview = ({ vehicle }: OverviewProps) => {
  const overviewData = [
    { label: "Make", value: vehicle.make },
    { label: "Mileage", value: `${vehicle.mileage.toLocaleString()} mi` },
    { label: "Model", value: vehicle.model },
    { label: "Condition", value: vehicle.status.toLowerCase() },
    { label: "Year", value: vehicle.year },
    { label: "Vin", value: vehicle.vin },
    { label: "Exterior color", value: vehicle.color },
  ];

  return (
    <div className={classes.titleContainer}>
      <h1 className={headings.carPageTitle}>Overview</h1>
      <div className={`${classes.features} ${classes.space}`}>
        {overviewData.map((item, index) => (
          <p key={index}>
            <span className={classes.bold}>{item.label}</span> {item.value}
          </p>
        ))}
      </div>
    </div>
  );
};
export default Overview;
