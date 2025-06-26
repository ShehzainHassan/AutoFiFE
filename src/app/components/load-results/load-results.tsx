"use client";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import useSearchVehicles from "@/hooks/useSearchVehicles";
import { CircularProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmptyState from "../empty-state/empty-state";
import ErrorMessage from "../error-message/error-message";
import ResultCard from "../result-card/result-card";
import classes from "./load-results.module.css";

export default function LoadResults() {
  const { searchParams } = useSearch();
  const {
    data: vehicleList,
    isLoading,
    error,
    isError,
  } = useSearchVehicles(searchParams);

  if (isLoading)
    return (
      <div role="status">
        <CircularProgress />{" "}
      </div>
    );
  if (!vehicleList) return <EmptyState message="No vehicles found" />;
  if (isError) return <ErrorMessage message={error.message} />;
  return (
    <div className={classes.resultCards}>
      {Array.isArray(vehicleList) &&
        vehicleList.map((vehicle) => (
          <div key={vehicle.id}>
            <ResultCard
              vehicle={vehicle}
              carImg="/images/Bentley-Arnage4.4.png"
            />
          </div>
        ))}
      <ToastContainer />
    </div>
  );
}
