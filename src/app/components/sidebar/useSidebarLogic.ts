import { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/contexts/car-search-context";
import useGetAllMakes from "@/hooks/useGetAllMakes";
import {
  convertArrayToString,
  formatMakeOptions,
  getModelOptions,
  getResultTitle,
} from "@/utilities/utilities";
import { SearchParams } from "@/interfaces/search-params";
import {
  DEFAULT_COLOR_COUNT,
  DEFAULT_GEARBOX_COUNT,
  DEFAULT_MAKE,
  DEFAULT_MODEL,
} from "@/constants";

export const useSidebarLogic = (
  setSubmittedParams: (params: SearchParams) => void,
  setResultText: (text: string) => void
) => {
  const {
    mainSearch,
    stagedSearch,
    searchParams,
    setMainSearch,
    setStagedSearch,
    setSearchParams,
    setExpandedSections,
  } = useSearch();

  const router = useRouter();
  const { data: makes, isLoading } = useGetAllMakes();

  const makeOptions = useMemo(() => {
    return isLoading || !makes
      ? [{ label: "Any Makes", value: DEFAULT_MAKE }]
      : formatMakeOptions(makes);
  }, [makes, isLoading]);

  const modelOptions = useMemo(() => {
    return getModelOptions(stagedSearch.stagedMake ?? DEFAULT_MAKE);
  }, [stagedSearch.stagedMake]);

  const onMakeChange = useCallback(
    (value: string) => {
      setStagedSearch((prev) => ({
        ...prev,
        stagedMake: value,
        stagedModel: DEFAULT_MODEL,
      }));
    },
    [setStagedSearch]
  );

  const onModelChange = useCallback(
    (value: string) => {
      setStagedSearch((prev) => ({
        ...prev,
        stagedModel: value,
      }));
    },
    [setStagedSearch]
  );

  const onSearchClick = useCallback(() => {
    const {
      stagedMake,
      stagedModel,
      stagedStartPrice,
      stagedEndPrice,
      stagedStatus,
      stagedMileage,
      stagedStartYear,
      stagedEndYear,
      stagedGearboxes,
      stagedColors,
    } = stagedSearch;

    const gearboxText =
      stagedGearboxes.length > 0 &&
      stagedGearboxes.length !== DEFAULT_GEARBOX_COUNT
        ? stagedGearboxes.join(",")
        : "Any";

    const colorsText =
      stagedColors.length > 0 && stagedColors.length !== DEFAULT_COLOR_COUNT
        ? stagedColors.join(",")
        : "Any";

    const mileageText =
      stagedMileage === 0 ? "0" : stagedMileage ? `<=${stagedMileage}` : "Any";

    const newParams: SearchParams = {
      ...searchParams,
      make: stagedMake,
      model: stagedModel,
      offset: 0,
      startPrice: stagedStartPrice,
      endPrice: stagedEndPrice,
      status: stagedStatus,
      mileage: stagedMileage,
      startYear: stagedStartYear,
      endYear: stagedEndYear,
      gearbox: convertArrayToString(stagedGearboxes),
      selectedColor: convertArrayToString(stagedColors),
    };

    setMainSearch({
      ...mainSearch,
      make: stagedMake,
      model: stagedModel,
      startPrice: stagedStartPrice,
      endPrice: stagedEndPrice,
      status: stagedStatus,
      mileage: stagedMileage,
      startYear: stagedStartYear,
      endYear: stagedEndYear,
      selectedGearboxes: stagedGearboxes,
      selectedColors: stagedColors,
    });

    setSearchParams(newParams);
    setSubmittedParams(newParams);
    setExpandedSections(new Set());
    setResultText(getResultTitle(stagedMake, stagedModel));

    router.push(
      `/search?make=${stagedMake}&model=${stagedModel}&price=${mainSearch.price}&mileage=${mileageText}&startYear=${stagedStartYear}&endYear=${stagedEndYear}&gearbox=${gearboxText}&colors=${colorsText}&status=${stagedStatus}`
    );
  }, [
    stagedSearch,
    mainSearch,
    searchParams,
    setMainSearch,
    setSearchParams,
    setSubmittedParams,
    setExpandedSections,
    setResultText,
    router,
  ]);

  return {
    makeOptions,
    modelOptions,
    stagedMake: stagedSearch.stagedMake,
    stagedModel: stagedSearch.stagedModel,
    onMakeChange,
    onModelChange,
    onSearchClick,
  };
};
