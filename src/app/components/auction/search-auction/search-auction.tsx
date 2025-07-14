import VehicleImage from "@/assets/images/cars/Bentley-Arnage4.4.png";
import { CURRENCY } from "@/constants";
import Image from "next/image";
import SearchField from "../auction-search-field/auction-search-field";
import classes from "./search-auction.module.css";
export default function SearchAuction() {
  return (
    <div className={classes.container}>
      <h2>Auctions</h2>
      <SearchField width="100%" />
      <div className={classes.vehicleCard}>
        <Image
          src={VehicleImage}
          alt="vehicle-image"
          width={464}
          height={256}
          loading="lazy"
          placeholder="blur"
        />
        <div className={classes.vehicleInfo}>
          <h2>2021 Sedan XLE</h2>
          <p>Time left: 2d 12h 30m</p>
          <p>Current bid: {CURRENCY}12,500</p>
        </div>
      </div>
    </div>
  );
}
