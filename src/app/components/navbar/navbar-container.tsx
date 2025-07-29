"use client";
import { MAX_YEAR, MIN_YEAR, PAGE_SIZE } from "@/constants";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import { trackError } from "@/utilities/error-tracking";
import { convertArrayToString } from "@/utilities/utilities";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarView from "./navbar-view";
import { NavbarContainerProps } from "./navbar.types";

export default function NavbarContainer({
  backgroundColor = "transparent",
}: NavbarContainerProps) {
  const router = useRouter();
  const { mainSearch, setMainSearch, setStagedSearch, setSearchParams } =
    useSearch();
  const resetFilters = () => {
    setMainSearch({
      make: "Any_Makes",
      model: "Any_Models",
      status: "Any",
      startYear: MIN_YEAR,
      endYear: MAX_YEAR,
      selectedGearboxes: [],
      selectedColors: [],
      price: "All_Prices",
      startPrice: null,
      endPrice: null,
      mileage: null,
      sortOrder: null,
    });
    setStagedSearch({
      stagedMake: "Any_Makes",
      stagedModel: "Any_Models",
      stagedStatus: "Any",
      stagedStartYear: MIN_YEAR,
      stagedEndYear: MAX_YEAR,
      stagedGearboxes: [],
      stagedColors: [],
      stagedStartPrice: null,
      stagedEndPrice: null,
      stagedMileage: null,
    });
    setSearchParams({
      pageSize: PAGE_SIZE,
      offset: 0,
      make: "Any_Makes",
      model: "Any_Models",
      startPrice: null,
      endPrice: null,
      status: "Any",
      mileage: null,
      startYear: MIN_YEAR,
      endYear: MAX_YEAR,
      sortOrder: null,
      gearbox: convertArrayToString([]),
      selectedColor: convertArrayToString([]),
    });
  };

  const redirectToHome = () => {
    router.push("/");
    setTimeout(() => {
      resetFilters();
    }, 2000);
  };

  const [userName, setUserName] = useState<string | null>(null);
  useEffect(() => {
    const authData = localStorage.getItem("authData") ?? "";
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        setUserName(parsed?.userName ?? null);
      } catch (err) {
        console.error("Error parsing authData:", err);
        trackError(err as Error, { source: "authData useEffect" });
      }
    }
  }, []);
  const [showLogout, setShowLogout] = useState(false);

  const handleSignInClick = () => {
    if (userName) {
      setShowLogout((prev) => !prev);
    } else {
      router.push("/sign-in");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authData");
    setShowLogout(false);
    setMainSearch({
      ...mainSearch,
      price: "All_Prices",
      startPrice: null,
      endPrice: null,
      mileage: null,
    });
    window.location.reload();
  };
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <NavbarView
      backgroundColor={backgroundColor}
      handleLogout={handleLogout}
      handleSignInClick={handleSignInClick}
      menuOpen={menuOpen}
      redirectToHome={redirectToHome}
      setMenuOpen={setMenuOpen}
      showLogout={showLogout}
      userName={userName}
    />
  );
}
