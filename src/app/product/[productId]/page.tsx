import NotFound from "@/app/not-found";
import { getSingleProduct } from "@/services/product";
import { detectDeviceType, trackVisit } from "@/services/trackVisit";
import { headers } from "next/headers";
import { memo } from "react";
import { ProductDetailsClient } from "./ProductDetailsClient";

interface PageProps {
  params: { productId: string }
}

const ProductDetailsComponent = async ({ params }: PageProps) => {
  const { productId } = await params;

  const headersList = await headers();
  const host = headersList.get('host');
  const userAgent = headersList.get('user-agent') || '';

  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  const deviceType = detectDeviceType(userAgent);
  const page = `${protocol}://${host}/product/${productId}`
  await trackVisit(page, deviceType)

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
