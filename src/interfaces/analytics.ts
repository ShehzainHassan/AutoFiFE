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
  commissionEarned: number;
  averageSalePrice: number;
  successfulPaymentsPercentage: number;
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
