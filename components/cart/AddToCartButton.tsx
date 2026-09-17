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
      className="flex h-8 w-full items-center justify-center gap-1 rounded-md bg-blue-50 px-2 !text-[14px] !leading-none font-medium text-[#0650ee] transition-all duration-200 hover:bg-blue-100 active:scale-[0.98]"
    >
      <ShoppingCart size={10} />
      Add to Cart
    </button>
  );
}