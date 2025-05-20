import { useSearch } from "@/contexts/carSearchContext";
import useSearchVehicles from "@/hooks/useSearchVehicles";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import EmptyState from "../../empty-state";
import ErrorMessage from "../../error-message";
import LoadingSpinner from "../../loading-spinner";
import classes from "../gearbox-expanded/gearbox-expanded.module.css";
export default function ColorsExpanded() {
  const { searchParams, selectedColors, setSelectedColors } = useSearch();
  const {
    data: vehicleList,
    isLoading,
    error,
    isError,
  } = useSearchVehicles(searchParams);

  if (isLoading) return <LoadingSpinner color="var(--color-black100)" />;
  if (!vehicleList) return <EmptyState message="No color options available" />;
  if (isError) return <ErrorMessage message={error.message} />;

  const handleCheckboxChange = (gearbox: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, gearbox]);
    } else {
      setSelectedColors(selectedColors.filter((g) => g !== gearbox));
    }
  };
  console.log(selectedColors);
  return (
    <div className={classes.gearboxContainer}>
      <FormGroup>
        {Object.entries(vehicleList.colorCounts).map(([colors, count]) => (
          <FormControlLabel
            key={colors}
            control={
              <Checkbox
                value={colors}
                checked={selectedColors.includes(colors)}
                onChange={(e) => handleCheckboxChange(colors, e.target.checked)}
              />
            }
            label={`${colors} (${count.toLocaleString()})`}
          />
        ))}
      </FormGroup>
    </div>
  );
}
