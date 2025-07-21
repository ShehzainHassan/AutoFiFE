"use client";
import ExpandIcon from "@/assets/images/icons/expand.png";
import Logo from "@/assets/images/logos/logo.png";
import headings from "@/styles/typography.module.css";
import Image from "next/image";
import { ButtonPrimary } from "@/app/components";
import { NavbarProps } from "./navbar.types";
import classes from "./navbar.module.css";
import useTranslation from "@/i18n";

export default function Navbar({
  menuOpen,
  setMenuOpen,
  redirectToHome,
  handleLogout,
  handleSignInClick,
  backgroundColor = "transparent",
  userName,
  showLogout,
}: NavbarProps) {
  const { t } = useTranslation();

  const navbarItems = t("navbar.navItems");

  return (
    <div className={classes.navbar} style={{ backgroundColor }}>
      <Image
        src={Logo}
        className={classes.logo}
        alt="logo"
        width={108}
        height={26}
        loading="lazy"
        placeholder="blur"
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
                  src={ExpandIcon}
                  alt="expand"
                  width={8}
                  height={4}
                  loading="lazy"
                  placeholder="blur"
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
