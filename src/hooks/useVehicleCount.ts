import vehicleAPI from "@/api/vehicleAPI";
import { VehicleFilter } from "@/interfaces/vehicle";
import { useQuery } from "@tanstack/react-query";

const useVehicleCount = (filters: VehicleFilter) => {
  return useQuery({
    queryKey: ["totalCount", filters],
    queryFn: () => vehicleAPI.getVehicleCount(filters),
  });
};

export default useVehicleCount;
