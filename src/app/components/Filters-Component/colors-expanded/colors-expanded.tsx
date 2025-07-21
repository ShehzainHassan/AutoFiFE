"use client";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import classes from "../gearbox-expanded/gearbox-expanded.module.css";
import colorClasses from "./colors-expanded.module.css";

export default function ColorsExpanded() {
  const { stagedSearch, setStagedSearch, counts, allColors } = useSearch();

  const handleCheckboxChange = (color: string, checked: boolean) => {
    setStagedSearch((prev) => {
      const updatedColors = checked
        ? [...prev.stagedColors, color]
        : prev.stagedColors.filter((c) => c !== color);

      return {
        ...prev,
        stagedColors: updatedColors,
      };
    });
  };

  return (
    <div className={`${classes.gearboxContainer}`}>
      <FormGroup>
        {allColors.map((color: string) => {
          const count = counts?.colorsCount?.[color] || 0;
          const isDisabled = count === 0;

          return (
            <FormControlLabel
              key={color}
              control={
                <Checkbox
                  value={color}
                  checked={stagedSearch.stagedColors.includes(color)}
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
