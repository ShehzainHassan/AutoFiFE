"use client";
import auctionAPI from "@/api/auctionAPI";
import { useQuery } from "@tanstack/react-query";

const useGetAllAuctions = () => {
  return useQuery({
    queryKey: ["allAuctions"],
    queryFn: () => auctionAPI.getAllAuctions(),
  });
};

export default useGetAllAuctions;
