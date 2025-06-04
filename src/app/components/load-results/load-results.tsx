"use client";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import useSearchVehicles from "@/hooks/useSearchVehicles";
import classes from "./load-results.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmptyState from "../empty-state/empty-state";
import ErrorMessage from "../error-message/error-message";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import ResultCard from "../result-card/result-card";

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
            id={vehicle.id}
            carImg="/images/Bentley-Arnage4.4.png"
            miles={vehicle.mileage}
            price={vehicle.price}
            carTitle={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
            vin={vehicle.vin}
          />
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}
