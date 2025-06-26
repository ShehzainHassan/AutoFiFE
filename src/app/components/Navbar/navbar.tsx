"use client";
import { MAX_YEAR, MIN_YEAR, PAGE_SIZE } from "@/constants";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import useTranslation from "@/i18n";
import headings from "@/styles/typography.module.css";
import { convertArrayToString } from "@/utilities/utilities";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ButtonPrimary from "../buttons/button-primary/button-primary";
import { NavbarProps } from "./navbar-types";
import classes from "./navbar.module.css";

export default function Navbar({
  backgroundColor = "transparent",
}: NavbarProps) {
  const { t } = useTranslation();
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

  const navbarItems = t("navbar.navItems");

  const [userName, setUserName] = useState<string | null>(null);
  useEffect(() => {
    const authData = localStorage.getItem("authData") ?? "";
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        setUserName(parsed?.userName ?? null);
      } catch (err) {
        console.error("Error parsing authData:", err);
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
    <div className={classes.navbar} style={{ backgroundColor }}>
      <Image
        src="/images/logo.png"
        className={classes.logo}
        alt="logo"
        width={108}
        height={26}
        onClick={redirectToHome}
      />
      <button
        className={classes.hamburger}
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}>
        <span className={classes.bar}></span>
        <span className={classes.bar}></span>
        <span className={classes.bar}></span>
      </button>
      <div
        data-testid="nav-container"
        className={`${classes.navList} ${classes.navListMobile} ${
          menuOpen ? classes.navListMobileShow : ""
        }`}>
        {Object.entries(navbarItems).map(([key, label]) => {
          const isSignIn = key === "signIn";
          const showExpandIcon = [
            t("navbar.navItems.home"),
            t("navbar.navItems.listings"),
            t("navbar.navItems.blog"),
            t("navbar.navItems.pages"),
          ].includes(t(`navbar.navItems.${key}`));

          return (
            <div
              key={key}
              className={classes.navContainer}
              onClick={() => {
                if (isSignIn) handleSignInClick();
              }}>
              <h3 className={`${headings.navElement} ${classes.white}`}>
                {isSignIn && userName ? userName : label}
              </h3>
              {showExpandIcon && (
                <Image
                  src="/images/expand.png"
                  alt="expand"
                  width={8}
                  height={4}
                />
              )}
              {isSignIn && userName && showLogout && (
                <div
                  className={`${classes.logoutContainer} ${
                    showLogout ? classes.show : ""
                  }`}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLogout();
                    }}
                    className={classes.logout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          );
        })}

        <ButtonPrimary btnText={t("navbar.submitBtn")} />
      </div>
    </div>
  );
}
