"use client";

import { useMemo, useCallback } from "react";
import { Loading, VehicleInfoCard } from "@/app/components";
import useSimilarVehicles from "@/hooks/useSimilarVehicles";
import headings from "@/styles/typography.module.css";
import { useParams, useRouter } from "next/navigation";
import ErrorMessage from "../error-message/error-message";
import classes from "./similar-vehicle-recommendations.module.css";
import VehicleInfoDetails from "./vehicle-info-details";

const INVALID_ID = -1;

export default function SimilarVehicleRecommendationsContainer() {
  const params = useParams();
  const vehicleId = useMemo(() => {
    const id = params.id;
    return id && !isNaN(Number(id)) ? Number(id) : INVALID_ID;
  }, [params.id]);

  const router = useRouter();
  const {
    data: similarVehicles,
    isError,
    error,
    isLoading,
  } = useSimilarVehicles(vehicleId, true);

  const redirectToCarPage = useCallback(
    (vid: number) => {
      router.push(`/cars/${vid}`);
    },
    [router]
  );

  if (isLoading) {
    return (
      <div role="status" aria-live="polite">
        <Loading />
      </div>
    );
  }

  if (isError) return <ErrorMessage message={error.message} />;
  if (!similarVehicles || similarVehicles.similar_vehicles.length === 0)
    return null;

  return (
    <section aria-labelledby="recommendations-title">
      <h1 id="recommendations-title" className={headings.carPageTitle}>
        Recommendations
      </h1>
      <div className={classes.cardContainer}>
        {similarVehicles.similar_vehicles.map((vehicle) => (
          <div
            key={vehicle.vehicle_id}
            role="button"
            tabIndex={0}
            aria-label={`View details for recommended vehicle ${vehicle.vehicle_id}`}
            onClick={() => redirectToCarPage(vehicle.vehicle_id)}
            onKeyDown={(e) => {
              if (e.key === "Enter") redirectToCarPage(vehicle.vehicle_id);
            }}
            className={classes.recommendationCard}>
            <VehicleInfoCard similarity_score={vehicle.similarity_score}>
              <VehicleInfoDetails vehicle={vehicle} />
            </VehicleInfoCard>
          </div>
        ))}
      </div>
    </section>
  );
}
