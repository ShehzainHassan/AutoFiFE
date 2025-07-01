"use client";
import ContactFormContainer from "@/app/components/contact-info-form/contact-form-container";
import EmptyState from "@/app/components/empty-state/empty-state";
import Footer from "@/app/components/footer/footer";
import NavbarContainer from "@/app/components/navbar/navbar-container";
import { ContactFormProvider } from "@/contexts/contact-form-context/contact-form-context";
import useVehiclesById from "@/hooks/useVehicleById";
import useVehicleFeatures from "@/hooks/useVehicleFeatures";
import { CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
const SimilarVehicleRecommendationsContainer = lazy(
  () =>
    import(
      "@/app/components/similar-vehicle-recommendations/similar-vehicle-recommendations-container"
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
      <NavbarContainer backgroundColor="var(--color-gray600)" />
      <div className={classes.container}>
        <div>
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

        <div>
          <Suspense fallback={<CircularProgress />}>
            <VehicleHighlightInfo vehicle={vehicle} />
          </Suspense>
          <ContactFormProvider>
            <ContactFormContainer />
          </ContactFormProvider>
        </div>
      </div>
      <div>
        <Suspense fallback={<CircularProgress />}>
          <SimilarVehicleRecommendationsContainer />
        </Suspense>
      </div>

      <ToastContainer />
      <Footer />
    </>
  );
}
