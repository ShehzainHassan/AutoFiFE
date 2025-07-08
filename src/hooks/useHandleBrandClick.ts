"use client";
import { useRouter } from "next/navigation";
import { useSearch } from "@/contexts/car-search-context/car-search-context";

export default function useHandleBrandClick() {
  const router = useRouter();
  const {
    mainSearch,
    stagedSearch,
    searchParams,
    setMainSearch,
    setStagedSearch,
    setSearchParams,
  } = useSearch();

  const handleBrandClick = (make: string) => {
    setMainSearch({
      ...mainSearch,
      make,
      model: "Any_Models",
      startPrice: null,
      endPrice: null,
    });

    setStagedSearch({
      ...stagedSearch,
      stagedMake: make,
      stagedModel: "Any_Models",
      stagedStartPrice: null,
      stagedEndPrice: null,
    });

    setSearchParams({
      ...searchParams,
      make,
      model: null,
    });

    router.push(`/search?make=${make}`);
  };

  return handleBrandClick;
}
