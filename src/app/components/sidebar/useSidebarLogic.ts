import { useSearch } from "@/contexts/car-search-context";
import { useRouter } from "next/navigation";
import useGetAllMakes from "@/hooks/useGetAllMakes";
import { useMemo } from "react";
import {
  convertArrayToString,
  formatMakeOptions,
  getModelOptions,
  getResultTitle,
} from "@/utilities/utilities";
import { SearchParams } from "@/interfaces/search-params";

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
    if (isLoading) return [{ label: "Any Makes", value: "Any_Makes" }];
    return makes
      ? formatMakeOptions(makes)
      : [{ label: "Any Makes", value: "Any_Makes" }];
  }, [makes, isLoading]);

  const modelOptions = useMemo(
    () => getModelOptions(stagedSearch.stagedMake ?? "Any_Makes"),
    [stagedSearch.stagedMake]
  );

  const onMakeChange = (value: string) => {
    setStagedSearch({
      ...stagedSearch,
      stagedMake: value,
      stagedModel: "Any_Models",
    });
  };

  const onModelChange = (value: string) => {
    setStagedSearch({
      ...stagedSearch,
      stagedModel: value,
    });
  };

  const onSearchClick = () => {
    const newParams = {
      ...searchParams,
      make: stagedSearch.stagedMake,
      offset: 0,
      model: stagedSearch.stagedModel,
      startPrice: stagedSearch.stagedStartPrice,
      endPrice: stagedSearch.stagedEndPrice,
      status: stagedSearch.stagedStatus,
      mileage: stagedSearch.stagedMileage,
      startYear: stagedSearch.stagedStartYear,
      endYear: stagedSearch.stagedEndYear,
      gearbox: convertArrayToString(stagedSearch.stagedGearboxes),
      selectedColor: convertArrayToString(stagedSearch.stagedColors),
    };

    setMainSearch({
      ...mainSearch,
      make: stagedSearch.stagedMake,
      model: stagedSearch.stagedModel,
      startPrice: stagedSearch.stagedStartPrice,
      endPrice: stagedSearch.stagedEndPrice,
      status: stagedSearch.stagedStatus,
      mileage: stagedSearch.stagedMileage,
      startYear: stagedSearch.stagedStartYear,
      endYear: stagedSearch.stagedEndYear,
      selectedGearboxes: stagedSearch.stagedGearboxes,
      selectedColors: stagedSearch.stagedColors,
    });

    setSearchParams(newParams);
    setSubmittedParams(newParams);
    setExpandedSections(new Set());

    setResultText(
      getResultTitle(stagedSearch.stagedMake, stagedSearch.stagedModel)
    );

    let mileageText = stagedSearch.stagedMileage
      ? `<=${stagedSearch.stagedMileage}`
      : "Any";
    if (stagedSearch.stagedMileage === 0) mileageText = "0";

    const gearboxText =
      stagedSearch.stagedGearboxes.length > 0 &&
      stagedSearch.stagedGearboxes.length !== 3
        ? stagedSearch.stagedGearboxes.join(",")
        : "Any";

    const colorsText =
      stagedSearch.stagedColors.length > 0 &&
      stagedSearch.stagedColors.length !== 16
        ? stagedSearch.stagedColors.join(",")
        : "Any";

    router.push(
      `/search?make=${stagedSearch.stagedMake}&model=${stagedSearch.stagedModel}&price=${mainSearch.price}&mileage=${mileageText}&startYear=${stagedSearch.stagedStartYear}&endYear=${stagedSearch.stagedEndYear}&gearbox=${gearboxText}&colors=${colorsText}&status=${stagedSearch.stagedStatus}`
    );
  };

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
