import { useSearch } from "@/contexts/car-search-context";
import useAllColors from "@/hooks/useAllColors";
import useGearboxCount from "@/hooks/useGearboxCount";
import useVehicleColorCount from "@/hooks/useVehicleColorCount";
import useVehicleCount from "@/hooks/useVehicleCount";
import { useEffect, useMemo, useState } from "react";
import { VehicleFilter } from "@/interfaces/vehicle";
import { convertArrayToString, getResultTitle } from "@/utilities/utilities";

export function useSearchPage() {
  const { mainSearch, searchParams, setAllColors, setCounts } = useSearch();

  const filters: VehicleFilter = useMemo(
    () => ({
      make: mainSearch.make,
      model: mainSearch.model,
      startPrice: mainSearch.startPrice,
      endPrice: mainSearch.endPrice,
      mileage: mainSearch.mileage,
      startYear: mainSearch.startYear,
      endYear: mainSearch.endYear,
      gearbox: convertArrayToString(mainSearch.selectedGearboxes),
      selectedColors: convertArrayToString(mainSearch.selectedColors),
      status: mainSearch.status,
    }),
    [mainSearch]
  );

  const [submittedParams, setSubmittedParams] = useState(searchParams);
  const [resultText, setResultText] = useState(
    getResultTitle(mainSearch.make, mainSearch.model)
  );

  const { data: gearboxesCount } = useGearboxCount(filters);
  const { data: colorsCount } = useVehicleColorCount(filters);
  const { data: allColors } = useAllColors();
  const { data: vehicleCount } = useVehicleCount(filters);

  useEffect(() => {
    if (gearboxesCount) setCounts((prev) => ({ ...prev, gearboxesCount }));
    if (colorsCount) setCounts((prev) => ({ ...prev, colorsCount }));
    if (allColors) setAllColors(allColors);
  }, [gearboxesCount, colorsCount, allColors, setCounts, setAllColors]);

  return {
    filters,
    resultText,
    setResultText,
    submittedParams,
    setSubmittedParams,
    vehicleCount,
  };
}
