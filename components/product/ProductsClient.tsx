"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

type ProductsClientProps = {
  products: Product[];
  initialCategory?: string;
};

export default function ProductsClient({
  products,
  initialCategory,
}: ProductsClientProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    initialCategory ?? "all"
  );
  const [sort, setSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 10;

  const categories = useMemo(() => {
    return [
      "all",
      ...new Set(
        products.map(
          (product) => product.category?.name
        )
      ),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    if (category !== "all") {
      result = result.filter(
        (product) =>
          product.category?.name === category
      );
    }

    if (sort === "price-low") {
      result = [...result].sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "price-high") {
      result = [...result].sort(
        (a, b) => b.price - a.price
      );
    }

    if (sort === "name") {
      result = [...result].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [products, search, category, sort]);

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div>
      {/* Filters */}
      <div className="mb-7 rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <SlidersHorizontal size={16} />
          <span>Find Products</span>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Search */}
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              className="h-10 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#ff6a00]"
            />
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setCurrentPage(1);
            }}
            className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-colors focus:border-[#ff6a00]"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "all"
                  ? "All Categories"
                  : item}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(event) => {
              setSort(event.target.value);
              setCurrentPage(1);
            }}
            className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-colors focus:border-[#ff6a00]"
          >
            <option value="default">Sort By</option>
            <option value="price-low">
              Price: Low to High
            </option>
            <option value="price-high">
              Price: High to Low
            </option>
            <option value="name">
              Name: A to Z
            </option>
          </select>
        </div>
      </div>

      {/* Result Count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-900">
            {paginatedProducts.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-900">
            {filteredProducts.length}
          </span>{" "}
          products
        </p>
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
          <Search
            size={28}
            className="mx-auto text-gray-400"
          />

          <h2 className="mt-3 text-lg font-semibold text-gray-900">
            No products found
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-1.5">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    (page) => page - 1
                  )
                }
                className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-[#ff6a00] hover:text-[#ff6a00] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                    className={`h-8 min-w-8 rounded-md px-2 text-xs font-medium transition-colors ${
                      currentPage === index + 1
                        ? "bg-[#ff6a00] text-white"
                        : "border border-gray-300 text-gray-700 hover:border-[#ff6a00] hover:text-[#ff6a00]"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage(
                    (page) => page + 1
                  )
                }
                className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-[#ff6a00] hover:text-[#ff6a00] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}