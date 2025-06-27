import headings from "@/styles/typography.module.css";
import classes from "../vehicle-features.module.css";
import { PerformanceProps } from "../vehicle-features.types";
const Performance = ({ vehicleFeatures }: PerformanceProps) => {
  const performance = [
    {
      label: "Zero To 60 MPH",
      value: vehicleFeatures?.features.performance.zeroTo60MPH + " seconds",
    },
    {
      label: "Horsepower",
      value: vehicleFeatures?.features.engine.horsepower + " hp",
    },
    {
      label: "Cam Type",
      value: vehicleFeatures?.features.engine.camType,
    },
    {
      label: "Engine Size",
      value: vehicleFeatures?.features.engine.size,
    },
    {
      label: "Torque FT LBS",
      value: vehicleFeatures?.features.engine.torqueFtLBS,
    },
    {
      label: "Torque RPM",
      value: vehicleFeatures?.features.engine.torqueRPM,
    },
    {
      label: "Valves",
      value: vehicleFeatures?.features.engine.valves,
    },
  ];

  return (
    <div className={classes.titleContainer}>
      <h1 className={headings.carPageTitle}>Performance</h1>
      <div className={`${classes.features} ${classes.space}`}>
        {performance.map((item, index) => (
          <p key={index}>
            <span className={classes.bold}>{item.label}:</span> {item.value}
          </p>
        ))}
      </div>
    </div>
  );
};
export default Performance;
