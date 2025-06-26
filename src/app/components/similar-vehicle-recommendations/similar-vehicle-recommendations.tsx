import { CURRENCY } from "@/constants";
import useSimilarVehicles from "@/hooks/useSimilarVehicles";
import headings from "@/styles/typography.module.css";
import { CircularProgress } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import ErrorMessage from "../error-message/error-message";
import CarImage from "../result-card/car-image/car-image";
import classes from "./similar-vehicle-recommendations.module.css";

export default function SimilarVehicleRecommendations() {
  const params = useParams();
  const idParam = params.id;
  const vehicleId = idParam ? Number(idParam) : -1;

  const authData = localStorage.getItem("authData") ?? "";
  const router = useRouter();
  const {
    data: similarVehicles,
    isError,
    error,
    isLoading,
  } = useSimilarVehicles(vehicleId, !!authData);

  if (!authData) return null;

  if (isLoading)
    return (
      <div role="status">
        <CircularProgress />
      </div>
    );
  if (isError) return <ErrorMessage message={error.message} />;
  if (!similarVehicles || similarVehicles.similar_vehicles.length === 0)
    return null;
  const redirectToCarPage = (vid: number) => {
    router.push(`/cars/${vid}`);
  };
  return (
    <>
      <h1 className={headings.carPageTitle}>Recommendations</h1>
      <div className={classes.cardContainer}>
        {similarVehicles.similar_vehicles.map((vehicle) => {
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
