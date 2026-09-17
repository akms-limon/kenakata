"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

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
  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(
      initialCategory ? [initialCategory] : []
    );

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [appliedMinPrice, setAppliedMinPrice] =
    useState("");
  const [appliedMaxPrice, setAppliedMaxPrice] =
    useState("");

  const [sort, setSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const categories = useMemo(() => {
    const categoryNames = products
      .map((product) => product.category?.name)
      .filter(
        (category): category is string =>
          typeof category === "string" &&
          category.trim() !== ""
      )
      .filter(
        (category) =>
          category.toLowerCase() !== "sports" &&
          category.toLowerCase() !== "fitness"
      );

    return [...new Set(categoryNames)];
  }, [products]);

  function getProductPrice(product: Product) {
    const price = Number(product.price);

    if (!Number.isFinite(price)) {
      return null;
    }

    return price;
  }

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) =>
      String(product.title || "")
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    );

    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(
          product.category?.name || ""
        )
      );
    }

    if (appliedMinPrice !== "") {
      const min = Number(appliedMinPrice);

      result = result.filter((product) => {
        const price = getProductPrice(product);

        return price !== null && price >= min;
      });
    }

    if (appliedMaxPrice !== "") {
      const max = Number(appliedMaxPrice);

      result = result.filter((product) => {
        const price = getProductPrice(product);

        return price !== null && price <= max;
      });
    }

    if (sort === "price-low") {
      result = [...result].sort((a, b) => {
        const priceA = getProductPrice(a);
        const priceB = getProductPrice(b);

        if (priceA === null && priceB === null) {
          return 0;
        }

        if (priceA === null) {
          return 1;
        }

        if (priceB === null) {
          return -1;
        }

        return priceA - priceB;
      });
    }

    if (sort === "price-high") {
      result = [...result].sort((a, b) => {
        const priceA = getProductPrice(a);
        const priceB = getProductPrice(b);

        if (priceA === null && priceB === null) {
          return 0;
        }

        if (priceA === null) {
          return 1;
        }

        if (priceB === null) {
          return -1;
        }

        return priceB - priceA;
      });
    }

    if (sort === "name") {
      result = [...result].sort((a, b) =>
        String(a.title || "").localeCompare(
          String(b.title || "")
        )
      );
    }

    return result;
  }, [
    products,
    debouncedSearch,
    selectedCategories,
    appliedMinPrice,
    appliedMaxPrice,
    sort,
  ]);

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const paginatedProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + productsPerPage
    );

  const priceRangeError =
    appliedMinPrice !== "" &&
    appliedMaxPrice !== "" &&
    Number(appliedMinPrice) >
      Number(appliedMaxPrice);

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    appliedMinPrice !== "" ||
    appliedMaxPrice !== "";

  function toggleCategory(category: string) {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter(
            (item) => item !== category
          )
        : [...current, category]
    );

    setCurrentPage(1);
  }

  function applyPriceFilter() {
    setAppliedMinPrice(minPrice);
    setAppliedMaxPrice(maxPrice);
    setCurrentPage(1);
  }

  function clearFilters() {
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setAppliedMinPrice("");
    setAppliedMaxPrice("");
    setCurrentPage(1);
  }

  return (
    <div>
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <SlidersHorizontal size={15} />
          <span>Find Products</span>
        </div>

        <div className="mt-2.5 grid gap-2 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              className="h-9 w-full rounded-md border border-gray-300 bg-white pl-8 pr-3 text-xs text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#ff6a00]"
            />
          </div>

          <select
            value={sort}
            onChange={(event) => {
              setSort(event.target.value);
              setCurrentPage(1);
            }}
            className="h-9 rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none transition-colors focus:border-[#ff6a00]"
          >
            <option value="default">
              Sort By
            </option>

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

          <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
            <input
              type="number"
              min="0"
              placeholder="Min price"
              value={minPrice}
              onChange={(event) =>
                setMinPrice(event.target.value)
              }
              className="h-9 w-full rounded-md border border-gray-300 px-2.5 text-xs text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#ff6a00]"
            />

            <input
              type="number"
              min="0"
              placeholder="Max price"
              value={maxPrice}
              onChange={(event) =>
                setMaxPrice(event.target.value)
              }
              className="h-9 w-full rounded-md border border-gray-300 px-2.5 text-xs text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#ff6a00]"
            />

            <button
              type="button"
              onClick={applyPriceFilter}
              className="h-9 rounded-md bg-[#ff6a00] px-3 text-xs font-semibold text-white transition-all duration-200 hover:bg-[#e65f00] active:scale-[0.98]"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="mt-3 border-t border-gray-100 pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold text-gray-900">
              Categories
            </span>

            {categories.map((category) => (
              <label
                key={category}
                className="flex cursor-pointer items-center gap-1.5 rounded-md border border-gray-200 px-2.5 py-1.5 text-[11px] text-gray-700 transition-colors hover:border-[#ff6a00]"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(
                    category
                  )}
                  onChange={() =>
                    toggleCategory(category)
                  }
                  className="h-3 w-3 accent-[#ff6a00]"
                />

                <span>{category}</span>
              </label>
            ))}

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="ml-auto rounded-md border border-gray-300 px-3 py-1.5 text-[11px] font-medium text-gray-600 transition-colors hover:border-[#ff4470] hover:text-[#ff4470]"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {priceRangeError && (
          <p className="mt-2 text-xs text-red-500">
            Minimum price cannot be greater than
            maximum price.
          </p>
        )}
      </div>

      {priceRangeError ? (
        <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
          <Search
            size={28}
            className="mx-auto text-gray-400"
          />

          <h2 className="mt-3 text-lg font-semibold text-gray-900">
            Invalid Price Range
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Please enter a valid minimum and maximum
            price.
          </p>
        </div>
      ) : (
        <>
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
                {selectedCategories.length > 0 &&
                (appliedMinPrice !== "" ||
                  appliedMaxPrice !== "")
                  ? "No products found for the selected categories and price range."
                  : selectedCategories.length > 0
                    ? "No products found in the selected categories."
                    : appliedMinPrice !== "" ||
                        appliedMaxPrice !== ""
                      ? "No products found in the selected price range."
                      : "Try changing your search or filters."}
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-md bg-[#ff6a00] px-5 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-[#e65f00] active:scale-[0.98]"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {paginatedProducts.map(
                  (product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  )
                )}
              </div>

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
                          setCurrentPage(
                            index + 1
                          )
                        }
                        className={`h-8 min-w-8 rounded-md px-2 text-xs font-medium transition-colors ${
                          currentPage ===
                          index + 1
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
                    disabled={
                      currentPage === totalPages
                    }
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
        </>
      )}
    </div>
  );
}