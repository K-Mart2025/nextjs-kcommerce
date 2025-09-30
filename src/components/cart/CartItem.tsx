"use client"

import { CartItems } from "@/types/cart";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { QuantitySelector } from "./QuantitySelector";
import { apiUrl } from "@/data/config";

interface CartItemProps {
  item: CartItems;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export const CartItem = ({
  item,
  onQuantityChange,
  onRemove,
}: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };
  return (
    <div className="flex flex-col items-center justify-between gap-4 p-4 border-b sm:flex-row">
      {/* Imagen del producto */}
      <div className="shrink-0">
        <Image
          loading="lazy"
          src={item.product.img? apiUrl + item.product.img: ""}
          alt={item.product.name}
          width={600}
          height={600}
          className="object-cover w-20 h-20 rounded"
        />
      </div>

      {/* Información del producto */}
      <div className="flex-1 text-center md:text-left truncate max-w-[200px]">
        <h3 className="text-lg font-medium text-gray-900 text-ellipsis">
          {item.product.name}
        </h3>
        <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
      </div>

      {/* Controles de cantidad y precio */}
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
        <QuantitySelector quantity={quantity} onChange={handleQuantityChange} />
        <p className="font-medium text-gray-900">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>

        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
