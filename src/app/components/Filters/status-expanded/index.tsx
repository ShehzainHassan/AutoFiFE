import { useSearch } from "@/contexts/carSearchContext";
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import classes from "./status-expanded.module.css";

export default function StatusExpanded() {
  const { status, setStatus } = useSearch();
  return (
    <FormControl component="fieldset" className={classes.options}>
      <FormControlLabel
        control={
          <Checkbox
            checked={status === "Any"}
            onChange={() => setStatus("Any")}
          />
        }
        label="Any"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={status === "New"}
            onChange={() => setStatus("New")}
          />
        }
        label="New"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={status === "Used"}
            onChange={() => setStatus("Used")}
          />
        }
        label="Used"
      />
    </FormControl>
  );
}
