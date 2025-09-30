import { Product } from "./product";

interface ApiResponse {
  result: Product[];
  nextCursor: string | number;
  hasMore: boolean;
}

interface QueryResult {
  products: Product[];
  nextCursor: number;
  hasMore: boolean;
}

interface ProductFilters {
  name?: string;            // para filtrar por nombre (aparece mapeado como category en params, quizá es un error)
  category?: string;        // filtro por categoría
  price?: number;           // filtro por precio
  prevPrice?: number;       // filtro por precio previo
  badge?: string;           // filtro por badge o etiqueta
  sortBy?: string;          // campo para ordenar
  sortDirection?: "asc" | "desc";  // dirección del ordenamiento
}

type CategoryResponse = string[];

export type { ApiResponse, QueryResult, CategoryResponse, ProductFilters };
