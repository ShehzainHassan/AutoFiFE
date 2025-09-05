"use client";
import React, { useCallback, useMemo, Profiler } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ErrorBoundary } from "@sentry/nextjs";
import { trackRender } from "@/utilities/performance-tracking";
import { usePanel } from "@/contexts/panel-context/panel-context";
import useGetUnreadCount from "@/hooks/useGetUnreadCount";
import classes from "./auction-details-header.module.css";

import AuctionIcon from "@/assets/images/icons/auction.png";
import NotificationBell from "@/assets/images/icons/notification.png";
import ProfilePic from "@/assets/images/icons/profile-pic.png";

const AuctionSearchField = dynamic(
  () => import("@/app/components/auction/auction-search-field")
);
const TextContainer = dynamic(() => import("../text-container/text-container"));
const Image = dynamic(() => import("next/image"));
const ThemeProvider = dynamic(() =>
  import("@/theme/themeContext").then((mod) => mod.ThemeProvider)
);

export default function AuctionDetailsHeader() {
  const { panel, togglePanel } = usePanel();
  const router = useRouter();

  const authData = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("authData") || "{}");
    } catch {
      return {};
    }
  }, []);

  const { data: notificationCount, isLoading } = useGetUnreadCount(!!authData);

  const handleRedirectToAuction = useCallback(() => {
    router.push("/auction");
  }, [router]);

  const handleTogglePanel = useCallback(
    (panelType: "watchlist" | "notification") => {
      togglePanel(panelType);
    },
    [togglePanel]
  );

  return (
    <ErrorBoundary fallback={<div>Failed to load Auction Details Header</div>}>
      <Profiler id="AuctionDetailsHeader" onRender={trackRender}>
        <div
          className={[
            classes.container,
            panel !== "none" && classes.column,
            panel !== "none" && classes.panelOpen,
          ]
            .filter(Boolean)
            .join(" ")}
          role="region"
          aria-label="Auction header navigation">
          <div className={classes.topBar}>
            <div>
              <div className={classes.tabs}>
                <div
                  className={classes.tabMain}
                  role="button"
                  tabIndex={0}
                  aria-label="Go to Auction"
                  onClick={handleRedirectToAuction}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      handleRedirectToAuction();
                  }}>
                  <Image
                    src={AuctionIcon}
                    alt="Auction icon"
                    width={16}
                    height={16}
                    placeholder="blur"
                    loading="lazy"
                  />
                  <h3>Auction</h3>
                </div>

                <div className={classes.tabItems}>
                  {["Buy", "Sell", "Finance", "How it works"].map((label) => (
                    <p
                      key={label}
                      className={classes.tabItem}
                      role="link"
                      tabIndex={0}>
                      {label}
                    </p>
                  ))}
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
                    }`}
                    onClick={() => handleTogglePanel("watchlist")}
                    aria-label="Open Watchlist panel"
                  />
                </ThemeProvider>

                <div
                  className={`${classes.notification} ${
                    panel === "notification" ? classes.selected : ""
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label="Open Notifications panel"
                  onClick={() => handleTogglePanel("notification")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      handleTogglePanel("notification");
                  }}>
                  <Image
                    src={NotificationBell}
                    alt="Notification bell"
                    width={20}
                    height={20}
                  />
                  {!isLoading &&
                    typeof notificationCount === "number" &&
                    notificationCount > 0 && (
                      <p
                        className={classes.notificationCount}
                        role="status"
                        aria-live="polite">
                        {notificationCount}
                      </p>
                    )}
                </div>
              </div>

              <div
                className={`${classes.notification} ${classes.profilePic}`}
                role="img"
                aria-label="User profile picture">
                <Image
                  src={ProfilePic}
                  alt="Profile picture"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>
        </div>
      </Profiler>
    </ErrorBoundary>
  );
}
