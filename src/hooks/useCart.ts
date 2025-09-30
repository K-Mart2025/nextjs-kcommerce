"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CartItems } from "../types/cart";
import { Product } from "../types/product";

export function useCart() {
  const queryClient = useQueryClient();

  const { data: cart } = useQuery<CartItems[]>({
    queryKey: ["cart"],
    queryFn: () => {
      const cartData = localStorage.getItem("cart");
      return cartData ? JSON.parse(cartData) : [];
    },
  });

  // Añadir o incrementar producto
  const { mutate: addToCart } = useMutation({
    mutationFn: async ({
      product,
      quantity = 1,
    }: {
      product: Product;
      quantity?: number;
    }) => {
      const currentCart = cart || [];
      const existingIndex = currentCart.findIndex(
        (item) => item.product.id === product.id
      );

      let updatedCart: CartItems[];
      if (existingIndex >= 0) {
        updatedCart = [...currentCart];
        updatedCart[existingIndex].quantity += quantity;
      } else {
        updatedCart = [...currentCart, { product, quantity }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(["cart"], updatedCart);
    },
  });

  // Actualizar cantidad específica
  const { mutate: updateQuantity } = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      const updatedCart = (cart || [])
        .map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0); // Eliminar si cantidad es 0

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(["cart"], updatedCart);
    },
  });

  // Eliminar producto
  const { mutate: removeFromCart } = useMutation({
    mutationFn: async (productId: string) => {
      const updatedCart = (cart || []).filter(
        (item) => item.product.id !== productId
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(["cart"], updatedCart);
    },
  });

  // Vaciar carrito
  const { mutate: clearCart } = useMutation({
    mutationFn: async () => {
      localStorage.removeItem("cart");
      return [];
    },
    onSuccess: () => {
      queryClient.setQueryData(["cart"], []);
    },
  });

  // Calcular totales
  const cartCount =
    cart?.reduce((total, item) => total + item.quantity, 0) || 0;
  const cartTotal =
    cart?.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ) || 0;

  return {
    cart: cart || [],
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
  };
}
