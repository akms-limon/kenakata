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
      <p className="mb-3 text-sm font-medium text-gray-900">
        Quantity
      </p>

      <div className="flex w-fit items-center rounded-lg border border-gray-300">
        <button
          type="button"
          onClick={() =>
            setQuantity((current) => Math.max(1, current - 1))
          }
          className="flex h-11 w-11 items-center justify-center hover:bg-gray-100"
        >
          <Minus size={16} />
        </button>

        <span className="flex h-11 w-12 items-center justify-center border-x border-gray-300 text-sm font-medium">
          {quantity}
        </span>

        <button
          type="button"
          onClick={() =>
            setQuantity((current) => current + 1)
          }
          className="flex h-11 w-11 items-center justify-center hover:bg-gray-100"
        >
          <Plus size={16} />
        </button>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-black px-6 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        <ShoppingCart size={18} />
        Add to Cart
      </button>
    </div>
  );
}