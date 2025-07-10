import { CURRENCY } from "@/constants";
import classes from "../similar-vehicle-recommendations.module.css";
import { VehicleInfoDetailsProps } from "./vehicle-info-details.types";
const VehicleInfoDetails = ({ vehicle }: VehicleInfoDetailsProps) => {
  const price = Number(vehicle.features.Price) || 0;
  const mileage = Number(vehicle.features.Mileage) || 0;

  return (
    <div>
      <p className={classes.vehicleInfoText}>
        {vehicle.features.Year} {vehicle.features.Make} {vehicle.features.Model}
      </p>
      <p className={classes.vehicleInfoText}>
        {CURRENCY}
        {price.toLocaleString()}
      </p>
      <p>Mileage {mileage.toLocaleString()}</p>
    </div>
  );
};

export default VehicleInfoDetails;
