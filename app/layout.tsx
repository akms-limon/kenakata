import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import { CartProvider } from "@/components/cart/CartProvider";
import { getSession } from "@/lib/auth/session";
import ThemeProvider from "@/components/theme/ThemeProvider";
import "./globals.css";
import { WishlistProvider } from "@/components/wishlist/WishlistProvider";

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
        <ThemeProvider>
          <WishlistProvider>
            <CartProvider>
                <Navbar isLoggedIn={isLoggedIn} />
                {children}
            </CartProvider>
            </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}