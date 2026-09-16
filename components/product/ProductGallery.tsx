"use client";

import { useState } from "react";
import type { Product } from "@/types/product";

type ProductGalleryProps = {
  product: Product;
};

export default function ProductGallery({
  product,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(
    product.images[0]
  );

  return (
    <div>
      <div className="flex h-[500px] items-center justify-center rounded-2xl bg-gray-100 p-8">
        <img
          src={selectedImage}
          alt={product.title}
          className="h-full w-full object-contain"
        />
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
            <img
              src={image}
              alt={`${product.title} ${index + 1}`}
              className="h-full w-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}