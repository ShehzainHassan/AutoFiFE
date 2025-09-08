"use client";

import { BrandCard } from "@/app/components";
import { BRAND_IMAGES, PREMIUM_BRANDS } from "@/constants";
import useGetAllMakes from "@/hooks/useGetAllMakes";
import useHandleBrandClick from "@/hooks/useHandleBrandClick";
import { useMemo, useState, useCallback } from "react";
import SectionTitle from "../section-title/section-title";
import classes from "./premium-brands.module.css";
import { BrandData } from "./premium-brands.types";

const PLACEHOLDER_IMG = "/images/brands/placeholder.png";
const VIEW_ALL_LABEL = "View All";
const HIDE_ALL_LABEL = "Hide All Brands";

export default function PremiumBrands() {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const { data: allMakes, isLoading, refetch } = useGetAllMakes();
  const handleBrandClick = useHandleBrandClick();

  const premiumBrandNames = useMemo(
    () => PREMIUM_BRANDS.map((b) => b.brand.toLowerCase()),
    []
  );

  const brandsToShow: BrandData[] = useMemo(() => {
    if (!showAllBrands || !allMakes) return PREMIUM_BRANDS;

    const nonPremiumSorted = allMakes
      .filter((make: string) => !premiumBrandNames.includes(make.toLowerCase()))
      .sort((a: string, b: string) => a.localeCompare(b))
      .map((make: string) => ({
        brand: make,
        imgSrc: BRAND_IMAGES[make] || PLACEHOLDER_IMG,
      }));

    return [...PREMIUM_BRANDS, ...nonPremiumSorted];
  }, [showAllBrands, allMakes, premiumBrandNames]);

  const handleViewAll = useCallback(() => {
    if (!showAllBrands && !allMakes) {
      refetch();
    }
    setShowAllBrands((prev) => !prev);
  }, [showAllBrands, allMakes, refetch]);

  return (
    <section
      className={classes.container}
      aria-labelledby="premium-brands-title">
      <div className={classes.subContainer}>
        <SectionTitle
          title="Explore Our Premium Brands"
          titleId="premium-brands-title"
          buttonText={showAllBrands ? HIDE_ALL_LABEL : VIEW_ALL_LABEL}
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
    </section>
  );
}
