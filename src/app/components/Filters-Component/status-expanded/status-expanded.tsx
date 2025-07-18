"use client";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import classes from "./status-expanded.module.css";

export default function StatusExpanded() {
  const { stagedSearch, setStagedSearch } = useSearch();
  const selectedStatus = stagedSearch.stagedStatus;

  const handleChange = (status: string) => {
    setStagedSearch((prev) => ({
      ...prev,
      stagedStatus: status,
    }));
  };

  return (
    <FormControl component="fieldset" className={classes.options}>
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedStatus === "Any"}
            onChange={() => handleChange("Any")}
          />
        }
        label="Any"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedStatus === "New"}
            onChange={() => handleChange("New")}
          />
        }
        label="New"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedStatus === "Used"}
            onChange={() => handleChange("Used")}
          />
        }
        label="Used"
      />
    </FormControl>
  );
}
