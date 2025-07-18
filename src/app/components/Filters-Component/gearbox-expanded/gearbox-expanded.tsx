"use client";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import classes from "./gearbox-expanded.module.css";

const ALL_GEARBOXES = ["Automatic", "CVT", "Manual"];

export default function GearboxExpanded() {
  const { stagedSearch, setStagedSearch, counts } = useSearch();

  const handleCheckboxChange = (gearbox: string, checked: boolean) => {
    setStagedSearch((prev) => {
      const updatedGearboxes = checked
        ? [...prev.stagedGearboxes, gearbox]
        : prev.stagedGearboxes.filter((g) => g !== gearbox);

      return {
        ...prev,
        stagedGearboxes: updatedGearboxes,
      };
    });
  };

  return (
    <div className={classes.gearboxContainer}>
      <FormGroup>
        {ALL_GEARBOXES.map((gearbox) => {
          const count = counts?.gearboxesCount?.[gearbox] || 0;
          const isDisabled = count === 0;
          return (
            <FormControlLabel
              key={gearbox}
              control={
                <Checkbox
                  value={gearbox}
                  checked={stagedSearch.stagedGearboxes.includes(gearbox)}
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
