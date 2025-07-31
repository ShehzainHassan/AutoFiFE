"use client";
import {
  useMutation,
  useQueryClient,
  InfiniteData,
} from "@tanstack/react-query";
import notificationAPI from "@/api/notificationAPI";
import { Notification } from "@/interfaces/notification";

const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Notification,
    Error,
    number,
    { previousData?: InfiniteData<Notification> }
  >({
    mutationFn: async (id: number) => {
      return await notificationAPI.markAsRead(id);
    },

    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: ["userNotifications"] });

      const previousData = queryClient.getQueryData<InfiniteData<Notification>>(
        ["userNotifications"]
      );

      if (previousData) {
        const updatedPages = previousData.pages.map((page) => {
          const updatedItems = page.items.map((item) =>
            item.id === notificationId ? { ...item, isRead: true } : item
          );
          return { ...page, items: updatedItems };
        });

        queryClient.setQueryData<InfiniteData<Notification>>(
          ["userNotifications"],
          {
            ...previousData,
            pages: updatedPages,
          }
        );
      }

      return { previousData };
    },

    onError: (_error, _notificationId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["userNotifications"], context.previousData);
      }
    },

    onSuccess: (_data, notificationId) => {
      queryClient.invalidateQueries({
        queryKey: ["notificationById", notificationId],
      });
      queryClient.invalidateQueries({
        queryKey: ["unread-count"],
      });
    },
  });
};

export default useMarkAsRead;
