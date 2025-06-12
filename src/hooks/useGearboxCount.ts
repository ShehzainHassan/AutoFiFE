import vehicleAPI from "@/api/vehicleAPI";
import { VehicleFilter } from "@/interfaces/vehicle";
import { useQuery } from "@tanstack/react-query";

const useGearboxCount = (filters: VehicleFilter) => {
  return useQuery({
    queryKey: ["gearboxCount", filters],
    queryFn: () => vehicleAPI.getGearboxCount(filters),
  });
};

export default useGearboxCount;
