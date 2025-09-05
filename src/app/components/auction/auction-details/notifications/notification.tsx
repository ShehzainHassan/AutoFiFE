"use client";

import { useState, useMemo } from "react";
import HorizontalTabs from "@/app/components/horizontal-tabs/horizontal-tabs";
import Loading from "@/app/components/loading";
import usePaginatedNotifications from "@/hooks/useGetUserNotifications";
import useMarkAsRead from "@/hooks/useMarkAsRead";
import classes from "./notification.module.css";
import {
  ErrorMessage,
  NotificationContainer,
  UserNotifications,
} from "@/app/components";

export default function AuctionNotificationSettings() {
  const tabs = useMemo(() => ["Notifications", "Notification Settings"], []);
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

  const notifications = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);

  const handleTabChange = (tab: string) => setSelected(tab);

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <h1 className={classes.title}>Notifications</h1>
        <HorizontalTabs
          selectedTab={selected}
          tabs={tabs}
          onTabChange={handleTabChange}
        />
      </div>

      <div
        className={`${classes.notificationSettingsContainer} ${
          selected === tabs[0] ? classes.userNotifs : ""
        }`}
        role="region"
        aria-label={selected}>
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
