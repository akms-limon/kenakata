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
    <article className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
      <Link
        href={`/products/${product.id}`}
        className="shrink-0"
      >
        <div className="relative h-28 w-28 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>
      </Link>

      <div className="min-w-0 flex-1">
        <Link href={`/products/${product.id}`}>
          <h2 className="line-clamp-2 text-lg font-semibold text-gray-900 transition hover:text-gray-600">
            {product.title}
          </h2>
        </Link>

        <p className="mt-2 text-sm text-gray-500">
          {product.category.name}
        </p>

        <p className="mt-2 text-lg font-bold text-gray-900">
          ${product.price}
        </p>
      </div>

      <div className="flex shrink-0 flex-col gap-2 sm:w-40">
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <ShoppingCart size={17} />
          Add to Cart
        </button>

        <button
          type="button"
          onClick={() => removeFromWishlist(product.id)}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <Heart size={17} />
          Remove
        </button>
      </div>
    </article>
  );
}