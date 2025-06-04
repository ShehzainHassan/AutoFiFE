import { VehicleListResult } from "@/interfaces/vehicle";

export type VehicleCarouselProps = {
  vehicleListResult: VehicleListResult;
  onReachEnd: () => void;
};
