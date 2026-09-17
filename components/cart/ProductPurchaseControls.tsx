"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";

import type { Product } from "@/types/product";
import { useCart } from "@/components/cart/CartProvider";

type ProductPurchaseControlsProps = {
  product: Product;
};

export default function ProductPurchaseControls({
  product,
}: ProductPurchaseControlsProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  }

  return (
    <div className="mt-8">
      <p className="mb-3 text-sm font-semibold text-gray-900">
        Quantity
      </p>

      <div className="flex w-fit items-center overflow-hidden rounded-md border border-gray-300 bg-white">
        <button
          type="button"
          onClick={() =>
            setQuantity((current) =>
              Math.max(1, current - 1)
            )
          }
          aria-label="Decrease quantity"
          className="flex h-10 w-10 items-center justify-center text-gray-600 transition-colors hover:bg-[#fff1e6] hover:text-[#ff6a00]"
        >
          <Minus size={15} />
        </button>

        <span className="flex h-10 w-12 items-center justify-center border-x border-gray-300 text-sm font-semibold text-gray-900">
          {quantity}
        </span>

        <button
          type="button"
          onClick={() =>
            setQuantity((current) => current + 1)
          }
          aria-label="Increase quantity"
          className="flex h-10 w-10 items-center justify-center text-gray-600 transition-colors hover:bg-[#fff1e6] hover:text-[#ff6a00]"
        >
          <Plus size={15} />
        </button>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-[#ff6a00] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#e65f00] hover:shadow-md active:scale-[0.99]"
      >
        <ShoppingCart size={17} />
        Add to Cart
      </button>
    </div>
  );
}