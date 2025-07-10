"use client";
import useAllVehicles from "@/hooks/useAllVehicles";
import "swiper/css";
import { AllVehicleSwiperProps } from "./all-vehicle-swiper.types";
import {
  Loading,
  EmptyState,
  ErrorMessage,
  VerticalCarousel,
} from "@/app/components";
export default function AllVehiclesSwiper({
  vehicleStatus,
}: AllVehicleSwiperProps) {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useAllVehicles(vehicleStatus);

  if (isLoading) {
    return (
      <div role="status">
        <Loading />;
      </div>
    );
  }
  if (isError) return <ErrorMessage message={error.message} />;
  if (!data) return <EmptyState message="No vehicles found" />;
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
