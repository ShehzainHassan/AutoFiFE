import vehicleAPI from "@/api/vehicleAPI";
import { SearchParams } from "@/interfaces/search-params";
import { useQuery } from "@tanstack/react-query";

const useSearchVehicles = (params: SearchParams) => {
  return useQuery({
    queryKey: ["searchVehicles", params],
    queryFn: () =>
      vehicleAPI.searchVehicles(
        params.pageSize,
        params.offset,
        params.make,
        params.model,
        params.startPrice,
        params.endPrice,
        params.status,
        params.mileage,
        params.startYear,
        params.endYear,
        params.sortOrder,
        params.gearbox,
        params.selectedColor
      ),
    enabled: !!params.pageSize,
  });
};

export default useSearchVehicles;
