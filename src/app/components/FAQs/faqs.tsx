import { CURRENCY } from "@/constants";
import { useSearch } from "@/contexts/car-search-context";
import useSearchVehicles from "@/hooks/useSearchVehicles";
import {
  getAveragePrice,
  getFAQTitle,
  getRange,
  getUniqueFuelTypes,
  getVehicleText,
} from "@/utilities/utilities";
import { CircularProgress } from "@mui/material";
import EmptyState from "../empty-state/empty-state";
import ErrorMessage from "../error-message/error-message";
import classes from "./faqs.module.css";
import { FAQProps } from "./faqs.types";

export default function FAQs({ searchParams }: FAQProps) {
  const { mainSearch } = useSearch();

  const { data, isLoading, error } = useSearchVehicles(searchParams);
  if (isLoading)
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />;
      </div>
    );

  if (error) return <ErrorMessage message={error.message} />;
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <EmptyState message="No FAQs found" />;
  }

  const fuelTypes = getUniqueFuelTypes(Array.isArray(data) ? data : [data]);
  const { min, max } = getRange(Array.isArray(data) ? data : [data]);
  return (
    <div className={classes.faqs}>
      <h2 className={`${classes.bold}`}>
        {getFAQTitle(mainSearch.make, mainSearch.model)} FAQs
      </h2>
      <p className={`${classes.bold}`}>
        How much does the {getVehicleText(mainSearch.make, mainSearch.model)}{" "}
        cost?
      </p>
      <p>
        The average {getVehicleText(mainSearch.make, mainSearch.model)} costs
        about {getAveragePrice(Array.isArray(data) ? data : [data])}. The
        average price has decreased by -7.6% since last year. The 16 for sale on
        CarGurus range from {`${CURRENCY}${min.toLocaleString()}`} to{" "}
        {`${CURRENCY}${max.toLocaleString()}`} in price.
      </p>
      <p className={`${classes.bold}`}>
        How many {getVehicleText(mainSearch.make, mainSearch.model)} vehicles
        have no reported accidents or damage?
      </p>
      <p>16 out of 16 for sale have no reported accidents or damage</p>
      <p className={`${classes.bold}`}>What fuel types are available?</p>
      <div className={classes.fuelTypes}>
        {Array.isArray(data) && data.length === 1 ? (
          <p>{fuelTypes.join(", ")} is available</p>
        ) : (
          <p>{fuelTypes.join(", ")} are available</p>
        )}
      </div>
    </div>
  );
}
