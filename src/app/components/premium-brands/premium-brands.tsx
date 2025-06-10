"use client";
import { BRAND_IMAGES, PREMIUM_BRANDS } from "@/constants";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import useGetAllMakes from "@/hooks/useGetAllMakes";
import { useRouter } from "next/navigation";
import classes from "./premium-brands.module.css";
import { useState, useMemo } from "react";
import { BrandData } from "./premium-brands.types";
import BrandCard from "../brand-card/brand-card";
import SectionTitle from "../section-title/section-title";

const PLACEHOLDER_IMG = "/images/brands/placeholder.png";

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

  const [showAllBrands, setShowAllBrands] = useState(false);
  const { data: allMakes, isLoading, refetch } = useGetAllMakes();

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
      <SectionTitle
        title="Explore Our Premium Brands"
        buttonText={showAllBrands ? "Hide All Brands" : "View All"}
        onClick={handleViewAll}
        backgroundColor="var(--color-white300)"
      />

      <div className={classes.cardContainer}>
        {isLoading && showAllBrands ? (
          <p>Fetching all brands...</p>
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
  );
}
