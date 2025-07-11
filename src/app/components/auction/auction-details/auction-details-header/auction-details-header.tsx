"use client";
import HorizontalTabs from "@/app/components/horizontal-tabs/horizontal-tabs";
import { Input } from "@/app/components/input-field";
import MaginfyIcon from "@/assets/images/icons/magnify.png";
import NotificationBell from "@/assets/images/icons/notification.png";
import ProfilePic from "@/assets/images/icons/profile-pic.png";
import { BLACK_THEME } from "@/styles/tab-styles";
import { ThemeProvider } from "@/theme/themeContext";
import Image from "next/image";
import { useState } from "react";
import TextContainer from "../text-container/text-container";
import SavedVehicles from "../saved-vehicles/saved-vehicles";
import AuctionNotificationSettings from "../notifications/notification";
import classes from "./auction-details-header.module.css";

type Panel = "none" | "watchlist" | "notification";

export default function AuctionDetailsHeader() {
  const [selectedTab, setSelectedTab] = useState("Buy");
  const [search, setSearch] = useState("");
  const [panel, setPanel] = useState<Panel>("none");

  const togglePanel = (target: Panel) =>
    setPanel((prev) => (prev === target ? "none" : target));

  return (
    <div
      className={`${classes.container} ${
        panel !== "none" ? classes.column : ""
      }`}>
      <div className={classes.topBar}>
        <ThemeProvider value={BLACK_THEME}>
          <HorizontalTabs
            tabs={["Buy", "Sell", "Finance", "How it works"]}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />
        </ThemeProvider>

        <div className={classes.inputContainer}>
          <div className={classes.searchFieldContainer}>
            <div className={classes.magnify}>
              <Image
                src={MaginfyIcon}
                alt="magify-icon"
                width={24}
                height={24}
              />
            </div>
            <Input width="120px">
              <Input.Field
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={classes.searchField}
              />
            </Input>
          </div>

          <div className={classes.notificationContainer}>
            <ThemeProvider>
              <TextContainer
                value="Watchlist"
                className={classes.textContainer}
                onClick={() => togglePanel("watchlist")}
              />
            </ThemeProvider>

            <div
              className={classes.notification}
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

      {panel === "watchlist" && <SavedVehicles />}
      {panel === "notification" && <AuctionNotificationSettings />}
    </div>
  );
}
