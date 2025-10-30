import { apiUrl } from "@/data/config";
import { QueryFunction } from "@tanstack/react-query";
import { ApiResponse, CategoryResponse, QueryResult } from "../types/query";

export const getProducts: QueryFunction<
  QueryResult,
  ["products", string],
  number
> = async ({ pageParam, queryKey }) => {
  const [, category] = queryKey;
  const response = await fetch(
    `${apiUrl}/products/client/?page=${pageParam}&category=${category}`
  );

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  const data: ApiResponse = await response.json();
  return {
    products: data.result,
    nextCursor: Number(data.nextCursor),
    hasMore: data.hasMore,
  };
};

// Get unique product
export const getSingleProduct = async (productId: string) => {
  try {
    const response = await fetch(`${apiUrl}/products/client/${productId}`);
    if (!response.ok) throw new Error("Request failed");
    const data = await response.json();
    return data.result || "";
  } catch (error) {
    console.error("Error fetching image:", error);
    return "";
  }
};

export const getCategories = async (
  category = "false"
): Promise<Array<string>> => {
  try {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(
      `${apiURL}/products/client/?requireCategories=${category}`
    );
    if (!response.ok) throw new Error("Failed to fetch categories");
    const data = await response.json();
    const result: CategoryResponse = data.result;
    return result || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

