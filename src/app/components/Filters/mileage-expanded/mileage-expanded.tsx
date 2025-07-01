"use client";
import { MAX_MILEAGE, MILEAGE_SLIDER_STEP, MIN_MILEAGE } from "@/constants";
import { Box, Slider, Typography } from "@mui/material";
import classes from "../price-expanded/price-expanded.module.css";
import { MileageExpandedProps } from "./mileage-expanded.types";

export default function MileageExpanded({
  localMileage,
  getDisplayText,
  handleChange,
  handleChangeCommitted,
  handleClear,
}: MileageExpandedProps) {
  return (
    <div className={classes.priceSlider}>
      <Box>
        <Typography data-testid="display-text">{getDisplayText()}</Typography>
        <Slider
          data-testid="mileage-slider"
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
