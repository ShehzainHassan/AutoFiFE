import React from "react";
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
  const { setPrice, setStartPrice, setEndPrice } = useSearch();
  const redirectToHome = () => {
    router.push("/");
    setPrice("All_Prices");
    setStartPrice(null);
    setEndPrice(null);
  };
  const navbarItems = t("navbar.navItems");
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
          const showExpandIcon = [
            t("navbar.navItems.home"),
            t("navbar.navItems.listings"),
            t("navbar.navItems.blog"),
            t("navbar.navItems.pages"),
          ].includes(t(`navbar.navItems.${key}`));

          return (
            <div key={key} className={classes.navContainer}>
              <h3 className={`${headings.navElement} ${classes.white}`}>
                {label}
              </h3>
              {showExpandIcon && (
                <Image
                  src="/images/expand.png"
                  alt="expand"
                  width={8}
                  height={4}
                />
              )}
            </div>
          );
        })}

        <ButtonPrimary btnText={t("navbar.submitBtn")} />
      </div>
    </div>
  );
}
