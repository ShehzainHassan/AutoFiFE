"use client";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import { getMakeByModel } from "@/utilities/utilities";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Hero from "./hero";

export default function HeroContainer() {
  const router = useRouter();
  const tabs = ["All", "New", "Used"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const {
    mainSearch,
    stagedSearch,
    setMainSearch,
    setStagedSearch,
    searchParams,
    setSearchParams,
  } = useSearch();
  const handleCarModelClick = (model: string) => {
    const make = getMakeByModel(model);
    setMainSearch({
      ...mainSearch,
      make,
      model,
      startPrice: null,
      endPrice: null,
    });
    setStagedSearch({
      ...stagedSearch,
      stagedMake: make,
      stagedModel: model,
      stagedStartPrice: null,
      stagedEndPrice: null,
    });
    setSearchParams({
      ...searchParams,
      make,
      model,
    });
    router.push(`/search?make=${make}&model=${model}`);
  };

  return (
    <Hero
      tabs={tabs}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      handleCarModelClick={handleCarModelClick}
    />
  );
}
