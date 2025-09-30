import NotFound from "@/app/not-found";
import { getSingleProduct } from "@/services/product";
import { memo } from "react";
import { ProductDetailsClient } from "./ProductDetailsClient";

interface PageProps {
  params: { productId: string }
}

const ProductDetailsComponent = async ({ params }: PageProps) => {
  const { productId } = params;

  const data = await getSingleProduct(productId);

  if (!data) {
    return <NotFound />
  }


  return (
    <ProductDetailsClient data={data} id={productId} />
  );
};

const ProductDetails = memo(ProductDetailsComponent);

export default ProductDetails
