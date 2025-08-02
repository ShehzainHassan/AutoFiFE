import { NotificationItem } from "@/interfaces/notification";

export type UserNotificationsProps = {
  notifications: NotificationItem[];
  markAsRead: (id: number) => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};
