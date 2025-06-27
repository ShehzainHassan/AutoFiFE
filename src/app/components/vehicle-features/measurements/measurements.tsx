import headings from "@/styles/typography.module.css";
import classes from "../vehicle-features.module.css";
import { MeasurementProps } from "../vehicle-features.types";
const Measurements = ({ vehicleFeatures }: MeasurementProps) => {
  const measurementsData = [
    {
      label: "Doors",
      value: vehicleFeatures?.features.measurements.doors + " doors",
    },
    {
      label: "Maximum Seating",
      value: vehicleFeatures?.features.measurements.maximumSeating,
    },
    {
      label: "Height",
      value: vehicleFeatures?.features.measurements.heightInches + " in",
    },
    {
      label: "Width",
      value: vehicleFeatures?.features.measurements.widthInches + " in",
    },
    {
      label: "Length",
      value: vehicleFeatures?.features.measurements.lengthInches + " in",
    },
    {
      label: "Wheelbase",
      value: vehicleFeatures?.features.measurements.wheelbaseInches + " in",
    },
    {
      label: "Ground Clearance",
      value: vehicleFeatures?.features.measurements.groundClearance + " in",
    },
    {
      label: "Cargo Capacity",
      value: vehicleFeatures?.features.measurements.cargoCapacityCuFt + " cuft",
    },
    {
      label: "Curb Weight",
      value: vehicleFeatures?.features.measurements.curbWeightLBS + " lbs",
    },
  ];

  return (
    <div className={classes.titleContainer}>
      <h1 className={headings.carPageTitle}>Measurements</h1>
      <div className={`${classes.features} ${classes.space}`}>
        {measurementsData.map((item, index) => (
          <p key={index}>
            <span className={classes.bold}>{item.label}:</span> {item.value}
          </p>
        ))}
      </div>
    </div>
  );
};
export default Measurements;
