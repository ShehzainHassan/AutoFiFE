import CarFinance from "./car-finance/car-finance";
import Features from "./features/features";
import FuelEconomy from "./fuel-economy/fuel-economy";
import Measurements from "./measurements/measurements";
import Options from "./options/options";
import Overview from "./overview/overview";
import Performance from "./performance/performance";
import { VehicleFeaturesProps } from "./vehicle-features.types";

export default function VehicleFeatures({
  vehicle,
  vehicleFeatures,
}: VehicleFeaturesProps) {
  return (
    <>
      <Features vehicle={vehicle} vehicleFeatures={vehicleFeatures} />
      <CarFinance vehicle={vehicle} />
      <Overview vehicle={vehicle} />
      <FuelEconomy vehicleFeatures={vehicleFeatures} />
      <Performance vehicleFeatures={vehicleFeatures} />
      <Measurements vehicleFeatures={vehicleFeatures} />
      <Options vehicleFeatures={vehicleFeatures} />
    </>
  );
}
