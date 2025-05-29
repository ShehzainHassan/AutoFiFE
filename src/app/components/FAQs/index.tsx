import { useSearch } from "@/contexts/carSearchContext";
import classes from "./faqs.module.css";
import useSearchVehicles from "@/hooks/useSearchVehicles";
import EmptyState from "../empty-state";
import LoadingSpinner from "../loading-spinner";
import ErrorMessage from "../error-message";
import { getUniqueFuelTypes } from "@/utilities/utilities";
export default function FAQs() {
  const { make, model, searchParams } = useSearch();
  const { data, isLoading, error } = useSearchVehicles(searchParams);
  if (isLoading) return <LoadingSpinner color="var(--color-black100)" />;
  if (!data || data.totalCount === 0)
    return <EmptyState message="No FAQs found" />;
  if (error) return <ErrorMessage message={error.message} />;
  const fuelTypes = getUniqueFuelTypes(data.vehicles);
  return (
    <div className={classes.faqs}>
      <h2 className={`${classes.bold}`}>
        {make} {model} FAQs
      </h2>
      <p className={`${classes.bold}`}>
        How much does the {make} {model} cost?
      </p>
      <p>
        The average {make} {model} costs about $29,299.08. The average price has
        decreased by -7.6% since last year. The 16 for sale on CarGurus range
        from $11,995 to $69,950 in price.
      </p>
      <p className={`${classes.bold}`}>
        How many {make} {model} vehicles have no reported accidents or damage?
      </p>
      <p>16 out of 16 for sale have no reported accidents or damage</p>
      <p className={`${classes.bold}`}>What fuel types are available?</p>
      <div className={classes.fuelTypes}>
        <p>{fuelTypes.join(", ")} are available</p>
      </div>
    </div>
  );
}
