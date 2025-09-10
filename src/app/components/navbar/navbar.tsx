"use client";

import ExpandIcon from "@/assets/images/icons/expand.png";
import Logo from "@/assets/images/logos/logo.png";
import {
  DEFAULT_MAKE,
  DEFAULT_MODEL,
  MAX_YEAR,
  MIN_YEAR,
  PAGE_SIZE,
} from "@/constants";
import { useAuth } from "@/contexts/auth-context";
import { useSearch } from "@/contexts/car-search-context/car-search-context";
import useTranslation from "@/i18n";
import headings from "@/styles/typography.module.css";
import { convertArrayToString } from "@/utilities/utilities";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import ButtonPrimary from "../buttons/button-primary";
import classes from "./navbar.module.css";
import { NavbarContainerProps } from "./navbar.types";
import { limitedAxios } from "@/api/rateLimitedAxios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function Navbar({
  backgroundColor = "transparent",
}: NavbarContainerProps) {
  const { t } = useTranslation();
  const navbarItems = t("navbar.navItems");

  const router = useRouter();
  const { mainSearch, setMainSearch, setStagedSearch, setSearchParams } =
    useSearch();
  const { userName } = useAuth();
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

  const [showLogout, setShowLogout] = useState(false);
  const { clearAuth } = useAuth();
  const handleSignInClick = useCallback(() => {
    if (userName) {
      setShowLogout((prev) => !prev);
    } else {
      router.push("/sign-in");
    }
  }, [userName, router]);

  const handleLogout = useCallback(async () => {
    await limitedAxios.post(
      `${API_BASE_URL}/user/logout`,
      {},
      { withCredentials: true }
    );
    clearAuth();
    setShowLogout(false);
    setMainSearch({
      ...mainSearch,
      price: "All_Prices",
      startPrice: null,
      endPrice: null,
      mileage: null,
    });
    window.location.reload();
  }, [mainSearch, setMainSearch, clearAuth]);

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

        <li role="none" style={{ listStyleType: "none" }}>
          <ButtonPrimary btnText={t("navbar.submitBtn")} />
        </li>
      </ul>
    </nav>
  );
}
