import { MAX_MILEAGE, MIN_MILEAGE } from "@/constants";
import { useSearch } from "@/contexts/carSearchContext";
import { Box, Slider, Typography } from "@mui/material";
import classes from "../price-expanded/price-expanded.module.css";
import { useState } from "react";

export default function MileageSlider() {
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
          step={1000}
          valueLabelDisplay="off"
        />
        <button onClick={handleClear} className={classes.clearBtn}>
          Clear
        </button>
      </Box>
    </div>
  );
}
