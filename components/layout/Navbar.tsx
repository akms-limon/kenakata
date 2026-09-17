"use client";

import Link from "next/link";
import {
  Menu,
  ShoppingCart,
  X,
} from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/api/auth";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useWishlist } from "@/components/wishlist/WishlistProvider";

type NavbarProps = {
  isLoggedIn: boolean;
};

export default function Navbar({ isLoggedIn }: NavbarProps) {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const router = useRouter();

  const [loggingOut, setLoggingOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const wishlistCount = wishlistItems.length;

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  async function handleLogout() {
    setLoggingOut(true);

    try {
      await logoutUser();

      setIsMenuOpen(false);
      router.push("/");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            onClick={closeMenu}
            className="text-xl font-bold text-gray-900"
          >
            KenaKata
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 min-[768px]:flex">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-black"
            >
              Home
            </Link>

            <Link
              href="/products"
              className="text-sm font-medium text-gray-700 hover:text-black"
            >
              Products
            </Link>

            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 hover:text-black"
            >
              About
            </Link>

            <Link
              href="/wishlist"
              className="relative flex items-center text-sm font-medium text-gray-700 hover:text-black"
            >
              Wishlist

              {wishlistCount > 0 && (
                <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full border border-gray-300 bg-white px-1 text-[10px] font-semibold leading-none text-gray-700">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-black"
            >
              <ShoppingCart size={18} />
              Cart

              {cartCount > 0 && (
                <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full border border-gray-300 bg-white px-1 text-[10px] font-semibold leading-none text-gray-700">
                  {cartCount}
                </span>
              )}
            </Link>

            <ThemeToggle />

            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="text-sm font-medium text-gray-700 hover:text-black disabled:opacity-50"
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <Link
                href="/logIn"
                className="text-sm font-medium text-gray-700 hover:text-black"
              >
                Log In
              </Link>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 min-[768px]:hidden">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-700"
              aria-label={
                isMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
            >
              {isMenuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 py-4 min-[768px]:hidden">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Home
              </Link>

              <Link
                href="/products"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Products
              </Link>

              <Link
                href="/about"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                About
              </Link>

              <Link
                href="/wishlist"
                onClick={closeMenu}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <span>Wishlist</span>

                {wishlistCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-gray-300 bg-white px-1 text-[10px] font-semibold text-gray-700">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                onClick={closeMenu}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart size={18} />
                  Cart
                </span>

                {cartCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-gray-300 bg-white px-1 text-[10px] font-semibold text-gray-700">
                    {cartCount}
                  </span>
                )}
              </Link>

              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="rounded-lg px-3 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                >
                  {loggingOut
                    ? "Logging out..."
                    : "Logout"}
                </button>
              ) : (
                <Link
                  href="/logIn"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}