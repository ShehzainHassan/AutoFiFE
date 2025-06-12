"use client";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import classes from "./status-expanded.module.css";

export default function StatusExpanded() {
  const { stagedStatus, setStagedStatus } = useSearch();
  return (
    <FormControl component="fieldset" className={classes.options}>
      <FormControlLabel
        control={
          <Checkbox
            checked={stagedStatus === "Any"}
            onChange={() => setStagedStatus("Any")}
          />
        }
        label="Any"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={stagedStatus === "New"}
            onChange={() => setStagedStatus("New")}
          />
        }
        label="New"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={stagedStatus === "Used"}
            onChange={() => setStagedStatus("Used")}
          />
        }
        label="Used"
      />
    </FormControl>
  );
}
