"use client";

import auctionAPI from "@/api/auctionAPI";
import { lazy, Profiler, Suspense, useCallback, useMemo } from "react";
import vehicleImg from "@/assets/images/cars/Bentley-Arnage4.4.png";
import { usePanel } from "@/contexts/panel-context/panel-context";
import { formatTimeAMPM } from "@/utilities/utilities";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import { useQueries } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import TextContainer from "../../text-container/text-container";
import classes from "./user-notifications.module.css";
import { UserNotificationsProps } from "./user-notifications.types";
import { ErrorBoundary } from "@sentry/nextjs";
import { trackRender } from "@/utilities/performance-tracking";

const CarImage = lazy(
  () => import("@/app/components/result-card/car-image/car-image")
);

export default function UserNotifications({
  notifications,
  markAsRead,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: UserNotificationsProps) {
  const { togglePanel } = usePanel();
  const router = useRouter();

  const redirectToCheckout = useCallback(
    (auctionId: number) => {
      togglePanel("none");
      router.push(`/auction/${auctionId}/checkout`);
    },
    [togglePanel, router]
  );

  const handleMarkAsRead = useCallback(
    (id: number) => {
      markAsRead(id);
    },
    [markAsRead]
  );

  const paymentStatusResults = useQueries({
    queries: notifications
      .filter((n) => n.notificationType === 3 && n.auctionId !== null)
      .map((n) => ({
        queryKey: ["isPaymentCompleted", n.auctionId],
        queryFn: () => auctionAPI.isPaymentCompleted(n.auctionId!),
        enabled: !!n.auctionId,
      })),
  });

  const paymentStatusMap = useMemo(() => {
    const map = new Map<number, boolean>();
    notifications.forEach((n, i) => {
      if (n.notificationType === 3 && n.auctionId !== null) {
        const result = paymentStatusResults[i];
        map.set(n.id, result?.data?.paymentCompleted ?? false);
      }
    });
    return map;
  }, [notifications, paymentStatusResults]);

  const renderedNotifications = useMemo(
    () =>
      notifications.map((notification) => {
        const isRead = notification.isRead;
        const auctionId = notification.auctionId ?? -1;
        const isPaymentCompleted =
          paymentStatusMap.get(notification.id) ?? false;

        return (
          <div
            className={classes.container}
            key={notification.id}
            role="listitem">
            <div>
              <div className={classes.header}>
                <h3 className={isRead ? classes.read : classes.unread}>
                  {notification.title}
                  <span className={classes.time}>
                    ({formatTimeAMPM(notification.createdAt)})
                  </span>
                  {!isRead && (
                    <span
                      onClick={() => handleMarkAsRead(notification.id)}
                      role="button"
                      tabIndex={0}
                      aria-label="Mark notification as read">
                      <MarkChatReadIcon className={classes.icon} />
                    </span>
                  )}
                </h3>
                <p
                  className={`${classes.message} ${
                    isRead ? classes.read : classes.unread
                  }`}>
                  {notification.message}
                </p>
              </div>

              {notification.notificationType === 3 && (
                <TextContainer
                  value={isPaymentCompleted ? "Payment Completed" : "Checkout"}
                  className={classes.textContainer}
                  onClick={() =>
                    !isPaymentCompleted && redirectToCheckout(auctionId)
                  }
                />
              )}
            </div>

            {notification.notificationType === 3 && (
              <Suspense
                fallback={
                  <div role="status" aria-live="polite">
                    Loading image...
                  </div>
                }>
                <CarImage src={vehicleImg} />
              </Suspense>
            )}
          </div>
        );
      }),
    [notifications, paymentStatusMap, redirectToCheckout, handleMarkAsRead]
  );

  return (
    <ErrorBoundary fallback={<div>Failed to load User Notifications</div>}>
      <Profiler id="UserNotifications" onRender={trackRender}>
        <div role="list" aria-label="User notifications">
          {renderedNotifications}

          {hasNextPage && (
            <div
              role="status"
              aria-live="polite"
              style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                onClick={fetchNextPage}
                disabled={isFetchingNextPage}
                className={classes.loadMoreBtn}
                aria-label="Load more notifications">
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </Profiler>
    </ErrorBoundary>
  );
}
