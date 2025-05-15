"use client";
import { PREMIUM_BRANDS } from "@/constants";
import { useRouter } from "next/navigation";
import BrandCard from "../brand-card";
import SectionTitle from "../section-title";
import classes from "./premium-brands.module.css";
import { useSearch } from "@/contexts/carSearchContext";
export default function PremiumBrands() {
  const router = useRouter();
  const { setMake, setModel } = useSearch();
  function handleBrandClick(make: string) {
    setMake(make);
    setModel("Any_Models");
    router.push(`/search?make=${make}`);
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
      </div>
    </div>
  );
}
