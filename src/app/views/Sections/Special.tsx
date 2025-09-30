"use client"

import PrettyText from "@/components/common/PrettyText";
import { useProductsFiltered } from "@/hooks/useProductsFiltered";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { SpecialSection } from "./SpecialSection";

const renderSection = (query: any, title: string, subtitle: string) => {
  if (query.isLoading) return <PrettyText>Cargando {title.toLowerCase()}...</PrettyText>;
  if (query.isError) return <PrettyText>Error al cargar {title.toLowerCase()}.</PrettyText>;

  const allProducts = query.data?.pages.flatMap((page: { products: Product[] }) => page.products) ?? [];

  if (allProducts.length) {
    return <SpecialSection title={title} subtitle={subtitle} data={allProducts} />;
  }

  return null;
};

export const Special = () => {
  const popQuery = useProductsFiltered({ sortBy: "visits", sortDirection: "desc" });
  const newQuery = useProductsFiltered({ sortBy: "createdAt", sortDirection: "desc" });
  const discQuery = useProductsFiltered({ badge: "Descuento" });
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) { return null }

  const isLoading = popQuery.isLoading || newQuery.isLoading || discQuery.isLoading;
  const noProducts =
    !(popQuery.data?.pages.flatMap((page: any) => page.products).length) &&
    !(newQuery.data?.pages.flatMap((page: any) => page.products).length) &&
    !(discQuery.data?.pages.flatMap((page: any) => page.products).length);

  return (
    <div className="pt-20">
      {renderSection(popQuery, "Populares", "Los productos más vistos")}
      {renderSection(newQuery, "Nuevo", "Recién estibados!")}
      {renderSection(discQuery, "Descuentos", "Ofertas por tiempo limitado!")}

      {!isLoading && noProducts && <PrettyText>No hay productos para mostrar en estas secciones.</PrettyText>}
    </div>
  );
};
