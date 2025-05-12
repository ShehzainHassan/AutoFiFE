"use client";
import { useRouter } from "next/navigation";
import BrandCard from "../Brand Card/brand-card";
import SectionTitle from "../Section Title/section-title";
import classes from "./premium-brands.module.css";
import { useVehicle } from "@/contexts/vehicleContext";
import { useVehicleResult } from "@/contexts/vehicleResultsContext";
export default function PremiumBrands() {
  const router = useRouter();
  const { setMakeGlobal, setModel, priceRange } = useVehicle();
  const { fetchVehiclesByMake } = useVehicleResult();
  function handleBrandClick(make: string) {
    const selectedModel = "Any Models";
    setMakeGlobal(make);
    setModel(selectedModel);
    fetchVehiclesByMake(make, 0);
    router.push(
      `/search?make=${make}&model=${selectedModel}&price=${priceRange}`
    );
  }

  return (
    <div className={classes.container}>
      <SectionTitle
        title="Explore Our Premium Brands"
        buttonText="Show All Brands"
        backgroundColor="var(--color-white300)"
        padding="115px 180px 15px"
      />

      <div className={classes.cardContainer}>
        <BrandCard
          imgSrc="/images/audi.png"
          brand="Audi"
          onClick={() => handleBrandClick("Audi")}
        />
        <BrandCard
          imgSrc="/images/bmw.png"
          brand="BMW"
          onClick={() => handleBrandClick("BMW")}
        />
        <BrandCard
          imgSrc="/images/ford.png"
          brand="Ford"
          onClick={() => handleBrandClick("Ford")}
        />
        <BrandCard
          imgSrc="/images/mercedes-benz.png"
          brand="Mercedes Benz"
          onClick={() => handleBrandClick("Mercedes-Benz")}
        />
        <BrandCard
          imgSrc="/images/nissan.png"
          brand="Nissan"
          onClick={() => handleBrandClick("Nissan")}
        />
        <BrandCard
          imgSrc="/images/volkswagen.png"
          brand="Volkswagen"
          onClick={() => handleBrandClick("Volkswagen")}
        />
      </div>
    </div>
  );
}
