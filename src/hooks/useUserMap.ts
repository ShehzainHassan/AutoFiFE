import userAPI from "@/api/userAPI";
import { useQueries } from "@tanstack/react-query";

export const useUsersMap = (userIds: number[]) => {
  const queries = useQueries({
    queries: userIds.map((id) => ({
      queryKey: ["user", id],
      queryFn: () => userAPI.getUserById(id),
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);
  const error = queries.find((q) => q.error)?.error as Error | undefined;

  const userMap = new Map<number, string>();
  queries.forEach((q) => {
    if (q.data?.name) userMap.set(q.data.id, q.data.name);
  });

  return { userMap, isLoading, isError, error };
};
