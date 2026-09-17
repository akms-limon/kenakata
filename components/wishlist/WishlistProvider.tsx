"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { Product } from "@/types/product";

type WishlistContextType = {
  wishlistItems: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  removeFromWishlist: (productId: number) => void;
};

const WishlistContext = createContext<
  WishlistContextType | undefined
>(undefined);

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");

    if (savedWishlist) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWishlistItems(JSON.parse(savedWishlist));
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems, isLoaded]);

  function toggleWishlist(product: Product) {
    setWishlistItems((currentItems) => {
      const exists = currentItems.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return currentItems.filter(
          (item) => item.id !== product.id
        );
      }

      return [...currentItems, product];
    });
  }

  function isInWishlist(productId: number) {
    return wishlistItems.some(
      (item) => item.id === productId
    );
  }

  function removeFromWishlist(productId: number) {
    setWishlistItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}