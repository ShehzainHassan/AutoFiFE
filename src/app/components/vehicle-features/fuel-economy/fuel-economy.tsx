import headings from "@/styles/typography.module.css";
import classes from "../vehicle-features.module.css";
import { FuelEconomyProps } from "../vehicle-features.types";
const FuelEconomy = ({ vehicleFeatures }: FuelEconomyProps) => {
  const fuelEconomyData = [
    {
      label: "Fuel Tank Size",
      value: vehicleFeatures?.features.fuelEconomy.fuelTankSize + " L",
    },
    {
      label: "Combined MPG",
      value: vehicleFeatures?.features.fuelEconomy.combinedMPG + " MPG",
    },
    {
      label: "City MPG",
      value: vehicleFeatures?.features.fuelEconomy.cityMPG + " MPG",
    },
    {
      label: "Highway MPG",
      value: vehicleFeatures?.features.fuelEconomy.highwayMPG + " MPG",
    },
    {
      label: "CO2 Emissions",
      value: vehicleFeatures?.features.fuelEconomy.cO2Emissions + " g/km",
    },
  ];

  return (
    <div className={classes.titleContainer}>
      <h1 className={headings.carPageTitle}>Fuel economy</h1>
      <div className={`${classes.features} ${classes.space}`}>
        {fuelEconomyData.map((item, index) => (
          <p key={index}>
            <span className={classes.bold}>{item.label}:</span> {item.value}
          </p>
        ))}
      </div>
    </div>
  );
};
export default FuelEconomy;
