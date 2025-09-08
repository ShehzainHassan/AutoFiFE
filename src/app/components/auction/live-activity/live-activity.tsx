"use client";

import { DropdownFilter } from "@/app/components";
import { priceOptions } from "@/constants/auction";
import useGetAllAuctions from "@/hooks/useGetAllAuctions";
import useGetAuctionByFilters from "@/hooks/useGetAuctionsByFilters";
import { AuctionFilters } from "@/interfaces/auction";
import headings from "@/styles/typography.module.css";
import { sortOptions } from "@/utilities/utilities";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import CarImage from "../../result-card/car-image/car-image";
import classes from "./live-activity.module.css";
import VehicleAuctionInfo from "./vehicle-auction-info";

export default function LiveActivityView() {
  const router = useRouter();

  const [selectedStatus, setSelectedStatus] = useState<string | null>("Any");
  const [selectedMake, setSelectedMake] = useState<string | null>("Any");
  const [selectedPriceOption, setSelectedPriceOption] = useState<string | null>(
    "Any"
  );
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(
    "Any"
  );

  const { data: vehicleAuctionData = [] } = useGetAllAuctions();

  const statusOptions = useMemo(() => {
    const unique = Array.from(
      new Set(vehicleAuctionData.map((a) => a?.status).filter(Boolean))
    );
    return ["Any", ...unique];
  }, [vehicleAuctionData]);

  const makeOptions = useMemo(() => {
    const unique = Array.from(
      new Set(vehicleAuctionData.map((a) => a?.vehicle?.make).filter(Boolean))
    );
    return ["Any", ...unique];
  }, [vehicleAuctionData]);

  const selectedPrice = useMemo(() => {
    return priceOptions.find((opt) => opt.label === selectedPriceOption);
  }, [selectedPriceOption]);

  const selectedSort = useMemo(() => {
    return sortOptions.find((opt) => opt.label === selectedSortOption);
  }, [selectedSortOption]);

  const filters: AuctionFilters = {
    status:
      selectedStatus && selectedStatus !== "Any" ? selectedStatus : undefined,
    make: selectedMake && selectedMake !== "Any" ? selectedMake : undefined,
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
    error: filteredError,
  } = useGetAuctionByFilters(filters);

  const redirectToAuctionDetails = (auctionId: number) => {
    router.push(`/auction/${auctionId}`);
  };

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
          <p role="status" aria-live="polite">
            Loading auctions...
          </p>
        ) : isError ? (
          <p role="alert" aria-live="assertive">
            Error loading auctions: {(filteredError as Error)?.message}
          </p>
        ) : filteredAuctions.length === 0 ? (
          <p>No auctions found.</p>
        ) : (
          filteredAuctions.map((auction) => {
            const vehicle = auction?.vehicle;
            if (!vehicle) return null;

            return (
              <div key={auction.auctionId} className={classes.cardWrapper}>
                <CarImage
                  status={auction.status}
                  onClick={() => redirectToAuctionDetails(auction.auctionId)}
                  className={classes.fixedHeight}
                />
                <VehicleAuctionInfo
                  vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  currentBid={auction.currentPrice}
                  bidCount={auction.bids?.length ?? 0}
                  timeLeft={auction.endUtc}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
