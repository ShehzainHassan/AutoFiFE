"use client";
import useAllVehicles from "@/hooks/useAllVehicles";
import CircularProgress from "@mui/material/CircularProgress";
import "swiper/css";
import EmptyState from "../empty-state/empty-state";
import ErrorMessage from "../error-message/error-message";
import VerticalCarousel from "../vehicle-carousel/vertical-carousel/vertical-carousel";
import { AllVehicleSwiperProps } from "./all-vehicle-swiper.types";
import classes from "./all-vehicle-swiper.module.css";
export default function AllVehiclesSwiper({
  vehicleStatus,
}: AllVehicleSwiperProps) {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useAllVehicles(vehicleStatus);

  if (isLoading) {
    return (
      <div role="status" className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }
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
