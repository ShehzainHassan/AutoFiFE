import { VehicleAuctionData } from "@/interfaces/auction";
export const dropdownFilters = ["Status", "Make", "Price", "Sort"];
export const mockVehicleData: VehicleAuctionData[] = [
  {
    vehicleName: "2020 BMW 328i Sports Package",
    currentBid: 25000,
    bidCount: 12,
    timeLeft: "2d 12h",
  },
  {
    vehicleName: "2019 Audi A4 Premium",
    currentBid: 23000,
    bidCount: 9,
    timeLeft: "1d 4h",
  },
  {
    vehicleName: "2020 Audi A4 Premium",
    currentBid: 42000,
    bidCount: 20,
    timeLeft: "3d 2h",
  },
  {
    vehicleName: "2023 Toyota Camry",
    currentBid: 42000,
    bidCount: 20,
    timeLeft: "3d 2h",
  },
  {
    vehicleName: "2020 Kia Forte",
    currentBid: 42000,
    bidCount: 20,
    timeLeft: "3d 2h",
  },
  {
    vehicleName: "2024 Audi A4",
    currentBid: 42000,
    bidCount: 20,
    timeLeft: "3d 2h",
  },
  {
    vehicleName: "2022 Tesla Model 3",
    currentBid: 42000,
    bidCount: 20,
    timeLeft: "3d 2h",
  },
  {
    vehicleName: "2023 Tesla Model 3",
    currentBid: 42000,
    bidCount: 20,
    timeLeft: "3d 2h",
  },
  {
    vehicleName: "2024 Tesla Model 3",
    currentBid: 42000,
    bidCount: 20,
    timeLeft: "3d 2h",
  },
  {
    vehicleName: "2025 Bentley Arnage",
    currentBid: 42000,
    bidCount: 20,
    timeLeft: "3d 2h",
  },
];
export const BidStrategyOptions = [
  { label: "Conservative", value: "Conservative" },
  { label: "Aggressive", value: "Aggressive" },
  { label: "Incremental", value: "Incremental" },
];

export const TimingPreferenceOptions = [
  { label: "Immediate", value: "Immediate" },
  { label: "Last Minute", value: "LastMinute" },
  { label: "Spread", value: "SpreadEvenly" },
];

export const bidDelayOptions = [
  { label: "5 seconds", value: "5" },
  { label: "10 seconds", value: "10" },
  { label: "20 seconds", value: "20" },
  { label: "30 seconds", value: "30" },
  { label: "60 seconds", value: "60" },
];
export const totalBidsOptions = [
  { label: "5", value: "5" },
  { label: "10", value: "10" },
  { label: "15", value: "15" },
  { label: "20", value: "20" },
  { label: "30", value: "30" },
  { label: "40", value: "40" },
  { label: "50", value: "50" },
  { label: "60", value: "60" },
];

export const priceOptions = [
  { label: "Any", min: undefined, max: undefined },
  { label: "No Current Bids", min: 0, max: 0 },
  { label: "Bids < 1,000", max: 1000 },
  { label: "Bids < 5,000", max: 5000 },
  { label: "Bids < 10,000", max: 10000 },
  { label: "Bids > 1,000", min: 1000 },
  { label: "Bids > 5,000", min: 5000 },
  { label: "Bids between 1,000 - 5,000", min: 1000, max: 5000 },
  { label: "Bids between 5,000 - 10,000", min: 5000, max: 10000 },
  { label: "Bids between 10,000 - 20,000", min: 10000, max: 20000 },
];
