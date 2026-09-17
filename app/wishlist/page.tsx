"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import WishlistItem from "@/components/wishlist/WishlistItem";
import { useWishlist } from "@/components/wishlist/WishlistProvider";

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-16">
        <div className="w-full rounded-xl border border-gray-200 bg-white p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1e6]">
            <Heart
              size={30}
              className="text-[#ff4470]"
            />
          </div>

          <h1 className="mt-5 text-2xl font-bold tracking-tight text-gray-900">
            Your Wishlist Is Empty
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            Save products you love and come back to them
            anytime.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex rounded-md bg-[#ff6a00] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#e65f00] hover:shadow-md active:scale-[0.98]"
          >
            Explore Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-end justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Heart
              size={21}
              className="text-[#ff4470]"
            />

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              My Wishlist
            </h1>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1
              ? "product"
              : "products"}{" "}
            saved for later
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {wishlistItems.map((product) => (
          <WishlistItem
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}