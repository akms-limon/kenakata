import Link from "next/link";
import Image from "next/image";
import {
  Shirt,
  Gem,
  Laptop,
  Smartphone,
  Truck,
  Wallet,
  Gift,
  Headphones,
  Users,
  ArrowRight,
} from "lucide-react";

import { getProducts } from "@/lib/api/products";
import FeaturedProducts from "@/components/product/FeaturedProducts";

const ACCENTS = [
  "#ff6a00",
  "#0ea5a5",
  "#ff4470",
  "#6c5ce7",
];

const CATEGORY_ICONS = [
  Shirt,
  Gem,
  Laptop,
  Smartphone,
];

export default async function Home() {
  const products = await getProducts();

  const categories = [
    ...new Map(
      products.map((product) => [
        product.category.id,
        product.category,
      ])
    ).values(),
  ];

  return (
    <main className="bg-white">
{/* Hero */}
<section className="relative overflow-hidden border-b border-gray-200 bg-gray-50">
  <Image
    src="/images/background.png"
    alt=""
    fill
    priority
    className="object-cover object-center opacity-50"
  />

  <div className="relative mx-auto flex max-w-7xl items-center px-4 py-14 md:min-h-[430px] md:py-20">
    <div className="max-w-2xl">
      <div className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-[#c94e00] backdrop-blur-sm">
        Welcome to KenaKata
      </div>

      <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Everything you need,
        <br />
        <span className="text-[#ff6a00]">
          in one place.
        </span>
      </h1>

      <p className="mt-5 max-w-xl text-sm leading-6 text-gray-600 md:text-base md:leading-7">
        Discover quality products at great prices
        and find something you will love.
      </p>

      <div className="mt-7 flex items-center gap-3">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-md bg-[#ff6a00] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#e65f00] hover:shadow-md active:scale-[0.98]"
        >
          Shop Now
          <ArrowRight size={16} />
        </Link>

        <Link
          href="/about"
          className="rounded-md border border-gray-300 bg-white/80 px-6 py-3 text-sm font-medium text-gray-700 backdrop-blur-sm transition-all duration-200 hover:border-[#ff6a00] hover:text-[#ff6a00]"
        >
          About Us
        </Link>
      </div>
    </div>
  </div>
</section>

      {/* Features */}
      <section className="border-b border-gray-200">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-5 px-4 py-6 md:grid-cols-5">
          <Feature
            icon={<Truck size={21} />}
            title="Free Delivery"
            description="On selected orders"
            color="#ff6a00"
          />

          <Feature
            icon={<Wallet size={21} />}
            title="Cash On Delivery"
            description="Pay at your door"
            color="#0ea5a5"
          />

          <Feature
            icon={<Gift size={21} />}
            title="Free Gift Box"
            description="On every order"
            color="#ff4470"
          />

          <Feature
            icon={<Headphones size={21} />}
            title="Contact Us"
            description="We are here to help"
            color="#6c5ce7"
          />

          <Feature
            icon={<Users size={21} />}
            title="Loyalty"
            description="Rewarded every time"
            color="#ff6a00"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-12">
        <SectionHeading
          title="Featured Categories"
          description="Get your desired product from our featured categories."
        />

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.slice(0, 4).map((category, index) => {
            const Icon = CATEGORY_ICONS[index];
            const accent = ACCENTS[index % ACCENTS.length];

            return (
              <Link
                key={category.id}
                href={`/products?category=${category.name}`}
                className="group relative overflow-hidden border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className="absolute left-0 top-0 h-1 w-full"
                  style={{
                    backgroundColor: accent,
                  }}
                />

                <div className="flex min-h-28 flex-col items-center justify-center text-center">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${accent}15`,
                      color: accent,
                    }}
                  >
                    <Icon
                      size={25}
                      strokeWidth={1.7}
                    />
                  </div>

                  <h3 className="mt-3 text-sm font-semibold text-gray-900">
                    {category.name}
                  </h3>

                  <span
                    className="mt-1 text-[11px] font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    style={{ color: accent }}
                  >
                    Shop now →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
          <SectionHeading
            title="Featured Products"
            description="Check and get your desired product."
          />

          <FeaturedProducts products={products} />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-12">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#ff6a00] to-[#ff4470] px-6 py-10 text-center text-white md:px-12">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold md:text-3xl">
              Find something you will love
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/85">
              Browse our complete collection and discover
              your next favorite product.
            </p>

            <Link
              href="/products"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#ff6a00] transition-all duration-200 hover:bg-gray-50 hover:shadow-md active:scale-[0.98]"
            >
              Browse Products
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div style={{ color }}>{icon}</div>

      <div>
        <p className="text-xs font-semibold text-gray-900">
          {title}
        </p>

        <p className="text-[11px] text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}