"use client";

import { CardSkeleton } from "@/components/CardSkeleton";
import PrettyText from "@/components/common/PrettyText";
import ProductCard from "@/components/common/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductsSection } from "@/hooks/useProductsSection";
import { Product } from "@/types/product";
import { useCallback, useRef } from "react";
import { ProductContainer } from "../../components/views/ProductContainer";
import { SectionContainer } from "../../components/views/SectionContainer";

const Sections = ({
  category,
  exclude,
  excludeTitle = false,
}: {
  category: string;
  exclude?: string;
  excludeTitle?: boolean;
}) => {
  const {
    isPending,
    isError,
    error,
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useProductsSection(category);

  const observerRef = useRef<IntersectionObserver>(null);
  const loaderRef = useCallback(
    (node: HTMLDivElement) => {
      if (isPending) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isPending, hasNextPage, isFetching, fetchNextPage]
  );

  // Process data after hooks
  const productList: Product[] =
    data?.pages?.flatMap((res) => res.products) ?? [];
  if (exclude) {
    const filteredProducts = productList.filter(
      (product) => product.id !== String(exclude)
    );
    productList.length = 0;
    productList.push(...filteredProducts);
  }
  // Render different states
  if (isPending && productList.length === 0) {
    return (
      <section className="py-12 max-w-7xl">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Skeleton className="overflow-hidden transition duration-300 bg-white rounded-lg shadow-md hover:shadow-lg" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-12 max-w-7xl">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <PrettyText>
            Error al cargar los productos: {error.message}
          </PrettyText>
        </div>
      </section>
    );
  }

  return (
    <>
      {productList.length > 0 ? (
        <SectionContainer text={excludeTitle ? "" : category}>
          <ProductContainer>
            {isPending ? (
              <div>
                <Skeleton className="overflow-hidden transition duration-300 bg-gray-400 rounded-lg shadow-md hover:shadow-lg" />
                <Skeleton className="overflow-hidden transition duration-300 bg-gray-400 rounded-lg shadow-md hover:shadow-lg" />
                <Skeleton className="overflow-hidden transition duration-300 bg-gray-400 rounded-lg shadow-md hover:shadow-lg" />
                <Skeleton className="overflow-hidden transition duration-300 bg-gray-400 rounded-lg shadow-md hover:shadow-lg" />
              </div>
            ) : (
              productList.map((product: Product) => (
                <ProductCard singleProduct={product} key={product.id} />
              ))
            )}
            {isFetching && (
              <div>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            )}
          </ProductContainer>
          <div ref={loaderRef}></div>
        </SectionContainer>
      ) : null}
    </>
  );
};

export default Sections;
