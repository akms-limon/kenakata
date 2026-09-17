import Link from "next/link";
import {
  Globe,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="text-xl font-bold text-gray-900"
          >
            Kena<span className="text-[#ff6a00]">Kata</span>
          </Link>

          <p className="mt-3 max-w-xs text-sm leading-6 text-gray-500">
            Discover quality products, great prices, and
            everything you need in one place.
          </p>

          <div className="mt-5 flex gap-2">
            <SocialIcon
              href="#"
              label="Social Media"
              icon={<Globe size={16} />}
            />

            <SocialIcon
              href="#"
              label="Community"
              icon={<MessageCircle size={16} />}
            />
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Shop
          </h3>

          <div className="mt-4 flex flex-col gap-2.5">
            <FooterLink href="/products">
              All Products
            </FooterLink>

            <FooterLink href="/wishlist">
              Wishlist
            </FooterLink>

            <FooterLink href="/cart">
              Cart
            </FooterLink>

            <FooterLink href="/checkout">
              Checkout
            </FooterLink>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Company
          </h3>

          <div className="mt-4 flex flex-col gap-2.5">
            <FooterLink href="/about">
              About Us
            </FooterLink>

            <FooterLink href="/logIn">
              Login
            </FooterLink>

            <FooterLink href="/register">
              Register
            </FooterLink>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Get In Touch
          </h3>

          <p className="mt-4 text-sm leading-6 text-gray-500">
            Have questions or need help? We're here to
            help you with your shopping experience.
          </p>

          <Link
            href="/about"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#ff6a00] transition-colors hover:text-[#e65f00]"
          >
            Contact Us
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} KenaKata. All
            rights reserved.
          </p>

          <p>
            Shop simple. Shop better.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="w-fit text-sm text-gray-500 transition-colors duration-200 hover:text-[#ff6a00]"
    >
      {children}
    </Link>
  );
}

function SocialIcon({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition-all duration-200 hover:border-[#ff6a00] hover:text-[#ff6a00]"
    >
      {icon}
    </a>
  );
}