import { useSearch } from "@/contexts/carSearchContext";
import useSearchVehicles from "@/hooks/useSearchVehicles";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import EmptyState from "../../empty-state";
import ErrorMessage from "../../error-message";
import LoadingSpinner from "../../loading-spinner";
import classes from "../gearbox-expanded/gearbox-expanded.module.css";
import colorClasses from "./colors-expanded.module.css";
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
  return (
    <div className={`${classes.gearboxContainer}`}>
      <FormGroup>
        {Object.entries(vehicleList.colorCounts).map(([color, count]) => {
          const isDisabled = count === 0;

          return (
            <FormControlLabel
              key={color}
              control={
                <Checkbox
                  value={color}
                  checked={selectedColors.includes(color)}
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
                    {isDisabled
                      ? color
                      : `${color} (${count.toLocaleString()})`}
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
