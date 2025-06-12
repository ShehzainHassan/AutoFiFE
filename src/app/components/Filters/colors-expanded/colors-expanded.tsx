"use client";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import useVehicleColorCount from "@/hooks/useVehicleColorCount";
import { VehicleFilter } from "@/interfaces/vehicle";
import { convertArrayToString } from "@/utilities/utilities";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import EmptyState from "../../empty-state/empty-state";
import ErrorMessage from "../../error-message/error-message";
import LoadingSpinner from "../../loading-spinner/loading-spinner";
import classes from "../gearbox-expanded/gearbox-expanded.module.css";
import colorClasses from "./colors-expanded.module.css";
import useAllColors from "@/hooks/useAllColors";

export default function ColorsExpanded() {
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
    stagedColors,
    setStagedColors,
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

  const { data, isLoading, isError, error } = useVehicleColorCount(filters);
  const { data: allColors } = useAllColors();

  if (isLoading) return <LoadingSpinner color="var(--color-black100)" />;
  if (!allColors) return <EmptyState message="No color options available" />;
  if (isError) return <ErrorMessage message={error.message} />;

  const handleCheckboxChange = (color: string, checked: boolean) => {
    if (checked) {
      setStagedColors([...stagedColors, color]);
    } else {
      setStagedColors(stagedColors.filter((c) => c !== color));
    }
  };

  return (
    <div className={`${classes.gearboxContainer}`}>
      <FormGroup>
        {allColors.map((color: string) => {
          const count = data?.[color] || 0;
          const isDisabled = count === 0;

          return (
            <FormControlLabel
              key={color}
              control={
                <Checkbox
                  value={color}
                  checked={stagedColors.includes(color)}
                  onChange={(e) =>
                    handleCheckboxChange(color, e.target.checked)
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
              label={
                <div className={colorClasses.colorContainer}>
                  <div
                    className={colorClasses.circleColor}
                    style={{ backgroundColor: color }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDisabled ? "var(--color-gray500)" : "inherit",
                    }}>
                    {`${color} (${count.toLocaleString()})`}
                  </Typography>
                </div>
              }
            />
          );
        })}
      </FormGroup>
    </div>
  );
}
