"use client";
import useAllVehicles from "@/hooks/useAllVehicles";
import "swiper/css";
import EmptyState from "../empty-state";
import ErrorMessage from "../error-message";
import LoadingSpinner from "../loading-spinner";
import VerticalCarousel from "../vehicle-carousel/vertical-carousel";
interface AllVehicleSwiperProps {
  vehicleStatus: string | null;
}
export default function AllVehiclesSwiper({
  vehicleStatus,
}: AllVehicleSwiperProps) {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useAllVehicles(vehicleStatus);

  if (isLoading) return <LoadingSpinner color="var(--color-black100)" />;
  if (!data) return <EmptyState message="No vehicles found" />;
  if (isError) return <ErrorMessage message={error.message} />;
  const allVehicles = data.pages.flatMap((page) => page.vehicles) || [];

  return (
    <VerticalCarousel
      vehicleListResult={{
        vehicles: allVehicles,
        totalCount: data.pages[0].totalCount || 0,
        gearboxCounts: data.pages[0].gearboxCounts || [],
        colorCounts: data.pages[0].colorCounts || [],
      }}
      onReachEnd={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
    />
  );
}
