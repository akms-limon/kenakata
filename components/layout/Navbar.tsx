"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

export default function Navbar() {
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-gray-900"
        >
          KenaKata
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Products
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            About
          </Link>

          <Link
            href="/wishlist"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Wishlist
          </Link>

          <Link
            href="/cart"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <ShoppingCart size={18} />
            Cart

            {cartCount > 0 && (
              <span className="rounded-full bg-black px-2 py-0.5 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/logIn"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Log In
          </Link>
        </div>
      </nav>
    </header>
  );
}