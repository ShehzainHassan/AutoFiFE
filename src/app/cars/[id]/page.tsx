"use client";
import React, { lazy, Suspense } from "react";
import { CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useVehiclesById from "@/hooks/useVehicleById";
import useVehicleFeatures from "@/hooks/useVehicleFeatures";
import EmptyState from "@/app/components/empty-state/empty-state";
import Navbar from "@/app/components/navbar/navbar";
import Wrapper from "@/app/components/wrapper/wrapper";
import Form from "@/app/components/contact-info-form/contact-info-form";
import Footer from "@/app/components/footer/footer";
import classes from "./page.module.css";

const CarImageGallery = lazy(
  () => import("@/app/components/car-image-gallery/car-image-gallery")
);
const VehicleFeatures = lazy(
  () => import("@/app/components/vehicle-features/vehicle-features")
);
const VehicleHighlightInfo = lazy(
  () => import("@/app/components/vehicle-highlight-info/vehicle-highlight-info")
);
const SimilarVehicleRecommendations = lazy(
  () =>
    import(
      "@/app/components/similar-vehicle-recommendations/similar-vehicle-recommendations"
    )
);

export default function CarDetails() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const { data: vehicle, isLoading: vehicleLoading } = useVehiclesById(
    id as number
  );
  const make = vehicle?.make ?? "";
  const model = vehicle?.model ?? "";
  const { data: vehicleFeatures, isLoading: featureLoading } =
    useVehicleFeatures(make, model, !!make && !!model);

  if (vehicleLoading || featureLoading) return <CircularProgress />;
  if (!vehicle || !vehicleFeatures)
    return <EmptyState message="Vehicle not found" />;

  return (
    <>
      <Navbar backgroundColor="var(--color-gray600)" />
      <Wrapper padding="24px 240px">
        <div className={classes.container}>
          <div className={classes.vehicleFeatures}>
            <Suspense fallback={<CircularProgress />}>
              <CarImageGallery vehicle={vehicle} />
            </Suspense>
            <Suspense fallback={<CircularProgress />}>
              <VehicleFeatures
                vehicle={vehicle}
                vehicleFeatures={vehicleFeatures}
              />
            </Suspense>
          </div>

          <div className={classes.vehicleFeatures}>
            <Suspense fallback={<CircularProgress />}>
              <VehicleHighlightInfo vehicle={vehicle} />
            </Suspense>
            <Form />
          </div>

          <div className={classes.vehicleFeatures}>
            <Suspense fallback={<CircularProgress />}>
              <SimilarVehicleRecommendations />
            </Suspense>
          </div>
        </div>
      </Wrapper>
      <ToastContainer />
      <Footer />
    </>
  );
}
