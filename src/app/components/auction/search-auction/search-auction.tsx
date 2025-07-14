"use client";
import ImageSrc from "@/assets/images/cars/Bentley-Arnage4.4.png";
import BidIcon from "@/assets/images/icons/bid.png";
import { CURRENCY } from "@/constants";
import { mockVehicleData } from "@/constants/auction";
import { useMemo, useState } from "react";
import ButtonPrimary from "../../buttons/button-primary";
import CarImage from "../../result-card/car-image/car-image";
import SearchField from "../auction-search-field/auction-search-field";
import classes from "./search-auction.module.css";
import { ThemeProvider } from "@/theme/themeContext";
import { BLACK_THEME } from "@/constants/button-primary-themes";

export default function SearchAuction() {
  const [search, setSearch] = useState("");

  const results = useMemo(() => {
    if (search.trim() === "") return mockVehicleData.slice(0, 3);
    const q = search.toLowerCase();
    return mockVehicleData.filter((v) =>
      v.vehicleName.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className={classes.container}>
      <h2>Auctions</h2>

      <SearchField width="100%" search={search} setSearch={setSearch} />

      {results.length ? (
        results.map(({ vehicleName, currentBid, timeLeft }) => (
          <div key={vehicleName + timeLeft} className={classes.vehicleCard}>
            <div className={classes.imageWrapper}>
              <CarImage src={ImageSrc} />
            </div>
            <div className={classes.vehicleInfo}>
              <h2>{vehicleName}</h2>
              <p>Time left: {timeLeft}</p>
              <p>
                Current bid: {CURRENCY}
                {currentBid.toLocaleString()}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No vehicles found</p>
      )}
      <ThemeProvider value={BLACK_THEME}>
        <ButtonPrimary
          className={classes.bidBtn}
          btnText="Bid"
          imgSrc={BidIcon}
        />
      </ThemeProvider>
    </div>
  );
}
