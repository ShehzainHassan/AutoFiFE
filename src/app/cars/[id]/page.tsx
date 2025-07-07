"use client";
import {
  Loading,
  RoundedContainer,
  VehicleImageGallery,
} from "@/app/components";
import ContactFormContainer from "@/app/components/contact-info-form/contact-form-container";
import EmptyState from "@/app/components/empty-state/empty-state";
import Footer from "@/app/components/footer/footer";
import NavbarContainer from "@/app/components/navbar/navbar-container";
import { ContactFormProvider } from "@/contexts/contact-form-context/contact-form-context";
import useVehiclesById from "@/hooks/useVehicleById";
import useVehicleFeatures from "@/hooks/useVehicleFeatures";
import { useParams } from "next/navigation";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./page.module.css";

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

  if (vehicleLoading || featureLoading) return <Loading />;
  if (!vehicle || !vehicleFeatures)
    return <EmptyState message="Vehicle not found" />;

  return (
    <>
      <NavbarContainer backgroundColor="var(--color-gray600)" />
      <div className={classes.container}>
        <div>
          <Suspense fallback={<Loading />}>
            <VehicleImageGallery vehicle={vehicle} />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <VehicleFeatures
              vehicle={vehicle}
              vehicleFeatures={vehicleFeatures}
            />
          </Suspense>
        </div>

        <div>
          <Suspense fallback={<Loading />}>
            <VehicleHighlightInfo vehicle={vehicle} />
          </Suspense>
          <ContactFormProvider>
            <ContactFormContainer />
          </ContactFormProvider>
        </div>
      </div>
      <div className={classes.vehicleRecommendations}>
        <Suspense fallback={<Loading />}>
          <SimilarVehicleRecommendationsContainer />
        </Suspense>
      </div>

      <ToastContainer />
      <RoundedContainer />
      <Footer />
    </>
  );
}
