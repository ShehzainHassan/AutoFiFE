"use client";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import useGearboxCount from "@/hooks/useGearboxCount";
import { VehicleFilter } from "@/interfaces/vehicle";
import { convertArrayToString } from "@/utilities/utilities";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import EmptyState from "../../empty-state/empty-state";
import ErrorMessage from "../../error-message/error-message";
import LoadingSpinner from "../../loading-spinner/loading-spinner";
import classes from "./gearbox-expanded.module.css";

const ALL_GEARBOXES = ["Automatic", "CVT", "Manual"];

export default function GearboxExpanded() {
  const {
    make,
    model,
    startPrice,
    endPrice,
    mileage,
    startYear,
    endYear,
    status,
    selectedColors,
    selectedGearboxes,
    stagedGearboxes,
    setStagedGearboxes,
  } = useSearch();

  const filters: VehicleFilter = {
    make,
    model,
    startPrice,
    endPrice,
    mileage,
    startYear,
    endYear,
    gearbox: convertArrayToString(selectedGearboxes),
    selectedColors: convertArrayToString(selectedColors),
    status,
  };

  const { data, isLoading, isError, error } = useGearboxCount(filters);

  if (isLoading) return <LoadingSpinner color="var(--color-black100)" />;
  if (isError) return <ErrorMessage message={error.message} />;
  if (!data) return <EmptyState message="No Gearbox options available" />;

  const handleCheckboxChange = (gearbox: string, checked: boolean) => {
    const updatedGearboxes = checked
      ? [...stagedGearboxes, gearbox]
      : stagedGearboxes.filter((g) => g !== gearbox);

    setStagedGearboxes(updatedGearboxes);
  };

  return (
    <div className={classes.gearboxContainer}>
      <FormGroup>
        {ALL_GEARBOXES.map((gearbox) => {
          const count = data?.[gearbox] || 0;
          const isDisabled = count === 0;

          return (
            <FormControlLabel
              key={gearbox}
              control={
                <Checkbox
                  value={gearbox}
                  checked={stagedGearboxes.includes(gearbox)}
                  onChange={(e) =>
                    handleCheckboxChange(gearbox, e.target.checked)
                  }
                  disabled={isDisabled}
                  sx={{
                    color: isDisabled ? "var(--color-gray500)" : "inherit",
                    "&.Mui-disabled": {
                      color: "var(--color-gray500)",
                    },
                    "& .MuiSvgIcon-root": {
                      fill: isDisabled
                        ? "var(--color-gray500)"
                        : "currentColor",
                    },
                  }}
                />
              }
              label={`${gearbox} (${count.toLocaleString()})`}
            />
          );
        })}
      </FormGroup>
    </div>
  );
}
