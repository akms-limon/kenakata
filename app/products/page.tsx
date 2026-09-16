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
      <h1 className="text-3xl font-bold text-gray-900">
        Products
      </h1>

      <ProductsClient
        products={products}
        initialCategory={category}
      />
    </main>
  );
}