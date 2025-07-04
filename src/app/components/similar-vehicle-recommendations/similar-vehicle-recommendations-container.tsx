import useSimilarVehicles from "@/hooks/useSimilarVehicles";
import { CircularProgress } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import ErrorMessage from "../error-message/error-message";
import SimilarVehicleRecommendations from "./similar-vehicle-recommendations";

export default function SimilarVehicleRecommendationsContainer() {
  const params = useParams();
  const idParam = params.id;
  const vehicleId = idParam ? Number(idParam) : -1;

  const router = useRouter();
  const {
    data: similarVehicles,
    isError,
    error,
    isLoading,
  } = useSimilarVehicles(vehicleId, true);

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
    <SimilarVehicleRecommendations
      redirectToCarPage={redirectToCarPage}
      vehicleId={vehicleId}
    />
  );
}
