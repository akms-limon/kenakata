"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useState } from "react";

import type { Product } from "@/types/product";
import { useWishlist } from "@/components/wishlist/WishlistProvider";

type ProductGalleryProps = {
  product: Product;
};

export default function ProductGallery({
  product,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(
    product.images[0]
  );

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const isLoved = isInWishlist(product.id);

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
        <div className="relative aspect-square w-full">
          <Image
            src={selectedImage}
            alt={product.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-8 transition-transform duration-500"
            priority
          />
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            isLoved
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:scale-105 hover:border-[#ff4470]"
        >
          <Heart
            size={19}
            className={
              isLoved
                ? "fill-[#ff4470] text-[#ff4470]"
                : "text-gray-500"
            }
          />
        </button>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {product.images.map((image, index) => {
          const isSelected = selectedImage === image;

          return (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(image)}
              aria-label={`View image ${index + 1}`}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-white p-1 transition-all duration-200 ${
                isSelected
                  ? "border-[#ff6a00] ring-1 ring-[#ff6a00]"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={image}
                alt={`${product.title} thumbnail ${index + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}