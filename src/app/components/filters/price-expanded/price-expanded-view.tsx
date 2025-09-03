"use client";
import { MAX_PRICE, MIN_PRICE } from "@/constants";
import { Box, Slider, Typography } from "@mui/material";
import { PriceExpandedProps } from "./price-exapnded.types";
import classes from "./price-expanded.module.css";

export default function PriceExpandedView({
  localRange,
  getDisplayText,
  handleChange,
  handleChangeCommitted,
  handleClear,
}: PriceExpandedProps) {
  return (
    <div className={classes.priceSlider}>
      <Box>
        <Typography>{getDisplayText()}</Typography>
        <Slider
          value={localRange}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={1000}
          valueLabelDisplay="off"
        />
        <button
          aria-label="Clear"
          onClick={handleClear}
          className={classes.clearBtn}>
          Clear
        </button>
      </Box>
    </div>
  );
}
