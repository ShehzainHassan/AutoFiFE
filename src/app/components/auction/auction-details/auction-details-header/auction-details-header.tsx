"use client";
import AuctionIcon from "@/assets/images/icons/auction.png";
import NotificationBell from "@/assets/images/icons/notification.png";
import ProfilePic from "@/assets/images/icons/profile-pic.png";
import { ThemeProvider } from "@/theme/themeContext";
import Image from "next/image";
import { AuctionSearchField } from "@/app/components";
import TextContainer from "../text-container/text-container";
import classes from "./auction-details-header.module.css";
import { usePanel } from "@/contexts/panel-context/panel-context";
import { useRouter } from "next/navigation";

export default function AuctionDetailsHeader() {
  const { panel, togglePanel } = usePanel();
  const router = useRouter();
  const redictToAuction = () => {
    router.push("/auction");
  };
  return (
    <div
      className={[
        classes.container,
        panel !== "none" && classes.column,
        panel !== "none" && classes.panelOpen,
      ]
        .filter(Boolean)
        .join(" ")}>
      <div className={classes.topBar}>
        <div>
          <div className={classes.tabs}>
            <div className={classes.tabMain} onClick={redictToAuction}>
              <Image
                src={AuctionIcon}
                alt="auction-icon"
                width={16}
                height={16}
                placeholder="blur"
                loading="lazy"
              />
              <h3>Auction</h3>
            </div>
            <div className={classes.tabItems}>
              <p className={classes.tabItem}>Buy</p>
              <p className={classes.tabItem}>Sell</p>
              <p className={classes.tabItem}>Finance</p>
              <p className={classes.tabItem}>How it works</p>
            </div>
          </div>
        </div>

        <div className={classes.inputContainer}>
          <AuctionSearchField />

          <div className={classes.notificationContainer}>
            <ThemeProvider>
              <TextContainer
                value="Watchlist"
                className={`${classes.textContainer} ${
                  panel === "watchlist" ? classes.selected : ""
                } `}
                onClick={() => togglePanel("watchlist")}
              />
            </ThemeProvider>

            <div
              className={`${classes.notification} ${
                panel === "notification" ? classes.selected : ""
              }`}
              onClick={() => togglePanel("notification")}>
              <Image
                src={NotificationBell}
                alt="Notification"
                width={20}
                height={20}
              />
            </div>
          </div>

          <div className={`${classes.notification} ${classes.profilePic}`}>
            <Image src={ProfilePic} alt="profile-pic" width={40} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
