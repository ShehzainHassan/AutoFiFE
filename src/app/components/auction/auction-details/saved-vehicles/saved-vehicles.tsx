"use client";
import { useState } from "react";
import SavedVehiclesList from "./saved-vehicles-list/saved-vehicles-list";
import classes from "./saved-vehicles.module.css";

export default function SavedVehicles() {
  const [selected, setSelected] = useState<"Grid" | "List">("Grid");

  return (
    <div className={classes.container}>
      <div className={classes.subContainer}>
        <h1>Saved Vehicles</h1>

        <div className={classes.viewTypeButtons}>
          <p
            onClick={() => setSelected("Grid")}
            className={`${classes.viewType} ${
              selected === "Grid" ? classes.selected : ""
            }`}>
            Grid
          </p>
          <p
            onClick={() => setSelected("List")}
            className={`${classes.viewType} ${
              selected === "List" ? classes.selected : ""
            }`}>
            List
          </p>
        </div>

        <SavedVehiclesList />
      </div>
    </div>
  );
}
