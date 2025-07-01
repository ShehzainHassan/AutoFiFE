import { CURRENCY } from "@/constants";
import headings from "@/styles/typography.module.css";
import CarImage from "../result-card/car-image/car-image";
import classes from "./similar-vehicle-recommendations.module.css";
import useSimilarVehicles from "@/hooks/useSimilarVehicles";
import { SimilarVehicleRecommendationsProps } from "./similar-vehicle-recommendations.types";

export default function SimilarVehicleRecommendations({
  vehicleId,
  authData,
  redirectToCarPage,
}: SimilarVehicleRecommendationsProps) {
  const { data: similarVehicles } = useSimilarVehicles(vehicleId, !!authData);

  return (
    <>
      <h1 className={headings.carPageTitle}>Recommendations</h1>
      <div className={classes.cardContainer}>
        {similarVehicles?.similar_vehicles.map((vehicle) => {
          const price = Number(vehicle.features.Price) || 0;
          const mileage = Number(vehicle.features.Mileage) || 0;

          return (
            <div
              key={vehicle.vehicle_id}
              onClick={() => redirectToCarPage(vehicle.vehicle_id)}
              className={classes.recommendationCard}>
              <CarImage src="/images/glc_2023.png" width={306} height={172}>
                <div className={classes.favorite}>
                  {vehicle.similarity_score.toFixed(3)}
                </div>
              </CarImage>
              <div>
                <p className={classes.vehicleInfoText}>
                  {vehicle.features.Year} {vehicle.features.Make}{" "}
                  {vehicle.features.Model}
                </p>
                <p className={classes.vehicleInfoText}>
                  {CURRENCY}
                  {price.toLocaleString()}
                </p>
                <p>Mileage {mileage.toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
