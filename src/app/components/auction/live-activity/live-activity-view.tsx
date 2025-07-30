"use client";

import { useState, useMemo } from "react";
import { DropdownFilter } from "@/app/components";
import CarImage from "../../result-card/car-image/car-image";
import VehicleAuctionInfo from "./vehicle-auction-info";
import { LiveActivityViewProps } from "./live-activity.types";
import classes from "./live-activity.module.css";
import headings from "@/styles/typography.module.css";
import useGetAuctionByFilters from "@/hooks/useGetAuctionsByFilters";
import { priceOptions } from "@/constants/auction";
import { sortOptions } from "@/utilities/utilities";

export default function LiveActivityView({
  auctions,
  onAuctionClick,
}: LiveActivityViewProps) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [selectedPriceOption, setSelectedPriceOption] = useState<string | null>(
    "Any"
  );
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(
    "Any"
  );
  const statusOptions = useMemo(() => {
    const unique = Array.from(new Set(auctions.map((a) => a.status)));
    return ["Any", ...unique];
  }, [auctions]);

  const makeOptions = useMemo(() => {
    const unique = Array.from(new Set(auctions.map((a) => a.vehicle.make)));
    return ["Any", ...unique];
  }, [auctions]);
  const selectedPrice = useMemo(() => {
    return priceOptions.find((opt) => opt.label === selectedPriceOption);
  }, [selectedPriceOption]);

  const selectedSort = useMemo(() => {
    return sortOptions.find((opt) => opt.label === selectedSortOption);
  }, [selectedSortOption]);

  const filters = {
    status: selectedStatus === "Any" ? undefined : selectedStatus ?? undefined,
    make: selectedMake === "Any" ? undefined : selectedMake ?? undefined,
    minPrice: selectedPrice?.min,
    maxPrice: selectedPrice?.max,
    ...(selectedSort?.sortBy ? { sortBy: selectedSort.sortBy } : {}),
    ...(selectedSort?.descending !== undefined
      ? { descending: selectedSort.descending }
      : {}),
  };

  const {
    data: filteredAuctions = [],
    isLoading,
    isError,
    error,
  } = useGetAuctionByFilters(filters);

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <h1 className={headings.vehiclePrice}>🔨 Live Car Auctions</h1>
        <p className={`${headings.auctionCardTimer} ${classes.blue}`}>
          Bid on premium vehicles from trusted dealers
        </p>
      </div>

      <div className={classes.filterContainer}>
        <DropdownFilter
          filter="Status"
          selected={selectedStatus}
          options={statusOptions}
          onSelect={setSelectedStatus}
        />
        <DropdownFilter
          filter="Make"
          selected={selectedMake}
          options={makeOptions}
          onSelect={setSelectedMake}
        />
        <DropdownFilter
          filter="Price"
          selected={selectedPriceOption}
          options={priceOptions.map((opt) => opt.label)}
          onSelect={setSelectedPriceOption}
        />
        <DropdownFilter
          filter="Sort By"
          selected={selectedSortOption}
          options={sortOptions.map((opt) => opt.label)}
          onSelect={setSelectedSortOption}
        />
      </div>

      <div className={classes.auctionContainer}>
        {isLoading ? (
          <p>Loading auctions...</p>
        ) : isError ? (
          <p>Error loading auctions: {(error as Error).message}</p>
        ) : filteredAuctions.length === 0 ? (
          <p>No auctions found.</p>
        ) : (
          filteredAuctions.map((auction) => (
            <div key={auction.auctionId} className={classes.cardWrapper}>
              <CarImage
                status={auction.status}
                onClick={() => onAuctionClick(auction.auctionId)}
                className={classes.fixedHeight}
              />
              <VehicleAuctionInfo
                vehicleName={`${auction.vehicle.year} ${auction.vehicle.make} ${auction.vehicle.model}`}
                currentBid={auction.currentPrice}
                bidCount={auction.bids.length ?? 0}
                timeLeft={auction.endUtc}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
