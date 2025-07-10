import { VehicleInfoCard } from "@/app/components";
import useSimilarVehicles from "@/hooks/useSimilarVehicles";
import headings from "@/styles/typography.module.css";
import classes from "./similar-vehicle-recommendations.module.css";
import { SimilarVehicleRecommendationsProps } from "./similar-vehicle-recommendations.types";
import VehicleInfoDetails from "./vehicle-info-details";
export default function SimilarVehicleRecommendations({
  vehicleId,
  redirectToCarPage,
}: SimilarVehicleRecommendationsProps) {
  const { data: similarVehicles } = useSimilarVehicles(vehicleId, true);

  return (
    <>
      <h1 className={headings.carPageTitle}>Recommendations</h1>
      <div className={classes.cardContainer}>
        {similarVehicles?.similar_vehicles.map((vehicle) => {
          return (
            <div
              key={vehicle.vehicle_id}
              onClick={() => redirectToCarPage(vehicle.vehicle_id)}
              className={classes.recommendationCard}>
              <VehicleInfoCard similarity_score={vehicle.similarity_score}>
                <VehicleInfoDetails vehicle={vehicle} />
              </VehicleInfoCard>
            </div>
          );
        })}
      </div>
    </>
  );
}
