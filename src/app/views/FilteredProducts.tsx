"use client";

import { CardSkeleton } from "@/components/CardSkeleton";
import PrettyText from "@/components/common/PrettyText";
import { useDebounce } from "@/hooks/useDebounce";
import { useProductsFiltered } from "@/hooks/useProductsFiltered";
import { Product } from "@/types/product";
import { ProductFilters } from "@/types/query";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useRef } from "react";
import Card from "../../components/common/ProductCard";
import { ProductContainer } from "../../components/views/ProductContainer";
import { SectionContainer } from "../../components/views/SectionContainer";

interface FilteredProductsProps {
  filters?: ProductFilters;
}

const FilteredProducts: React.FC<FilteredProductsProps> = ({
  filters: propFilters,
}) => {
  const searchParams = useSearchParams();

  // Convert searchParams entries to ProductFilters object
  const queryFilters = useMemo<ProductFilters>(() => {
    const entries = Array.from(searchParams.entries());
    const obj: ProductFilters = {};
    entries.forEach(([key, value]) => {
      (obj as any)[key] = value;
    });
    return obj;
  }, [searchParams]);

  // Use filters from props if provided, otherwise from URL query
  const filters =
    propFilters && Object.keys(propFilters).length > 0
      ? propFilters
      : queryFilters ?? {};

  const debouncedName = useDebounce(filters.name, 1250);

  const {
    isPending,
    isError,
    error,
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useProductsFiltered({
    ...filters,
    name: debouncedName ? debouncedName : undefined,
  });

  const observerRef = useRef<IntersectionObserver>(null);
  const loaderRef = useCallback(
    (node: HTMLDivElement) => {
      if (isPending) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetching) {
            fetchNextPage();
          }
        },
        {
          threshold: 0.5, // Trigger when 50% of the element is visible
        }
      );

      if (node) observerRef.current.observe(node);
    },
    [isPending, hasNextPage, isFetching, fetchNextPage]
  );

  // Process data after hooks
  const productList: Product[] =
    data?.pages?.flatMap((res) => res.products) ?? [];

  // Render different states
  if (isPending) {
    return (
      <section className="py-12 max-w-7xl grow">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </section>
    );
  }

  if (!isPending && productList.length == 0) {
    return (
      <section className="py-12 max-w-7xl grow">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <PrettyText>No se encontraron Productos</PrettyText>
        </div>
      </section>
    );
  }
  if (isError) {
    return (
      <section className="py-12 max-w-7xl grow">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <PrettyText>
            Error al cargar los productos: {error.message}
          </PrettyText>
        </div>
      </section>
    );
  }

  return (
    <SectionContainer
      text={
        !isPending && !isError && productList.length == 0
          ? `Resultados para: ${filters}`
          : ""
      }
    >
      <ProductContainer>
        {productList.map((product: Product) => (
          <Card singleProduct={product} key={product.id} />
        ))}
        {isFetching && (
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        )}
      </ProductContainer>
      <div ref={loaderRef}></div>
    </SectionContainer>
  );
};

export default FilteredProducts;
