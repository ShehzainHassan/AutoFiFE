import { useState } from "react";
import NotificationContainer from "./notification-container/notification-container";
import classes from "./notification.module.css";
import HorizontalTabs from "@/app/components/horizontal-tabs/horizontal-tabs";
import UserNotifications from "./user-notifications";
export default function AuctionNotificationSettings() {
  const tabs = ["Notifications", "Notification Settings"];
  const [selected, setSelected] = useState(tabs[0]);

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <h1 className={classes.title}>Notifications</h1>
        <HorizontalTabs
          selectedTab={selected}
          tabs={tabs}
          onTabChange={setSelected}
        />
      </div>

      <div className={classes.notificationSettingsContainer}>
        {selected === tabs[0] ? (
          <UserNotifications />
        ) : (
          <>
            <NotificationContainer />
            <NotificationContainer />
            <NotificationContainer />
            <NotificationContainer />
          </>
        )}
      </div>
    </div>
  );
}
