"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900">
          Your Cart
        </h1>

        <p className="mt-6 text-gray-600">
          Your cart is empty.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">
        Your Cart
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">

        {/* Cart Items */}
        <div className="space-y-4 lg:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-lg bg-gray-100 p-3">
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <h2 className="font-semibold text-gray-900">
                  {item.product.title}
                </h2>

                <p className="mt-2 text-lg font-bold text-gray-900">
                  ${item.product.price}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-gray-300">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity - 1
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center hover:bg-gray-100"
                    >
                      <Minus size={15} />
                    </button>

                    <span className="flex h-9 w-10 items-center justify-center border-x border-gray-300 text-sm font-medium">
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
                      className="flex h-9 w-9 items-center justify-center hover:bg-gray-100"
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item.product.id)
                      }
                      className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>

                    <p className="text-sm font-medium text-gray-600">
                      {item.quantity} × ${item.product.price} = $
                      {(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Order Summary
          </h2>

          <div className="mt-6 flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="my-4 h-px bg-gray-200" />

          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-lg bg-black px-6 py-3.5 text-center text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Checkout
          </Link>
        </div>

      </div>
    </main>
  );
}