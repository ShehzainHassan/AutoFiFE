"use client";
import { useState } from "react";
import { Input } from "../../input-field";
import Image from "next/image";
import VehicleImage from "@/assets/images/cars/Bentley-Arnage4.4.png";
import { CURRENCY } from "@/constants";
import classes from "./search-auction.module.css";
export default function SearchAuction() {
  const [search, setSearch] = useState("");
  return (
    <div className={classes.container}>
      <h2>Auctions</h2>
      <Input width="100%">
        <Input.Field
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Input>
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
