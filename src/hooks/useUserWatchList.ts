"use client";
import auctionAPI from "@/api/auctionAPI";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUserWatchList = (enabled: boolean) => {
  return useQuery({
    queryKey: ["userWatchList"],
    queryFn: async () => {
      try {
        const res = await auctionAPI.getUserWatchList();
        return res;
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          return [];
        }
        throw err;
      }
    },
    enabled,
  });
};

export default useUserWatchList;

// const useUserWatchList = (enabled: boolean) => {
//   return useQuery({
//     queryKey: ["userWatchList"],
//     queryFn: async () => {
//       try {
//         const res = await auctionAPI.getUserWatchList();
//         return res;
//       } catch (err: any) {
//         // If unauthorized, just return empty array
//         if (err.response?.status === 401) {
//           return []; // don’t throw, just return harmless result
//         }
//         throw err; // any other error, still let React Query handle it
//       }
//     },
//     enabled,
//   });
// };
