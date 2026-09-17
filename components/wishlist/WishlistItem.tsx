"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";

import type { Product } from "@/types/product";
import { useWishlist } from "@/components/wishlist/WishlistProvider";
import { useCart } from "@/components/cart/CartProvider";

type WishlistItemProps = {
  product: Product;
};

export default function WishlistItem({
  product,
}: WishlistItemProps) {
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-shadow duration-200 hover:shadow-sm sm:flex-row sm:items-center">
      <Link
        href={`/products/${product.id}`}
        className="shrink-0"
      >
        <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-gray-50">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="96px"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      <div className="min-w-0 flex-1">
        <Link href={`/products/${product.id}`}>
          <h2 className="line-clamp-2 text-sm font-semibold text-gray-900 transition-colors duration-200 hover:text-[#ff6a00]">
            {product.title}
          </h2>
        </Link>

        <p className="mt-1.5 text-xs text-gray-500">
          {product.category?.name || "Uncategorized"}
        </p>

        <p className="mt-2 text-base font-bold text-[#ff6a00]">
          ${product.price}
        </p>
      </div>

      <div className="flex shrink-0 flex-col gap-2 sm:w-36">
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-[#ff6a00] px-3 text-xs font-semibold text-white transition-all duration-200 hover:bg-[#e65f00] hover:shadow-sm active:scale-[0.98]"
        >
          <ShoppingCart size={14} />
          Add to Cart
        </button>

        <button
          type="button"
          onClick={() =>
            removeFromWishlist(product.id)
          }
          className="flex h-9 w-full items-center justify-center gap-1.5 rounded-md border border-gray-300 px-3 text-xs font-medium text-gray-600 transition-all duration-200 hover:border-[#ff4470] hover:text-[#ff4470] active:scale-[0.98]"
        >
          <Heart size={14} />
          Remove
        </button>
      </div>
    </article>
  );
}