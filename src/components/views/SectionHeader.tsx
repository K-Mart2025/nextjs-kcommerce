import { ProductFilters } from "@/types/query";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";
interface SectionHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  icon,
}) => {

  const filtersMap: { [key: string]: Partial<ProductFilters> } = {
    populares: { sortBy: "visits", sortDirection: "desc" },
    nuevo: { sortBy: "createdAt", sortDirection: "desc" },
    descuentos: { badge: "Descuento" },
  };
  const filters = useMemo(() => filtersMap[title.toLowerCase()] || {}, [title]);

  const toQueryString = (params: Record<string, any>) =>
    Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join("&");

  const queryString = toQueryString(filters);
  return (
    <div className="flex items-center justify-between mb-12">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl shadow-lg">
          {icon}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>
      </div>
      <Link
        href={`/product/section/?${queryString}`}
        //state={{ filters }}
        className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group transition-colors"
      >
        Más
        <ArrowRight
          size={18}
          className="group-hover:translate-x-1 transition-transform"
        />
      </Link>
    </div>
  );
};
