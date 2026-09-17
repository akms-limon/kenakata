"use client";

import Link from "next/link";
import { CheckCircle2, LockKeyhole } from "lucide-react";
import { useState } from "react";

import { useCart } from "@/components/cart/CartProvider";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState("");

  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );

  function handlePlaceOrder(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    clearCart();
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-16">
        <div className="w-full rounded-xl border border-gray-200 bg-white p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e6f7f7]">
            <CheckCircle2
              size={32}
              className="text-[#0ea5a5]"
            />
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900">
            Order Successful!
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            Thank you for your purchase. Your order has
            been placed successfully.
          </p>

          <div className="mx-auto mt-5 max-w-sm rounded-md bg-gray-50 p-4 text-left">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-gray-500">
                Payment Method
              </span>

              <span className="font-medium text-gray-900">
                {paymentMethod || "Not selected"}
              </span>
            </div>

            <div className="mt-2 flex justify-between gap-4 text-sm">
              <span className="text-gray-500">
                Order Total
              </span>

              <span className="font-bold text-[#ff6a00]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            We will contact you shortly with your order
            details.
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

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-16">
        <div className="w-full rounded-xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Your Cart Is Empty
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Add some products before going to checkout.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex rounded-md bg-[#ff6a00] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#e65f00] hover:shadow-md"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Checkout
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Complete your information to place your order.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="mt-7 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white p-5 md:p-6">
              <h2 className="text-lg font-bold text-gray-900">
                Shipping Information
              </h2>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <FormField
                  id="name"
                  label="Full Name"
                  type="text"
                  value={name}
                  onChange={setName}
                  placeholder="Enter your full name"
                />

                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="Enter your email"
                />

                <FormField
                  id="phone"
                  label="Phone"
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                  placeholder="Enter your phone number"
                />

                <FormField
                  id="city"
                  label="City"
                  type="text"
                  value={city}
                  onChange={setCity}
                  placeholder="Enter your city"
                />

                <div className="md:col-span-2">
                  <label
                    htmlFor="address"
                    className="mb-1.5 block text-xs font-semibold text-gray-900"
                  >
                    Address
                  </label>

                  <textarea
                    id="address"
                    value={address}
                    onChange={(event) =>
                      setAddress(event.target.value)
                    }
                    placeholder="Enter your full address"
                    rows={4}
                    required
                    className="w-full resize-none rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-[#ff6a00]"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 md:p-6">
              <h2 className="text-lg font-bold text-gray-900">
                Payment Method
              </h2>

              <div className="mt-4 grid gap-3">
                <PaymentOption
                  value="Cash on Delivery"
                  selected={paymentMethod}
                  onChange={setPaymentMethod}
                />

                <PaymentOption
                  value="bKash"
                  selected={paymentMethod}
                  onChange={setPaymentMethod}
                />

                <PaymentOption
                  value="Nagad"
                  selected={paymentMethod}
                  onChange={setPaymentMethod}
                />
              </div>
            </div>
          </div>

          <div className="h-fit rounded-xl border border-gray-200 bg-white p-5 lg:sticky lg:top-28">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                Order Summary
              </h2>

              <LockKeyhole
                size={17}
                className="text-gray-400"
              />
            </div>

            <div className="mt-5 max-h-64 space-y-3 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between gap-4 text-xs"
                >
                  <span className="min-w-0 text-gray-500">
                    {item.product.title} ×{" "}
                    {item.quantity}
                  </span>

                  <span className="shrink-0 font-semibold text-gray-900">
                    $
                    {(
                      item.product.price *
                      item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="my-5 h-px bg-gray-200" />

            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>

              <span className="text-[#ff6a00]">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              type="submit"
              className="mt-5 flex w-full items-center justify-center rounded-md bg-[#ff6a00] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#e65f00] hover:shadow-md active:scale-[0.99]"
            >
              Place Order
            </button>

            <p className="mt-3 text-center text-[11px] text-gray-400">
              Your order information is securely handled.
            </p>
          </div>
        </div>
      </form>
    </main>
  );
}

function FormField({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold text-gray-900"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        required
        className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-[#ff6a00]"
      />
    </div>
  );
}

function PaymentOption({
  value,
  selected,
  onChange,
}: {
  value: string;
  selected: string;
  onChange: (value: string) => void;
}) {
  const isSelected = selected === value;

  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-md border p-3.5 transition-all duration-200 ${
        isSelected
          ? "border-[#ff6a00] bg-[#fff1e6]"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <input
        type="radio"
        name="paymentMethod"
        value={value}
        checked={isSelected}
        onChange={(event) =>
          onChange(event.target.value)
        }
        required
        className="accent-[#ff6a00]"
      />

      <span className="text-sm font-medium text-gray-900">
        {value}
      </span>
    </label>
  );
}