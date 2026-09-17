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
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <Heart size={36} className="text-gray-500" />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Your Wishlist Is Empty
          </h1>

          <p className="mx-auto mt-3 max-w-md text-gray-600">
            You have not added any products to your wishlist yet.
            Find something you love and save it here.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          My Wishlist
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          {wishlistItems.length}{" "}
          {wishlistItems.length === 1 ? "product" : "products"}{" "}
          saved
        </p>
      </div>

      <div className="mt-8 space-y-4">
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