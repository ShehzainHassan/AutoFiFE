import { CURRENCY } from "@/constants";
import VehicleFeature from "../vehicle-feature/vehicle-feature";
import classes from "./vehicle-details.module.css";
import { VehicleDetailsProps } from "./vehicle-details.types";
const VehicleDetails = ({ vehicle }: VehicleDetailsProps) => {
  return (
    <div className={classes.vehicleDetails}>
      <div className={classes.vehicleHeader}>
        <p>
          {vehicle.year} {vehicle.make.toUpperCase()}{" "}
          {vehicle.model.toUpperCase()}
        </p>
        <p>
          {CURRENCY}
          {vehicle.price.toLocaleString()}
        </p>
      </div>
      <div className={classes.vehicleFeatures}>
        <VehicleFeature feature={vehicle.mileage.toLocaleString() + " miles"} />
        <VehicleFeature feature={vehicle.transmission} />
        <VehicleFeature feature={vehicle.fuelType} />
        <VehicleFeature feature={vehicle.color} />
      </div>
    </div>
  );
};
export default VehicleDetails;
