import Link from "next/link";
import { ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import { notFound } from "next/navigation";

import {
  getProduct,
  getProductsByCategory,
} from "@/lib/api/products";
import ProductGallery from "@/components/product/ProductGallery";
import ProductPurchaseControls from "@/components/cart/ProductPurchaseControls";
import ProductCard from "@/components/product/ProductCard";

type ProductDetailsProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetails({
  params,
}: ProductDetailsProps) {
  const { id } = await params;

  let product;

  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }

  const relatedProducts = product.category
    ? (
        await getProductsByCategory(
          product.category.id
        )
      )
        .filter(
          (item) => item.id !== product.id
        )
        .slice(0, 5)
    : [];

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <Link
          href="/products"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-[#ff6a00]"
        >
          <ArrowLeft size={16} />
          Back to Products
        </Link>

        <section className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <ProductGallery product={product} />
          </div>

          <div className="flex flex-col justify-center">
            <div>
              <span className="inline-flex rounded-full bg-[#fff1e6] px-3 py-1 text-[11px] font-semibold text-[#c94e00]">
                {product.category?.name ||
                  "Uncategorized"}
              </span>

              <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">
                {product.title}
              </h1>

              <p className="mt-4 text-3xl font-bold text-[#ff6a00]">
                ${product.price}
              </p>
            </div>

            <div className="my-6 h-px bg-gray-200" />

            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Product Description
              </h2>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                {product.description}
              </p>
            </div>
            <div className="mt-7">
              <ProductPurchaseControls
                product={product}
              />
            </div>

            <div className="mt-7 grid gap-3 border-t border-gray-200 pt-6 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff1e6] text-[#ff6a00]">
                  <Truck size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-900">
                    Fast Delivery
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Quick and reliable delivery
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e6f7f7] text-[#0a7373]">
                  <ShieldCheck size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-900">
                    Secure Shopping
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Safe and secure checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 border-t border-gray-200 pt-10 md:mt-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Related Products
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              You may also like these products.
            </p>
          </div>

          {relatedProducts.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {relatedProducts.map(
                (relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                  />
                )
              )}
            </div>
          ) : (
            <p className="mt-6 text-center text-sm text-gray-500">
              No related products found.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}