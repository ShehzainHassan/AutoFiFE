"use client";
import { useVehicle } from "@/contexts/vehicleContext";
import { useVehicleResult } from "@/contexts/vehicleResultsContext";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { PREMIUM_BRANDS } from "../../../../constants";
import BrandCard from "../brand-card";
import SectionTitle from "../section-title";
import classes from "./premium-brands.module.css";
export default function PremiumBrands() {
  const router = useRouter();
  const { setMakeGlobal, setModel, loading, priceRange } = useVehicle();
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
        {PREMIUM_BRANDS.map((brand) => (
          <BrandCard
            key={brand.brand}
            brand={brand.brand}
            imgSrc={brand.imgSrc}
            onClick={() => handleBrandClick(brand.brand)}
          />
        ))}
        {loading && (
          <div className={`loadingSpinnerWrapper`}>
            <ClipLoader size={50} color="var(--color-black100)" />
          </div>
        )}
      </div>
    </div>
  );
}
