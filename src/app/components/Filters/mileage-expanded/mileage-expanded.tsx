"use client";
import { MAX_MILEAGE, MILEAGE_SLIDER_STEP, MIN_MILEAGE } from "@/constants";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import { Box, Slider, Typography } from "@mui/material";
import { useState } from "react";
import classes from "../price-expanded/price-expanded.module.css";

export default function MileageExpanded() {
  const { mileage, setMileage } = useSearch();
  const [localMileage, setLocalMileage] = useState(
    mileage === null ? MAX_MILEAGE : mileage
  );

  const getDisplayText = () => {
    if (localMileage <= MIN_MILEAGE) return `${MIN_MILEAGE} miles`;
    if (localMileage >= MAX_MILEAGE) return "Any";
    return `${localMileage.toLocaleString()} miles or fewer`;
  };

  const handleChange = (
    _: React.SyntheticEvent | Event,
    value: number | number[]
  ) => {
    setLocalMileage(value as number);
  };

  const handleChangeCommitted = (
    _: React.SyntheticEvent | Event,
    value: number | number[]
  ) => {
    const newMileage = value as number;
    setMileage(newMileage >= MAX_MILEAGE ? null : newMileage);
  };

  const handleClear = () => {
    setLocalMileage(MAX_MILEAGE);
    setMileage(null);
  };

  return (
    <div className={classes.priceSlider}>
      <Box>
        <Typography>{getDisplayText()}</Typography>
        <Slider
          value={localMileage}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          min={MIN_MILEAGE}
          max={MAX_MILEAGE}
          step={MILEAGE_SLIDER_STEP}
          valueLabelDisplay="off"
        />
        <button onClick={handleClear} className={classes.clearBtn}>
          Clear
        </button>
      </Box>
    </div>
  );
}
