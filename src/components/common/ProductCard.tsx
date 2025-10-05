"use client"

import { apiUrl } from "@/data/config";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types/product";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const Card = ({
  singleProduct: singleProduct,
}: {
  singleProduct: Product;
}) => {
  const { addToCart, removeFromCart, cart } = useCart();
  const [used, setUsed] = useState(
    cart.find((product) => product.product.id === singleProduct.id)
      ? true
      : false
  );
  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    addToCart({ product: singleProduct, quantity: 1 });
    setUsed(!used);
  };
  const handleRemoveFromCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    removeFromCart(singleProduct.id);
    setUsed(!used);
  };
  useEffect(() => {
    const isProductInCart = cart.some(
      (product) => product.product.id === singleProduct.id
    );
    setUsed(isProductInCart);
  }, [cart, singleProduct.id]);

  return (
    <div
      data-product-card
      data-product-id={singleProduct.id}
      className="relative hover:scale-105 overflow-hidden transition duration-300 bg-white rounded-lg shadow-md hover:shadow-lg cardAnimation">
      <Link
        href={`/product/${singleProduct.id}`}
        className="block"
      >
        <div className="relative w-full h-48">
          <Image
            width={200}
            height={200}
            loading="lazy"
            src={singleProduct.thumb ? apiUrl + singleProduct.thumb : ""}
            alt={singleProduct.name}
            className="object-cover w-full h-full"
          />
          {singleProduct.badge && singleProduct.badge !== " " && (
            <Badge className="absolute text-white bg-blue-600 bottom-4 right-4">
              {singleProduct.badge}
            </Badge>
          )}
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {singleProduct.name}
          </h3>
          <p className="mb-2 text-gray-600 text-ellipsis">
            {singleProduct.subtitle}
          </p>
          <p className="font-bold text-blue-600 text-ellipsis">
            ${singleProduct.price}
          </p>
        </div>
      </Link>
      {/* Add to Cart Button */}
      {!used ? (
        <Button
          variant={"default"}
          onClick={handleAddToCart}
          className="absolute flex items-center justify-center w-10 h-10 text-white transition duration-300 bg-blue-600 rounded-full z-10 bottom-3 right-3 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
        </Button>
      ) : (
        <Button
          variant={"outline"}
          onClick={handleRemoveFromCart}
          className="absolute flex items-center justify-center w-10 h-10 text-white transition duration-300 border-blue-600 rounded-full z-10 bottom-3 right-3"
        >
          <X color="blue" className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

const ProductCard = memo(Card);
export default ProductCard
