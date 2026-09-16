import {
  getProduct,
  getProductsByCategory,
} from "@/lib/api/products";
import { notFound } from "next/navigation";
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

  const relatedProducts = (
    await getProductsByCategory(product.category.id)
  )
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      {/* Product Details */}
      <div className="grid gap-12 md:grid-cols-2">
        {/* Product Gallery */}
        <ProductGallery product={product} />

        {/* Product Information */}
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            {product.category.name}
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-900 lg:text-4xl">
            {product.title}
          </h1>

          <p className="mt-5 text-3xl font-bold text-gray-900">
            ${product.price}
          </p>

          <div className="my-6 h-px bg-gray-200" />

          <p className="text-base leading-7 text-gray-600">
            {product.description}
          </p>

          <ProductPurchaseControls product={product} />
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Related Products
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            You may also like these products.
          </p>
        </div>

        {relatedProducts.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
              />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-center text-sm text-gray-500">
            No related products found.
          </p>
        )}
      </section>
    </main>
  );
}