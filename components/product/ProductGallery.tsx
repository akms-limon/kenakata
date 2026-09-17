"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import Image from "next/image";
import { Heart } from "lucide-react";
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
      <div className="relative flex h-[500px] items-center justify-center rounded-2xl bg-gray-100 p-8">
        <Image
          src={selectedImage}
          alt={product.title}
          width={800}
          height={800}
          className="h-full w-full object-contain"
        />

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            isLoved
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
        >
          <Heart
            size={22}
            className={
              isLoved
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
            }
          />
        </button>
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto">
        {product.images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedImage(image)}
            className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border bg-white p-2 ${
              selectedImage === image
                ? "border-black"
                : "border-gray-200"
            }`}
          >
            <Image
              src={image}
              alt={`${product.title} thumbnail`}
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}