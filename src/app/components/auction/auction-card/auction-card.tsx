"use client";
import React, { Profiler } from "react";
import dynamic from "next/dynamic";
import { AuctionCardProps } from "./auction-card.types";
import { useAuctionCard } from "@/hooks/useAuctionCard";
import { ThemeProvider } from "@/theme/themeContext";
import { CURRENCY } from "@/constants";
import { WHITE_WITH_BLUE_BORDER } from "@/constants/button-primary-themes";
import headings from "@/styles/typography.module.css";
import classes from "./auction-card.module.css";
import { ErrorBoundary } from "@sentry/nextjs";
import { trackRender } from "@/utilities/performance-tracking";
import CarImage from "@/assets/images/cars/2018_Honda_Civic.png";
const ButtonPrimary = dynamic(() => import("../../buttons/button-primary"));
const Image = dynamic(() => import("next/image"));

const AuctionCard = React.memo(
  ({ auctionId, vehicleDetails, price, endUTC, tag }: AuctionCardProps) => {
    const { totalSeconds, timerText, handleRedirect } = useAuctionCard(
      auctionId,
      endUTC
    );

    return (
      <Profiler id={`AuctionCard-${auctionId}`} onRender={trackRender}>
        <ErrorBoundary fallback={<div>Failed to load auction card.</div>}>
          <article
            className={classes.container}
            tabIndex={0}
            role="group"
            aria-label={`Auction card for ${vehicleDetails}`}>
            {tag && (
              <div className={classes.tag} role="status" aria-live="polite">
                <span className={classes.redDot} aria-hidden="true">
                  🔴
                </span>
                LIVE
              </div>
            )}

            <div
              role="button"
              onClick={handleRedirect}
              className={classes.cardButton}
              aria-label={`View details for ${vehicleDetails}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleRedirect();
              }}>
              <div className={classes.imageWrapper}>
                <Image
                  src={CarImage}
                  alt={`${vehicleDetails} image`}
                  fill
                  className={classes.image}
                  priority={false}
                />
              </div>

              <div className={classes.subContainer}>
                <h2 className={headings.auctionVehicleTitle}>
                  {vehicleDetails}
                </h2>

                <h2
                  className={`${headings.auctionVehiclePrice} ${classes.blue}`}>
                  {CURRENCY}
                  {price.toLocaleString()}
                </h2>

                <div
                  className={`${headings.auctionCardTimer} ${classes.endTimer}`}
                  role="status"
                  aria-live="polite">
                  {totalSeconds > 0 && (
                    <span className={classes.redDot} aria-hidden="true">
                      🔴
                    </span>
                  )}
                  {timerText}
                </div>

                <ThemeProvider value={WHITE_WITH_BLUE_BORDER}>
                  <ButtonPrimary
                    btnText="Quick Bid"
                    aria-label={`Place quick bid on ${vehicleDetails}`}
                  />
                </ThemeProvider>
              </div>
            </div>
          </article>
        </ErrorBoundary>
      </Profiler>
    );
  }
);

AuctionCard.displayName = "AuctionCard";
export default AuctionCard;
