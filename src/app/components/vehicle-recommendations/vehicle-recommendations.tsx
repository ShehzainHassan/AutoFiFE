import { CURRENCY } from "@/constants";
import useGetRecommendations from "@/hooks/useGetRecommendations";
import headings from "@/styles/typography.module.css";
import { getUserIdFromLocalStorage } from "@/utilities/utilities";
import { CircularProgress } from "@mui/material";
import ErrorMessage from "../error-message/error-message";
import CarImage from "../result-card/car-image/car-image";
import classes from "./vehicle-recommendations.module.css";

export default function VehicleRecommendations() {
  const authData = localStorage.getItem("authData") ?? "";
  const userId = getUserIdFromLocalStorage() ?? -1;

  const {
    data: recommendedVehicles,
    isError,
    error,
    isLoading,
  } = useGetRecommendations(userId, !!authData);

  if (!authData) return null;

  if (isLoading)
    return (
      <div role="status">
        <CircularProgress />
      </div>
    );
  if (isError) return <ErrorMessage message={error.message} />;
  if (!recommendedVehicles || recommendedVehicles.recommendations.length === 0)
    return null;

  return (
    <>
      <h1 className={headings.carPageTitle}>Recommendations</h1>
      <div className={classes.cardContainer}>
        {recommendedVehicles.recommendations.map((vehicle) => {
          const price = Number(vehicle.features.Price) || 0;
          const mileage = Number(vehicle.features.Mileage) || 0;

          return (
            <div
              key={vehicle.vehicle_id}
              className={classes.recommendationCard}>
              <CarImage src="/images/glc_2023.png" width={306} height={172}>
                <div className={classes.favorite}>
                  {vehicle.score.toFixed(2)}
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
