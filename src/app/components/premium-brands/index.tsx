"use client";
import { BRAND_IMAGES, PREMIUM_BRANDS } from "@/constants";
import { useSearch } from "@/contexts/carSearchContext";
import useGetAllMakes from "@/hooks/useGetAllMakes";
import { useRouter } from "next/navigation";
import BrandCard from "../brand-card";
import SectionTitle from "../section-title";
import classes from "./premium-brands.module.css";
import { useState, useMemo } from "react";

const PLACEHOLDER_IMG = "/images/brands/placeholder.png";

type BrandData = {
  brand: string;
  imgSrc: string;
};

export default function PremiumBrands() {
  const router = useRouter();
  const {
    searchParams,
    setMake,
    setModel,
    setStartPrice,
    setEndPrice,
    setSearchParams,
  } = useSearch();

  const { data: allMakes } = useGetAllMakes();
  const [showAllBrands, setShowAllBrands] = useState(false);

  const handleBrandClick = (make: string) => {
    setMake(make);
    setModel("Any_Models");
    setStartPrice(null);
    setEndPrice(null);
    setSearchParams({
      ...searchParams,
      make,
      model: null,
    });
    router.push(`/search?make=${make}`);
  };

  const brandsToShow: BrandData[] = useMemo(() => {
    if (!showAllBrands || !allMakes) return PREMIUM_BRANDS;
    const fullBrandList: BrandData[] = allMakes.map((make: string) => ({
      brand: make,
      imgSrc: BRAND_IMAGES[make] || PLACEHOLDER_IMG,
    }));

    return fullBrandList;
  }, [showAllBrands, allMakes]);

  return (
    <div className={classes.container}>
      <SectionTitle
        title="Explore Our Premium Brands"
        buttonText={showAllBrands ? "Hide All Brands" : "View All"}
        onClick={() => setShowAllBrands(!showAllBrands)}
        backgroundColor="var(--color-white300)"
        padding="115px 180px 15px"
      />

      <div className={classes.cardContainer}>
        {brandsToShow.map((brand) => (
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
