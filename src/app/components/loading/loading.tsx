import { CircularProgress } from "@mui/material";
import classes from "./loading.module.css";
export default function Loading() {
  return (
    <div className={classes.loadingContainer}>
      <CircularProgress />;
    </div>
  );
}
