"use client"

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

export const QuantitySelector = ({
  quantity,
  onChange,
}: QuantitySelectorProps) => {
  const [fontSize, setFontSize] = useState("1.125rem");
  return (
    <div className={`flex items-center gap-2`}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 1}
        className="w-8 h-8"
      >
        <Minus className="w-4 h-4" />
      </Button>
      <input
        max={999}
        min={1}
        maxLength={3}
        type="number"
        className="w-8 min-w-8 text-center bg-transparent border-none outline-none
        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
        [&::-webkit-inner-spin-button]:appearance-none
        text-lg font-medium transition-all duration-100
        hover:text-base focus:text-base" // Se reduce el tamaño al interactuar
        style={{ fontSize }}
        value={quantity}
        onChange={(e) => {
          setFontSize(e.target.value.length > 2 ? "0.875rem" : "1.125rem");
          if (e.target.value === "") {
            if (quantity >= 2 && quantity <= 9) {
              onChange(1);
            }
            // don’t let it stay empty, so no else needed
          } else {
            const parsedValue = parseInt(e.target.value);

            // Disallow zero and enforce min of 1
            if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 999) {
              onChange(parsedValue);
            }
          }
        }}
      />
      <Button
        variant="outline"
        size="icon"
        onClick={() => onChange(quantity + 1)}
        disabled={quantity >= 999}
        className="w-8 h-8"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};
