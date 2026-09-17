import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import { CartProvider } from "@/components/cart/CartProvider";
import { getSession } from "@/lib/auth/session";
import "./globals.css";
import { WishlistProvider } from "@/components/wishlist/WishlistProvider";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "KenaKata",
  description: "A modern e-commerce storefront",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoggedIn } = await getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          <WishlistProvider>
            <CartProvider>
                <Navbar isLoggedIn={isLoggedIn} />
                {children}
            </CartProvider>
            </WishlistProvider>
            <Footer />
      </body>
    </html>
  );
}