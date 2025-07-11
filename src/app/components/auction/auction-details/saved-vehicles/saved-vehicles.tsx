"use client";
import CarImage from "@/app/components/result-card/car-image/car-image";
import { useState } from "react";
import WatchLists from "../watchlists/watchlists";
import LabelValueContainer from "./label-value-container/label-value-container";
import classes from "./saved-vehicles.module.css";
export default function SavedVehicles() {
  const [selected, setSelected] = useState("Grid");
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
        <div className={classes.vehicles}>
          <div className={classes.vehicleContainer}>
            <div className={classes.imgWrapper}>
              <CarImage src="/images/glc_2023.png" />
            </div>
            <LabelValueContainer label="2023 Sedan X" value="25,000" />
          </div>
          <div className={classes.vehicleContainer}>
            <div className={classes.imgWrapper}>
              <CarImage src="/images/glc_2023.png" />
            </div>
            <LabelValueContainer label="2023 Sedan X" value="25,000" />
          </div>
          <div className={classes.vehicleContainer}>
            <div className={classes.imgWrapper}>
              <CarImage src="/images/glc_2023.png" />
            </div>
            <LabelValueContainer label="2023 Sedan X" value="25,000" />
          </div>
          <div className={classes.vehicleContainer}>
            <div className={classes.imgWrapper}>
              <CarImage src="/images/glc_2023.png" />
            </div>
            <LabelValueContainer label="2023 Sedan X" value="25,000" />
          </div>
          <div className={classes.vehicleContainer}>
            <div className={classes.imgWrapper}>
              <CarImage src="/images/glc_2023.png" />
            </div>
            <LabelValueContainer label="2023 Sedan X" value="25,000" />
          </div>
          <div className={classes.vehicleContainer}>
            <div className={classes.imgWrapper}>
              <CarImage src="/images/glc_2023.png" />
            </div>
            <LabelValueContainer label="2023 Sedan X" value="25,000" />
          </div>
        </div>

        <WatchLists />
      </div>
    </div>
  );
}
