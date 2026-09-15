import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <nav>
        <Link href="/">KenaKata</Link>

        <div>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/logIn">Log In</Link>
        </div>
      </nav>
    </header>
  );
}