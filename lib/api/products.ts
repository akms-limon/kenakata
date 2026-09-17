import type { Product } from "@/types/product";

const API_URL = process.env.API_URL;

export async function getProducts(): Promise<Product[]> {
  if (!API_URL) {
    throw new Error("API_URL is not configured");
  }

  const response = await fetch(`${API_URL}/products`, {
    next: {
        revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await response.json();

  return products;
}


export async function getProduct(id: string): Promise<Product> {
  if (!API_URL) {
    throw new Error("API_URL is not configured");
  }

  const response = await fetch(`${API_URL}/products`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await response.json();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}


export async function getProductsByCategory(
  categoryId: number
): Promise<Product[]> {
  if (!API_URL) {
    throw new Error("API_URL is not configured");
  }

  const response = await fetch(
    `${API_URL}/products/?categoryId=${categoryId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch related products");
  }

  return response.json();
}