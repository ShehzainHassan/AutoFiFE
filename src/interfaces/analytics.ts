export interface AuctionAnalyticsResult {
  totalAuctions: number;
  successRate: number;
  averageViews: number;
  averageBids: number;
  averageFinalPrice: number;
}
export interface UserAnalyticsResult {
  totalUsers: number;
  activeUsers: number;
  newRegistrations: number;
  retentionRate: number;
  engagementScore: number;
}
export interface RevenueAnalyticsResult {
  totalRevenue: number;
  totalRevenueChange: number;
  commissionEarned: number;
  commissionEarnedChange: number;
  averageSalePrice: number;
  averageSalePriceChange: number;
  successfulPaymentsPercentage: number;
  successfulPaymentsPercentageChange: number;
}

export interface SystemAnalyticsResult {
  averageApiResponseTime: number;
  averageApiResponseTimeChange: number;
  errorRate: number;
  errorRateChange: number;
  activeSessions: number;
  activeSessionsChange: number;
  systemUptime: number;
}
export interface AuctionTableData {
  auctionId: number;
  vehicleName: string;
  vehicleCategory: string;
  views: number;
  bidders: number;
  bids: number;
  finalPrice: number;
  status: string;
}
export interface AuctionTableWithPercentage {
  currentPeriodData: AuctionTableData[];
  percentageChange: number;
}

export interface RevenueTableData {
  auctionId: number;
  scheduledStartTime: string;
  vehicle: string;
  buyer: string;
  revenue: number;
  commission: number;
}
export interface UserTableData {
  userName: number;
  registrationDate: string;
  lastActive: number;
  totalBids: number;
  totalWins: number;
}
export interface ReportTypeOption {
  label: string;
  value: string;
}

export const reportTypeOptions: ReportTypeOption[] = [
  { label: "Dashboard Summary", value: "DashboardSummary" },
  { label: "Auction Report", value: "AuctionReport" },
  { label: "User Report", value: "UserReport" },
  { label: "Revenue Report", value: "RevenueReport" },
];

export interface RecentDownloadsItem {
  reportType: string;
  dateRange: string;
  format: string;
  downloadedAt: string;
  downloadAction?: string;
}
export interface RecentDownloads {
  items: RecentDownloadsItem[];
  totalItems: number;
  page: number;
  pageSize: number;
}

export interface ErrorLogItem {
  id: number;
  errorCode: string;
  message: string;
  timestamp: string;
}

export interface ErrorLogs {
  items: ErrorLogItem[];
  totalItems: number;
  page: number;
  pageSize: number;
}
export interface APIGraphAnalyticsItem {
  timeLabel: string;
  avgResponseTimeMs: number;
}
