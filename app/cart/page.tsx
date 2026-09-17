"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-16">
        <div className="w-full rounded-xl border border-gray-200 bg-white p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1e6]">
            <ShoppingCart
              size={30}
              className="text-[#ff6a00]"
            />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Your Cart Is Empty
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            You have not added any products to your cart
            yet. Explore our products and find something
            you like.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex rounded-md bg-[#ff6a00] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#e65f00] hover:shadow-md active:scale-[0.98]"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Your Cart
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {cartItems.length}{" "}
          {cartItems.length === 1
            ? "product"
            : "products"}{" "}
          in your cart
        </p>
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-shadow duration-200 hover:shadow-sm"
            >
              <Link
                href={`/products/${item.product.id}`}
                className="shrink-0"
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-gray-50">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.title}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <Link
                  href={`/products/${item.product.id}`}
                >
                  <h2 className="line-clamp-2 text-sm font-semibold text-gray-900 transition-colors hover:text-[#ff6a00]">
                    {item.product.title}
                  </h2>
                </Link>

                <p className="mt-1 text-base font-bold text-[#ff6a00]">
                  ${item.product.price}
                </p>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                  <div className="flex items-center overflow-hidden rounded-md border border-gray-300">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity - 1
                        )
                      }
                      aria-label="Decrease quantity"
                      className="flex h-8 w-8 items-center justify-center text-gray-600 transition-colors hover:bg-[#fff1e6] hover:text-[#ff6a00]"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="flex h-8 w-9 items-center justify-center border-x border-gray-300 text-xs font-semibold text-gray-900">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity + 1
                        )
                      }
                      aria-label="Increase quantity"
                      className="flex h-8 w-8 items-center justify-center text-gray-600 transition-colors hover:bg-[#fff1e6] hover:text-[#ff6a00]"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item.product.id)
                      }
                      className="flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-red-500"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>

                    <p className="text-xs font-medium text-gray-600">
                      {item.quantity} × $
                      {item.product.price} = $
                      {(
                        item.product.price *
                        item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-xl border border-gray-200 bg-white p-5 lg:sticky lg:top-28">
          <h2 className="text-lg font-bold text-gray-900">
            Order Summary
          </h2>

          <div className="mt-5 flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="my-4 h-px bg-gray-200" />

          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span className="text-[#ff6a00]">
              ${total.toFixed(2)}
            </span>
          </div>

          <Link
            href="/checkout"
            className="mt-5 flex w-full items-center justify-center rounded-md bg-[#ff6a00] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#e65f00] hover:shadow-md active:scale-[0.99]"
          >
            Checkout
          </Link>

          <Link
            href="/products"
            className="mt-2 flex w-full items-center justify-center rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-[#ff6a00] hover:text-[#ff6a00]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}