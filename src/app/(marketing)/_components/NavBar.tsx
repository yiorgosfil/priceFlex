import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export function NavBar() {
  return <header className="flex py-6 shadow-lg fixed top-0 w-full z-10 bg-background/95">
    <nav className="flex items-center gap-10 container font-semibold">
      <Link href='/' className="mr-auto">
        <BrandLogo />
      </Link>
      <Link className="text-xl" href="#">
        Features
      </Link>
      <Link className="text-xl" href="#pricing">
        Pricing
      </Link>
      <Link className="text-xl" href="#">
        About
      </Link>
      <span className="text-xl">
        <SignedIn>
          <Link href="/dashboard">Dashboard</Link>
        </SignedIn>
        <SignedOut>
          <SignInButton>Login</SignInButton>
        </SignedOut>
      </span>
    </nav >
  </header >
}
