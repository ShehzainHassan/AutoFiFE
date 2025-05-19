import { useSearch } from "@/contexts/carSearchContext";
import useSearchVehicles from "@/hooks/useSearchVehicles";
import LoadingSpinner from "../loading-spinner";
import EmptyState from "../empty-state";
import ErrorMessage from "../error-message";
import ResultCard from "../result-card";
import classes from "./load-results.module.css";

export default function LoadResults() {
  const { searchParams } = useSearch();
  const {
    data: vehicleList,
    isLoading,
    error,
    isError,
  } = useSearchVehicles(searchParams);

  if (isLoading) return <LoadingSpinner color="var(--color-black100)" />;
  if (!vehicleList || vehicleList.totalCount === 0)
    return <EmptyState message="No vehicles found" />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className={classes.resultCards}>
      {vehicleList?.vehicles.map((vehicle) => (
        <div key={vehicle.id}>
          <ResultCard
            carImg="/images/Bentley-Arnage4.4.png"
            miles={vehicle.mileage}
            price={vehicle.price}
            carTitle={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
          />
        </div>
      ))}
    </div>
  );
}
