import React, { memo } from "react";
import CarImage from "@/app/components/result-card/car-image/car-image";
import TextContainer from "../../text-container/text-container";
import classes from "./notification-container.module.css";
import { NotificationContainerProps } from "./notification-container.types";

function NotificationContainer({
  title = "Auction Alerts",
  description = "Stay informed about your bidding activity, watchlist updates, and auction ending warnings.",
  imageSrc = "/images/glc_2023.png",
}: NotificationContainerProps) {
  return (
    <div
      className={classes.container}
      role="region"
      aria-label="Notification container">
      <div className={classes.notificationDetailsContainer}>
        <div className={classes.notificationDetails}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <TextContainer
          value="Manage"
          aria-label="Manage notification settings"
        />
      </div>

      <div className={classes.imageWrapper}>
        <CarImage src={imageSrc} />
      </div>
    </div>
  );
}

export default memo(NotificationContainer);
