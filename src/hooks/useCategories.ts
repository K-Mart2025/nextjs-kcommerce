"use client"

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/product";

export const useCategories = () => {
  return useQuery({
queryKey: ["categories"],
    queryFn: () => getCategories("true"),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
  });
};
