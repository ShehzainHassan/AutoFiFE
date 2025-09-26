"use client";
import React, { Profiler, useState } from "react";
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
import QuickBidModal from "../../modals/quick-bid-modal/quick-bid-modal";
const ButtonPrimary = dynamic(() => import("../../buttons/button-primary"));
const Image = dynamic(() => import("next/image"));

const AuctionCard = React.memo(
  ({ auction, vehicleDetails, tag }: AuctionCardProps) => {
    const { totalSeconds, timerText, handleRedirect } = useAuctionCard(
      auction.auctionId,
      auction.endUtc
    );
    const [isQuickBidOpen, setQuickBidOpen] = useState(false);

    return (
      <Profiler id={`AuctionCard-${auction.auctionId}`} onRender={trackRender}>
        <ErrorBoundary fallback={<div>Failed to load auction card.</div>}>
          <article
            className={classes.container}
            tabIndex={0}
            role="group"
            aria-label={`Auction card for ${vehicleDetails}`}>
            {tag && totalSeconds > 0 && (
              <div className={classes.tag} role="status" aria-live="polite">
                <span className={classes.redDot} aria-hidden="true">
                  🔴
                </span>
                {tag}
              </div>
            )}

            <div
              role="button"
              className={classes.cardButton}
              aria-label={`View details for ${vehicleDetails}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleRedirect();
              }}>
              <div className={classes.imageWrapper}>
                <Image
                  onClick={handleRedirect}
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
                  {auction.currentPrice.toLocaleString()}
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

                {totalSeconds > 0 && (
                  <ThemeProvider value={WHITE_WITH_BLUE_BORDER}>
                    <ButtonPrimary
                      btnText="Quick Bid"
                      aria-label={`Place quick bid on ${vehicleDetails}`}
                      onClick={() => setQuickBidOpen(true)}
                    />
                  </ThemeProvider>
                )}
              </div>
            </div>
          </article>
          <QuickBidModal
            isOpen={isQuickBidOpen}
            onClose={() => setQuickBidOpen(false)}
            startingPrice={auction.startingPrice}
            currentBid={auction.currentPrice}
            auctionId={auction.auctionId}
          />
        </ErrorBoundary>
      </Profiler>
    );
  }
);

AuctionCard.displayName = "AuctionCard";
export default AuctionCard;
