"use client";

import CarImage from "@/app/components/result-card/car-image/car-image";
import vehicleImg from "@/assets/images/cars/Bentley-Arnage4.4.png";
import { usePanel } from "@/contexts/panel-context/panel-context";
import { formatTimeAMPM } from "@/utilities/utilities";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import { useRouter } from "next/navigation";
import TextContainer from "../../text-container/text-container";
import classes from "./user-notifications.module.css";
import { UserNotificationsProps } from "./user-notifications.types";

export default function UserNotifications({
  notifications,
  markAsRead,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: UserNotificationsProps) {
  const { togglePanel } = usePanel();
  const router = useRouter();

  const redirectToCheckout = (auctionId: number) => {
    togglePanel("none");
    router.push(`/auction/${auctionId}/checkout`);
  };

  return (
    <>
      {notifications.map((notification) => {
        const isRead = notification.isRead;
        const key = notification.id;

        const content = (
          <div className={classes.header}>
            <h3 className={isRead ? classes.read : classes.unread}>
              {notification.title}
              <span className={classes.time}>
                ({formatTimeAMPM(notification.createdAt)})
              </span>
              {!isRead && (
                <span onClick={() => markAsRead(notification.id)}>
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
        );

        return (
          <div className={classes.container} key={key}>
            {/* <div className={classes.tag}>Outbid</div> */}
            <div>
              {content}
              {notification.notificationType === 3 && (
                <TextContainer
                  value="Checkout"
                  className={classes.textContainer}
                  onClick={() =>
                    redirectToCheckout(notification.auctionId ?? -1)
                  }
                />
              )}
            </div>
            {notification.notificationType === 3 && (
              <CarImage src={vehicleImg} />
            )}
          </div>
        );
      })}

      {hasNextPage && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
            className={classes.loadMoreBtn}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
