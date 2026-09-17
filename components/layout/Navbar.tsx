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
            Kena<span className="text-[#ff6a00]">Kata</span>
          </Link>

          <div className="hidden items-center gap-6 min-[768px]:flex">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-[#ff6a00]"
            >
              Home
            </Link>

            <Link
              href="/products"
              className="text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-[#ff6a00]"
            >
              Products
            </Link>

            <Link
              href="/wishlist"
              className="relative flex items-center text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-[#ff6a00]"
            >
              Wishlist

              {wishlistCount > 0 && (
                <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ff4470] px-1 text-[10px] font-semibold leading-none text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-[#ff6a00]"
            >
              <ShoppingCart size={18} />
              Cart

              {cartCount > 0 && (
                <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ff6a00] px-1 text-[10px] font-semibold leading-none text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-[#ff6a00] disabled:opacity-50"
              >
                {loggingOut
                  ? "Logging out..."
                  : "Logout"}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/logIn"
                  className="rounded-md border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-[#ff6a00] hover:text-[#ff6a00]"
                >
                  Log In
                </Link>

                <Link
                  href="/register"
                  className="rounded-md bg-[#ff6a00] px-4 py-1.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#e65f00]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 min-[768px]:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-700"
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

        {isMenuOpen && (
          <div className="border-t border-gray-200 py-4 min-[768px]:hidden">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={closeMenu}
                className="rounded-md px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Home
              </Link>

              <Link
                href="/products"
                onClick={closeMenu}
                className="rounded-md px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Products
              </Link>

              <Link
                href="/about"
                onClick={closeMenu}
                className="rounded-md px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                About
              </Link>

              <Link
                href="/wishlist"
                onClick={closeMenu}
                className="flex items-center justify-between rounded-md px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span>Wishlist</span>

                {wishlistCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff4470] px-1 text-[10px] font-semibold text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                onClick={closeMenu}
                className="flex items-center justify-between rounded-md px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart size={18} />
                  Cart
                </span>

                {cartCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff6a00] px-1 text-[10px] font-semibold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="rounded-md px-3 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  {loggingOut
                    ? "Logging out..."
                    : "Logout"}
                </button>
              ) : (
                <>
                  <Link
                    href="/logIn"
                    onClick={closeMenu}
                    className="rounded-md px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Log In
                  </Link>

                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className="rounded-md bg-[#ff6a00] px-3 py-3 text-sm font-medium text-white hover:bg-[#e65f00]"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}