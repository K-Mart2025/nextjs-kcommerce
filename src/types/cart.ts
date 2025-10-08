import { Product } from "./product";

interface CartItems {
  product: Product;
  quantity: number;
  weight: number
}

export type { CartItems };
