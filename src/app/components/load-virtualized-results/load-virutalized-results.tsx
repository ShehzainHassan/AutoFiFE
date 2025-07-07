"use client";
import { Loading } from "@/app/components";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import useSearchVehicles from "@/hooks/useSearchVehicles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import EmptyState from "../empty-state/empty-state";
import ErrorMessage from "../error-message/error-message";
import ResultCard from "../result-card/result-card";
import classes from "./load-virtualized-results.module.css";

export default function VirtualizedList() {
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
        <Loading />
      </div>
    );

  if (isError) return <ErrorMessage message={error.message} />;
  if (!vehicleList) return <EmptyState message="No vehicles found" />;

  const Row = ({ index, style }: ListChildComponentProps) => {
    const vehicle = vehicleList[index];
    return (
      <div style={style} className={classes.card}>
        <ResultCard vehicle={vehicle} carImg="/images/Bentley-Arnage4.4.png" />
      </div>
    );
  };

  return (
    <div className={classes.resultCards}>
      <List
        height={800}
        itemCount={vehicleList.length}
        itemSize={600}
        width="100%">
        {Row}
      </List>
      <ToastContainer />
    </div>
  );
}
