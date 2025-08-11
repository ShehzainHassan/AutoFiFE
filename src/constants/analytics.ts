import {
  AuctionTableData,
  RecentDownloadsItem,
  RevenueTableData,
  UserTableData,
} from "@/interfaces/analytics";

export const auctionTableColumns: {
  key: keyof AuctionTableData;
  label: string;
}[] = [
  { key: "auctionId", label: "Auction ID" },
  { key: "vehicleName", label: "Vehicle" },
  { key: "views", label: "Views" },
  { key: "bidders", label: "Bidders" },
  { key: "bids", label: "Bids" },
  { key: "finalPrice", label: "Final Price" },
  { key: "status", label: "Status" },
];
export const periodOptions = [
  { label: "All Time", value: "AllTime" },
  { label: "Last 7 Days", value: "Last7Days" },
  { label: "Last 2 Weeks", value: "Last2Weeks" },
  { label: "Last Month", value: "LastMonth" },
  { label: "Last Quarter", value: "LastQuarter" },
  { label: "Last 12 Months", value: "Last12Months" },
];

export const revenueTableColumns: {
  key: keyof RevenueTableData;
  label: string;
}[] = [
  { key: "scheduledStartTime", label: "Date" },
  { key: "auctionId", label: "Auction ID" },
  { key: "vehicle", label: "Vehicle" },
  { key: "buyer", label: "Buyer" },
  { key: "revenue", label: "Revenue" },
  { key: "commission", label: "Commission" },
];

export const recentDownloadsTableColumns: {
  key: keyof RecentDownloadsItem;
  label: string;
}[] = [
  { key: "reportType", label: "Report Type" },
  { key: "dateRange", label: "Date Range" },
  { key: "format", label: "Format" },
  { key: "downloadedAt", label: "Date Downloaded" },
  { key: "downloadAction", label: "" },
];
export const userTableColumns: {
  key: keyof UserTableData;
  label: string;
}[] = [
  { key: "userName", label: "User Name" },
  { key: "registrationDate", label: "Registration Date" },
  { key: "lastActive", label: "Last Active" },
  { key: "totalBids", label: "Total Bids" },
  { key: "totalWins", label: "Total Wins" },
];
