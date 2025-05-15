import { useEffect, useState } from "react";
import classes from "./price-expanded.module.css";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useSearch } from "@/contexts/carSearchContext";
import { MAX_PRICE, MIN_PRICE } from "@/constants";

export default function PriceExpanded() {
  const { startPrice, endPrice, setPrice, setStartPrice, setEndPrice } =
    useSearch();

  const [range, setRange] = useState<[number, number]>([
    startPrice ?? MIN_PRICE,
    endPrice ?? MAX_PRICE,
  ]);
  const [displayText, setDisplayText] = useState("All Prices");
  useEffect(() => {
    setRange([startPrice ?? MIN_PRICE, endPrice ?? MAX_PRICE]);

    let priceText = "All_Prices";
    if (startPrice === null && endPrice === 0) {
      setDisplayText("$0");
      priceText = "0-0";
    } else if (startPrice === null && endPrice !== null) {
      setDisplayText(`Less than $${endPrice.toLocaleString()}`);
      priceText = `<${endPrice}`;
    } else if (startPrice !== null && endPrice === null) {
      setDisplayText(`Greater than $${startPrice.toLocaleString()}`);
      priceText = `>${startPrice}`;
    } else if (startPrice !== null && endPrice !== null) {
      setDisplayText(
        `$${startPrice.toLocaleString()} - $${endPrice.toLocaleString()}`
      );
      priceText = `${startPrice}-${endPrice}`;
    }

    setPrice(priceText);
  }, [displayText, startPrice, endPrice, setPrice]);

  const handleInput = (value: [number, number]) => {
    setRange(value);
    setStartPrice(value[0] === MIN_PRICE ? null : value[0]);
    setEndPrice(value[1] === MAX_PRICE ? null : value[1]);
  };

  const handleClear = () => {
    setRange([MIN_PRICE, MAX_PRICE]);
    setStartPrice(null);
    setEndPrice(null);
    setDisplayText("All Prices");
  };

  return (
    <div className={classes.priceSlider}>
      <p>{displayText}</p>
      <RangeSlider
        min={MIN_PRICE}
        max={MAX_PRICE}
        step={1000}
        value={range}
        onInput={handleInput}
      />
      <button onClick={handleClear} className={classes.clearBtn}>
        Clear
      </button>
    </div>
  );
}
