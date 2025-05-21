"use client";
import useVehiclesByMake from "@/hooks/useVehiclesByMake";
import "swiper/css";
import EmptyState from "../empty-state";
import ErrorMessage from "../error-message";
import LoadingSpinner from "../loading-spinner";
import HorizontalCarousel from "../vehicle-carousel/horizontal-carousel";

interface CarSwiperProps {
  make: string;
}

export default function PopularMakesSwiper({ make }: CarSwiperProps) {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useVehiclesByMake(make);

  if (isLoading) return <LoadingSpinner />;
  if (!data)
    return (
      <EmptyState message="No vehicles found" color="var(--color-white100)" />
    );
  if (isError) return <ErrorMessage message={error.message} />;

  const allVehicles = data.pages.flatMap((page) => page.vehicles) || [];

  return (
    <HorizontalCarousel
      vehicleListResult={{
        vehicles: allVehicles,
        totalCount: data.pages[0]?.totalCount || 0,
        gearboxCounts: data.pages[0]?.gearboxCounts || [],
        colorCounts: data.pages[0]?.colorCounts || [],
      }}
      onReachEnd={() => {
        if (hasNextPage) fetchNextPage();
      }}
    />
  );
}
