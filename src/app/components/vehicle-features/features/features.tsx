import headings from "@/styles/typography.module.css";
import classes from "../vehicle-features.module.css";
import { FeaturesProps } from "../vehicle-features.types";
import { VehicleFeatureContainer } from "@/app/components";
const Features = ({ vehicle, vehicleFeatures }: FeaturesProps) => {
  const featureList = [
    {
      title: "Mileage",
      value: vehicle.mileage.toLocaleString(),
    },
    {
      title: "Drivetrain",
      value: vehicleFeatures.features.drivetrain.type,
    },
    {
      title: "Exterior color",
      value: vehicle.color,
    },
    {
      title: "MPG",
      value: vehicleFeatures.features.fuelEconomy.combinedMPG + " MPG",
    },
    {
      title: "Engine",
      value: vehicleFeatures.features.engine.type,
    },
    {
      title: "Fuel type",
      value: vehicle.fuelType,
    },
    {
      title: "Gearbox",
      value: vehicle.transmission,
    },
  ];

  return (
    <div className={classes.titleContainer}>
      <h1 className={headings.carPageTitle}>Features</h1>
      <div className={classes.features}>
        {featureList.map((feature, index) => (
          <VehicleFeatureContainer
            key={index}
            title={feature.title}
            value={feature.value}
          />
        ))}
      </div>
    </div>
  );
};
export default Features;
