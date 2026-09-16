"use client";

import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/components/cart/CartProvider";

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => addToCart(product)}
      className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
    >
      <ShoppingCart size={18} />
      Add to Cart
    </button>
  );
}