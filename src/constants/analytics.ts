import {
  AuctionTableData,
  ErrorLogItem,
  RecentDownloadsItem,
  reportTypeOptions,
  RevenueTableData,
  UserTableData,
} from "@/interfaces/analytics";

import AuctionReport from "@/assets/images/general/auction-report.png";
import DashboardSummary from "@/assets/images/general/dashboard-summary.png";
import RevenueReport from "@/assets/images/general/revenue-report.png";
import UserReport from "@/assets/images/general/user-report.png";

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

export const apiPeriodOptions = [
  { label: "All Time", value: "AllTime" },
  { label: "Last 6 Hours", value: "Last6Hours" },
  { label: "Last 12 Hours", value: "Last12Hours" },
  { label: "Last 24 Hours", value: "Last24Hours" },
  { label: "Last 2 Days", value: "Last2Days" },
  { label: "Last Week", value: "LastWeek" },
  { label: "Last Month", value: "LastMonth" },
  { label: "Last Quarter", value: "LastQuarter" },
  { label: "Last Year", value: "LastYear" },
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
export const errorLogsTableColumns: {
  key: keyof ErrorLogItem;
  label: string;
}[] = [
  { key: "timestamp", label: "Timestamp" },

  { key: "errorCode", label: "Error Code" },
  { key: "message", label: "Message" },
];

export const reportTypeData = [
  {
    imageSrc: DashboardSummary,
    title: "Dashboard Summary",
    description:
      "High level overview of key metrics and trends across all auctions.",
    value: reportTypeOptions[0].value,
  },
  {
    imageSrc: AuctionReport,
    title: "Auction Report",
    description:
      "Detailed information about individual auctions, including bids, participants, and outcomes.",
    value: reportTypeOptions[1].value,
  },
  {
    imageSrc: UserReport,
    title: "User Report",
    description:
      "Insights into user activity, engagement, and performance within the platform.",
    value: reportTypeOptions[2].value,
  },
  {
    imageSrc: RevenueReport,
    title: "Revenue Report",
    description:
      "Analysis of revenue generated from auctions, including fees, commissions, and other sources.",
    value: reportTypeOptions[3].value,
  },
];
