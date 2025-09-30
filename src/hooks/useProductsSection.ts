"use client"

import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product";

export const useProductsSection = (category: string) => {
  return useInfiniteQuery({
    queryKey: ["products", category],
    queryFn: getProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
  });
}