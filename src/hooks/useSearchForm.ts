"use client";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import useGetAllMakes from "@/hooks/useGetAllMakes";
import {
  formatMakeOptions,
  getModelOptions,
  getPriceRange,
  parseStatus,
} from "@/utilities/utilities";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_MAKE, PRICE_OPTIONS } from "@/constants";
import { SearchFormProps } from "@/app/components/search-form";

export function useSearchForm({ statusTab }: SearchFormProps) {
  const {
    mainSearch,
    stagedSearch,
    setStagedSearch,
    setMainSearch,
    searchParams,
    setSearchParams,
  } = useSearch();

  const router = useRouter();
  const { data: makes, isLoading } = useGetAllMakes();

  const makeOptions = useMemo(() => {
    if (isLoading) return [{ label: "Any Makes", value: DEFAULT_MAKE }];
    return formatMakeOptions(makes ?? []);
  }, [makes, isLoading]);

  const modelOptions = useMemo(
    () => getModelOptions(mainSearch.make ?? DEFAULT_MAKE),
    [mainSearch.make]
  );

  const handleSearchClick = useCallback(() => {
    const { startPrice, endPrice } = getPriceRange(mainSearch.price);
    const status = parseStatus(statusTab);
    const updatedSearch = {
      ...mainSearch,
      startPrice,
      endPrice,
      status,
    };

    setMainSearch(updatedSearch);
    setStagedSearch({
      ...stagedSearch,
      stagedMake: mainSearch.make,
      stagedModel: mainSearch.model,
      stagedStartPrice: startPrice,
      stagedEndPrice: endPrice,
    });
    setSearchParams({
      ...searchParams,
      make: updatedSearch.make,
      model: updatedSearch.model,
      status,
      startPrice,
      endPrice,
    });
    router.push(
      `/search?make=${updatedSearch.make}&model=${updatedSearch.model}&price=${updatedSearch.price}&status=${status}`
    );
  }, [
    mainSearch,
    statusTab,
    stagedSearch,
    setMainSearch,
    setStagedSearch,
    setSearchParams,
    searchParams,
    router,
  ]);

  return {
    makeProps: {
      value: mainSearch.make,
      onChange: (value: string) =>
        setMainSearch((prev) => ({
          ...prev,
          make: value,
          model: "Any_Models",
        })),
      options: makeOptions,
    },
    modelProps: {
      value: mainSearch.model,
      onChange: (value: string) =>
        setMainSearch((prev) => ({ ...prev, model: value })),
      options: modelOptions,
    },
    priceProps: {
      value: mainSearch.price,
      onChange: (value: string) =>
        setMainSearch((prev) => ({ ...prev, price: value })),
      options: PRICE_OPTIONS,
    },
    handleSearchClick,
  };
}
