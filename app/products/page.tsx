import ProductsClient from "@/components/product/ProductsClient";
import { getProducts } from "@/lib/api/products";

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function Products({
  searchParams,
}: ProductsPageProps) {
  const products = await getProducts();
  const { category } = await searchParams;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="border-b-2 border-[#ff6a00] pb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Products
        </h1>
      </div>

      <div className="pt-6">
        <ProductsClient
          products={products}
          initialCategory={category}
        />
      </div>
    </main>
  );
}