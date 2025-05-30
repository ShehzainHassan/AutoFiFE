"use client";
import React, { useState } from "react";
import Image from "next/image";
import classes from "./navbar.module.css";
import headings from "@/styles/typography.module.css";
import useTranslation from "@/i18n";
import { useRouter } from "next/navigation";
import { useSearch } from "@/contexts/carSearchContext";
import ButtonPrimary from "../buttons/Primary";
type NavbarProps = {
  backgroundColor?: string;
};
export default function Navbar({
  backgroundColor = "transparent",
}: NavbarProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { setPrice, setStartPrice, setEndPrice, setMileage } = useSearch();
  const redirectToHome = () => {
    router.push("/");
    setPrice("All_Prices");
    setStartPrice(null);
    setEndPrice(null);
    setMileage(null);
  };
  const navbarItems = t("navbar.navItems");

  let userName: string | null = null;
  if (typeof window !== "undefined") {
    const authData = localStorage.getItem("authData");
    if (authData) {
      try {
        userName = JSON.parse(authData)?.userName;
      } catch (err) {
        console.error("Error parsing authData:", err);
      }
    }
  }
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
    setPrice("All_Prices");
    setStartPrice(null);
    setEndPrice(null);
    setMileage(null);
    router.push("/");
  };
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
      <div className={classes.navList}>
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
