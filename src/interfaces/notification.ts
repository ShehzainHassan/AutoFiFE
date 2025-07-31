export interface NotificationItem {
  title: string;
  message: string;
  notificationType: number;
  isRead: boolean;
  createdAt: string;
  auctionId?: number;
}
export interface Notification {
  items: NotificationItem[];
  totalItems: number;
  page: number;
  pageSize: number;
}
