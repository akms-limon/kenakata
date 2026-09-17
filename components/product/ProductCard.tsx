"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

import type { Product } from "@/types/product";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { useWishlist } from "@/components/wishlist/WishlistProvider";

type ProductCardProps = {
  product: Product;
};

const ACCENTS = [
  { bar: "#ff6a00", chip: "#fff1e6", text: "#c94e00" },
  { bar: "#0ea5a5", chip: "#e6f7f7", text: "#0a7373" },
  { bar: "#ff4470", chip: "#ffe8ee", text: "#c22452" },
  { bar: "#6c5ce7", chip: "#efecfd", text: "#4b3fb0" },
];

function accentFor(key: string) {
  let hash = 0;

  for (let i = 0; i < key.length; i++) {
    hash =
      key.charCodeAt(i) +
      ((hash << 5) - hash);
  }

  return ACCENTS[Math.abs(hash) % ACCENTS.length];
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const { toggleWishlist, isInWishlist } =
    useWishlist();

  const isLoved = isInWishlist(product.id);

  const accent = accentFor(
    product.category?.name || "General"
  );

  const image =
    product.images?.[0] ||
    "/images/product-placeholder.png";

  const title =
    product.title || "Untitled Product";

  return (
    <article className="group relative overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div
        className="h-[3px] w-full"
        style={{
          backgroundColor: accent.bar,
        }}
      />

      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1279px) 33vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>

        <button
          type="button"
          onClick={() =>
            toggleWishlist(product)
          }
          aria-label={
            isLoved
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200 hover:scale-110"
        >
          <Heart
            size={16}
            className={
              isLoved
                ? "fill-[#ff4470] text-[#ff4470]"
                : "text-gray-400"
            }
          />
        </button>
      </div>

      <div className="p-3">
        <span
          className="inline-block rounded px-2 py-0.5 text-[10px] font-semibold"
          style={{
            backgroundColor: accent.chip,
            color: accent.text,
          }}
        >
          {product.category?.name ||
            "Uncategorized"}
        </span>

        <Link
          href={`/products/${product.id}`}
        >
          <h2 className="mt-1.5 line-clamp-2 min-h-9 text-sm font-medium leading-[18px] text-gray-800 transition-colors duration-200 hover:text-gray-950">
            {title}
          </h2>
        </Link>

        <p className="mt-1 text-base font-bold text-[#ff6a00]">
          ${product.price}
        </p>

        <div className="mt-2.5 flex flex-col gap-1.5">
          <AddToCartButton product={product} />

          <Link
            href={`/products/${product.id}`}
            className="flex h-8 w-full items-center justify-center gap-1 rounded-md border border-gray-300 px-2 text-[11px] font-medium text-gray-700 transition-all duration-200 hover:border-[#ff6a00] hover:text-[#ff6a00]"
          >
            View Details
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </article>
  );
}