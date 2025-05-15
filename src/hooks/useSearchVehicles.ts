import vehicleAPI from "@/api/vehicleAPI";
import { useQuery } from "@tanstack/react-query";

interface SearchParams {
  pageSize: number;
  offset: number;
  make?: string | null;
  model?: string | null;
  startPrice?: number | null;
  endPrice?: number | null;
}
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
        params.endPrice
      ),
    enabled: !!params.pageSize,
  });
};

export default useSearchVehicles;
