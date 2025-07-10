"use client";
import HorizontalTabs from "@/app/components/horizontal-tabs/horizontal-tabs";
import { useState } from "react";
import TextContainer from "../text-container/text-container";
import classes from "./auction-details-header.module.css";
import { Input } from "@/app/components/input-field";
import NotificationBell from "@/assets/images/icons/notification.png";
import ProfilePic from "@/assets/images/icons/profile-pic.png";
import Image from "next/image";

export default function AuctionDetailsHeader() {
  const [selectedTab, setSelectedTab] = useState("Buy");
  const [search, setSearch] = useState("");

  return (
    <div className={classes.container}>
      <HorizontalTabs
        tabs={["Buy", "Sell", "Finance", "How it works"]}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />

      <div className={classes.inputContainer}>
        <Input width="200px">
          <Input.Field
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Input>

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
