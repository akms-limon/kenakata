import Link from "next/link";
import {
  Shirt,
  Gem,
  Laptop,
  Smartphone,
} from "lucide-react";

import { getProducts } from "@/lib/api/products";
import FeaturedProducts from "@/components/product/FeaturedProducts";

export default async function Home() {
  const products = await getProducts();

  const categories = [
    ...new Map(
      products.map((product) => [
        product.category.id,
        product.category,
      ])
    ).values(),
  ].slice(0, 4);

  const categoryIcons = [
    Shirt,
    Gem,
    Laptop,
    Smartphone,
  ];

  return (
    <main>
      {/* Hero */}
      <section className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
              Welcome to KenaKata
            </p>

            <h1 className="mt-2 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              Everything you need, in one place.
            </h1>

            <p className="mt-3 max-w-xl text-base leading-7 text-gray-600">
              Discover quality products at great prices and
              find something you'll love.
            </p>

            <Link
              href="/products"
              className="mt-5 inline-block rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Category
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              Get Your Desired Product from Featured Category!
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {categories.map((category, index) => {
              const Icon = categoryIcons[index];

              return (
                <Link
                  key={category.id}
                  href={`/products?category=${category.name}`}
                  className="flex min-h-32 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-5 text-center transition hover:-translate-y-1 hover:shadow-md"
                >
                  <Icon
                    size={38}
                    strokeWidth={1.5}
                    className="text-gray-800"
                  />

                  <h3 className="mt-3 text-sm font-medium text-gray-900">
                    {category.name}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Featured Products
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Check & Get Your Desired Product!
          </p>
        </div>

        <FeaturedProducts products={products} />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-2xl bg-black px-6 py-8 text-center text-white md:px-12">
          <h2 className="text-2xl font-bold">
            Find something you'll love
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-300">
            Browse our complete collection and discover
            your next favorite product.
          </p>

          <Link
            href="/products"
            className="mt-5 inline-block rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-gray-200"
          >
            Browse Products
          </Link>
        </div>
      </section>
    </main>
  );
}