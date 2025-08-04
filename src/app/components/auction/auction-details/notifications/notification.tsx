"use client";

import ErrorMessage from "@/app/components/error-message";
import HorizontalTabs from "@/app/components/horizontal-tabs/horizontal-tabs";
import Loading from "@/app/components/loading";
import usePaginatedNotifications from "@/hooks/useGetUserNotifications";
import useMarkAsRead from "@/hooks/useMarkAsRead";
import { useState } from "react";
import NotificationContainer from "./notification-container/notification-container";
import classes from "./notification.module.css";
import UserNotifications from "./user-notifications";

export default function AuctionNotificationSettings() {
  const tabs = ["Notifications", "Notification Settings"];
  const [selected, setSelected] = useState(tabs[0]);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePaginatedNotifications();

  const { mutate: markAsRead } = useMarkAsRead();

  const notifications = data?.pages.flatMap((page) => page.items) ?? [];

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

      <div
        className={`${classes.notificationSettingsContainer} ${
          selected === tabs[0] ? classes.userNotifs : ""
        }`}>
        {selected === tabs[0] ? (
          isLoading ? (
            <Loading />
          ) : isError ? (
            <ErrorMessage message={error.message} />
          ) : (
            <UserNotifications
              notifications={notifications}
              markAsRead={markAsRead}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage ?? false}
              isFetchingNextPage={isFetchingNextPage}
            />
          )
        ) : (
          <>
            <NotificationContainer />
            <NotificationContainer />
            <NotificationContainer />
          </>
        )}
      </div>
    </div>
  );
}
