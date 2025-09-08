"use client";

import {
  DEFAULT_MAKE,
  DEFAULT_MODEL,
  MAX_YEAR,
  MIN_YEAR,
  PAGE_SIZE,
} from "@/constants";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import { trackError } from "@/utilities/error-tracking";
import { convertArrayToString } from "@/utilities/utilities";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { NavbarContainerProps } from "./navbar.types";
import ButtonPrimary from "../buttons/button-primary";
import Image from "next/image";
import useTranslation from "@/i18n";
import headings from "@/styles/typography.module.css";
import classes from "./navbar.module.css";
import Logo from "@/assets/images/logos/logo.png";
import ExpandIcon from "@/assets/images/icons/expand.png";

export default function Navbar({
  backgroundColor = "transparent",
}: NavbarContainerProps) {
  const { t } = useTranslation();
  const navbarItems = t("navbar.navItems");

  const router = useRouter();
  const { mainSearch, setMainSearch, setStagedSearch, setSearchParams } =
    useSearch();

  const resetFilters = useCallback(() => {
    setMainSearch({
      make: DEFAULT_MAKE,
      model: DEFAULT_MODEL,
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
      stagedMake: DEFAULT_MAKE,
      stagedModel: DEFAULT_MODEL,
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
      make: DEFAULT_MAKE,
      model: DEFAULT_MODEL,
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
  }, [setMainSearch, setStagedSearch, setSearchParams]);

  const redirectToHome = useCallback(() => {
    router.push("/");
    setTimeout(() => {
      resetFilters();
    }, 2000);
  }, [router, resetFilters]);

  const [userName, setUserName] = useState<string | null>(null);
  useEffect(() => {
    const authData = localStorage.getItem("authData") ?? "";
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        setUserName(parsed?.userName ?? null);
      } catch (err) {
        console.error("Error parsing authData:", err);
        trackError(err as Error, {
          source: "authData useEffect",
        });
      }
    }
  }, []);

  const [showLogout, setShowLogout] = useState(false);
  const handleSignInClick = useCallback(() => {
    if (userName) {
      setShowLogout((prev) => !prev);
    } else {
      router.push("/sign-in");
    }
  }, [userName, router]);

  const handleLogout = useCallback(() => {
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
  }, [mainSearch, setMainSearch]);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={classes.navbar}
      style={{
        backgroundColor,
      }}
      aria-label="Main navigation">
      <Image
        src={Logo}
        className={classes.logo}
        alt="BoxCars logo"
        width={108}
        height={26}
        loading="lazy"
        placeholder="blur"
        onClick={redirectToHome}
      />

      <button
        className={classes.hamburger}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        aria-controls="nav-container"
        onClick={() => setMenuOpen((prev) => !prev)}>
        <span className={classes.bar}></span>
        <span className={classes.bar}></span>
        <span className={classes.bar}></span>
      </button>

      <ul
        id="nav-container"
        className={`${classes.navList} ${classes.navListMobile} ${
          menuOpen ? classes.navListMobileShow : ""
        }`}
        aria-hidden={!menuOpen}
        role="menubar">
        {Object.entries(navbarItems).map(([key, label]) => {
          const isSignIn = key === "signIn";
          const showExpandIcon = [
            t("navbar.navItems.home"),
            t("navbar.navItems.listings"),
            t("navbar.navItems.blog"),
            t("navbar.navItems.pages"),
          ].includes(t(`navbar.navItems.${key}`));

          return (
            <li key={key} role="none" className={classes.navContainer}>
              <button
                role="menuitem"
                className={`${headings.navElement} ${classes.white}`}
                onClick={() => {
                  if (isSignIn) handleSignInClick();
                }}
                aria-label={isSignIn && userName ? "User menu" : label}>
                {isSignIn && userName ? userName : label}
              </button>

              {showExpandIcon && (
                <Image
                  src={ExpandIcon}
                  alt=""
                  width={8}
                  height={4}
                  loading="lazy"
                  placeholder="blur"
                  aria-hidden="true"
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
            </li>
          );
        })}

        <li role="none">
          <ButtonPrimary btnText={t("navbar.submitBtn")} />
        </li>
      </ul>
    </nav>
  );
}
