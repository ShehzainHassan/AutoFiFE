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
export interface AuctionTableData {
  auctionId: number;
  vehicleName: string;
  views: number;
  bidders: number;
  bids: number;
  finalPrice: number;
  status: string;
}
export interface UserTableData {
  userName: number;
  registrationDate: string;
  lastActive: number;
  totalBids: number;
  totalWins: number;
}
