import vehicleAPI from "@/api/vehicleAPI";
import { VehicleFilter } from "@/interfaces/vehicle";
import { useQuery } from "@tanstack/react-query";

const useVehicleColorCount = (filters: VehicleFilter) => {
  return useQuery({
    queryKey: ["colorsCount", filters],
    queryFn: () => vehicleAPI.getColorsCount(filters),
  });
};

export default useVehicleColorCount;
