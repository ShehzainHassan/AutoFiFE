"use client";
import HorizontalTabs from "@/app/components/horizontal-tabs/horizontal-tabs";
import { useState } from "react";
import TextContainer from "../text-container/text-container";
import classes from "./auction-details-header.module.css";
import { Input } from "@/app/components/input-field";
import NotificationBell from "@/assets/images/icons/notification.png";
import ProfilePic from "@/assets/images/icons/profile-pic.png";
import Image from "next/image";
import MaginfyIcon from "@/assets/images/icons/magnify.png";
import { ThemeProvider } from "@/theme/themeContext";
import { BLACK_THEME } from "@/styles/tab-styles";
export default function AuctionDetailsHeader() {
  const [selectedTab, setSelectedTab] = useState("Buy");
  const [search, setSearch] = useState("");

  return (
    <div className={classes.container}>
      <div className={classes.tabs}>
        <ThemeProvider value={BLACK_THEME}>
          <HorizontalTabs
            tabs={["Buy", "Sell", "Finance", "How it works"]}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />
        </ThemeProvider>
      </div>

      <div className={classes.inputContainer}>
        <div className={classes.searchFieldContainer}>
          <div className={classes.magnify}>
            <Image src={MaginfyIcon} alt="magify-icon" width={24} height={24} />
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
          <TextContainer value="Help" className={classes.textContainer} />

          <div className={classes.notification}>
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
  );
}
