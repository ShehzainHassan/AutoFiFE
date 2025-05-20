import { useSearch } from "@/contexts/carSearchContext";
import useSearchVehicles from "@/hooks/useSearchVehicles";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import EmptyState from "../../empty-state";
import ErrorMessage from "../../error-message";
import LoadingSpinner from "../../loading-spinner";
import classes from "./gearbox-expanded.module.css";
export default function GearboxExpanded() {
  const { searchParams, selectedGearboxes, setSelectedGearboxes } = useSearch();
  const {
    data: vehicleList,
    isLoading,
    error,
    isError,
  } = useSearchVehicles(searchParams);

  if (isLoading) return <LoadingSpinner color="var(--color-black100)" />;
  if (!vehicleList)
    return <EmptyState message="No Gearbox options available" />;
  if (isError) return <ErrorMessage message={error.message} />;

  const handleCheckboxChange = (gearbox: string, checked: boolean) => {
    if (checked) {
      setSelectedGearboxes([...selectedGearboxes, gearbox]);
    } else {
      setSelectedGearboxes(selectedGearboxes.filter((g) => g !== gearbox));
    }
  };
  return (
    <div className={classes.gearboxContainer}>
      <FormGroup>
        {Object.entries(vehicleList.gearboxCounts).map(([gearbox, count]) => (
          <FormControlLabel
            key={gearbox}
            control={
              <Checkbox
                value={gearbox}
                checked={selectedGearboxes.includes(gearbox)}
                onChange={(e) =>
                  handleCheckboxChange(gearbox, e.target.checked)
                }
              />
            }
            label={`${gearbox} (${count.toLocaleString()})`}
          />
        ))}
      </FormGroup>
    </div>
  );
}
