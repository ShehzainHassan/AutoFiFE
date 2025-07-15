"use client";
import auctionAPI from "@/api/auctionAPI";
import { useQuery } from "@tanstack/react-query";

const useUserWatchList = (id: number) => {
  return useQuery({
    queryKey: ["userWatchList", id],
    queryFn: () => auctionAPI.getUserWatchList(id),
    enabled: id > 0,
  });
};

export default useUserWatchList;
