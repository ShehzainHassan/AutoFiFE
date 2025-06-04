"use client";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import { MAX_PRICE, MIN_PRICE } from "@/constants";
import { Box, Slider, Typography } from "@mui/material";
import { useState } from "react";
import classes from "./price-expanded.module.css";

export default function PriceExpanded() {
  const { startPrice, endPrice, setPrice, setStartPrice, setEndPrice } =
    useSearch();
  const [localRange, setLocalRange] = useState<[number, number]>([
    startPrice ?? MIN_PRICE,
    endPrice ?? MAX_PRICE,
  ]);

  const getDisplayText = () => {
    const [min, max] = localRange;
    if (min === 0 && max === 0) return "$0";
    if (min === MIN_PRICE && max === MAX_PRICE) return "All Prices";
    if (min === MIN_PRICE) return `Less than $${max.toLocaleString()}`;
    if (max === MAX_PRICE) return `Greater than $${min.toLocaleString()}`;
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  const handleChange = (
    _: React.SyntheticEvent | Event,
    value: number | number[]
  ) => {
    if (Array.isArray(value)) {
      setLocalRange(value as [number, number]);
    }
  };

  const handleChangeCommitted = (
    _: React.SyntheticEvent | Event,
    value: number | number[]
  ) => {
    if (Array.isArray(value)) {
      const [min, max] = value;
      setStartPrice(min === MIN_PRICE ? null : min);
      setEndPrice(max === MAX_PRICE ? null : max);

      let priceText = "All_Prices";
      if (min === 0 && max === 0) priceText = "0";
      else if (min === MIN_PRICE && max !== MAX_PRICE) priceText = `<${max}`;
      else if (min !== MIN_PRICE && max === MAX_PRICE) priceText = `>${min}`;
      else if (min !== MIN_PRICE && max !== MAX_PRICE)
        priceText = `${min}-${max}`;
      setPrice(priceText);
    }
  };

  const handleClear = () => {
    setLocalRange([MIN_PRICE, MAX_PRICE]);
    setStartPrice(null);
    setEndPrice(null);
    setPrice("All_Prices");
  };

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
        <button onClick={handleClear} className={classes.clearBtn}>
          Clear
        </button>
      </Box>
    </div>
  );
}
