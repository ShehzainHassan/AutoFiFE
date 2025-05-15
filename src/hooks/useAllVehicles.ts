import vehicleAPI from "@/api/vehicleAPI";
import { PAGE_SIZE } from "@/constants";
import { Vehicle } from "@/interfaces/vehicle";
import { useInfiniteQuery } from "@tanstack/react-query";

const useAllVehicles = () => {
  return useInfiniteQuery({
    queryKey: ["vehicles"],
    queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
      vehicleAPI.getAllVehicles(pageParam, PAGE_SIZE),
    getNextPageParam: (
      lastPage: { vehicles: Vehicle[]; totalCount: number },
      allPages: { vehicles: Vehicle[] }[]
    ) => {
      const totalLoaded = allPages.reduce(
        (acc, page) => acc + page.vehicles.length,
        0
      );
      return totalLoaded < lastPage.totalCount ? totalLoaded : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });
};

export default useAllVehicles;
