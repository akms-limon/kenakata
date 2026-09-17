"use client";

import { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

type FeaturedProductsProps = {
  products: Product[];
};

export default function FeaturedProducts({
  products,
}: FeaturedProductsProps) {
  const [visibleCount, setVisibleCount] = useState(10);

  const visibleProducts = products.slice(0, visibleCount);

  const hasMoreProducts = visibleCount < products.length;

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {hasMoreProducts && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((count) => count + 10)
            }
            className="rounded-md border border-gray-300 px-5 py-2 text-xs font-medium text-gray-800 transition-all duration-200 hover:border-[#ff6a00] hover:text-[#ff6a00] active:scale-[0.98]"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}