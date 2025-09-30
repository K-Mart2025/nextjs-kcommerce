"use client"

import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductsFiltered } from "../services/query";
import { ProductFilters } from "../types/query";

export const useProductsFiltered = (filters: Partial<ProductFilters>) => {
  return useInfiniteQuery({
    queryKey: ["query", filters],
    queryFn: getProductsFiltered,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
  });
};
