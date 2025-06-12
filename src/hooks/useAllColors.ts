import vehicleAPI from "@/api/vehicleAPI";
import { useQuery } from "@tanstack/react-query";

const useAllColors = () => {
  return useQuery({
    queryKey: ["allColors"],
    queryFn: () => vehicleAPI.getAllColors(),
  });
};

export default useAllColors;
