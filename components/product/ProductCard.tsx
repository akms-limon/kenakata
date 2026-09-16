import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";
import AddToCartButton from "@/components/cart/AddToCartButton";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article className="bg-gray-50 p-10 text-3xl text-white">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-contain p-4"
            />
        </div>
      </Link>

      <div className="mt-4">
        <p className="text-sm text-gray-500">
          {product.category.name}
        </p>

        <h2 className="mt-1 line-clamp-2 min-h-12 text-base font-semibold text-gray-900">
          {product.title}
        </h2>

        <p className="mt-3 text-lg font-bold text-gray-900">
          ${product.price}
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <AddToCartButton product={product} />

          <Link
            href={`/products/${product.id}`}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
          >
            View Product
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
}