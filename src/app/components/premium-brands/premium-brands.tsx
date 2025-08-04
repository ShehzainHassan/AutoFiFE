"use client";
import { BrandCard } from "@/app/components";
import { BRAND_IMAGES, PREMIUM_BRANDS } from "@/constants";
import useGetAllMakes from "@/hooks/useGetAllMakes";
import useHandleBrandClick from "@/hooks/useHandleBrandClick";
import { useMemo, useState } from "react";
import SectionTitle from "../section-title/section-title";
import classes from "./premium-brands.module.css";
import { BrandData } from "./premium-brands.types";

const PLACEHOLDER_IMG = "/images/brands/placeholder.png";

export default function PremiumBrands() {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const { data: allMakes, isLoading, refetch } = useGetAllMakes();

  const handleBrandClick = useHandleBrandClick();

  const brandsToShow: BrandData[] = useMemo(() => {
    if (!showAllBrands || !allMakes) return PREMIUM_BRANDS;

    const premiumBrandNames = PREMIUM_BRANDS.map((b) => b.brand.toLowerCase());

    const nonPremiumSorted = allMakes
      .filter((make: string) => !premiumBrandNames.includes(make.toLowerCase()))
      .sort((a: string, b: string) => a.localeCompare(b))
      .map((make: string) => ({
        brand: make,
        imgSrc: BRAND_IMAGES[make] || PLACEHOLDER_IMG,
      }));

    return [...PREMIUM_BRANDS, ...nonPremiumSorted];
  }, [showAllBrands, allMakes]);

  const handleViewAll = () => {
    if (!showAllBrands && !allMakes) {
      refetch();
    }
    setShowAllBrands(!showAllBrands);
  };

  return (
    <div className={classes.container}>
      <div className={classes.subContainer}>
        <SectionTitle
          title="Explore Our Premium Brands"
          buttonText={showAllBrands ? "Hide All Brands" : "View All"}
          onClick={handleViewAll}
          backgroundColor="var(--color-white300)"
        />

        <div className={classes.cardContainer}>
          {isLoading && showAllBrands ? (
            <p data-testid="fetching">Fetching all brands...</p>
          ) : (
            brandsToShow.map((brand) => (
              <BrandCard
                key={brand.brand}
                brand={brand.brand}
                imgSrc={brand.imgSrc}
                onClick={() => handleBrandClick(brand.brand)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
