import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import { NeonIcon } from "./_icons/Neon";
import { ClerkIcon } from "./_icons/Clerk";
import { subscriptionTiersInOrder } from "@/data/subscriptionTiers";
import { Card, CardTitle, CardDescription, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { formatCompactNumber } from '@/lib/formatters'
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/BrandLogo";

export default function HomePage() {
  return (
    <>
      <section className="min-h-screen bg-[radial-gradient(hsl(0,72%,65%,40%),hsl(24,62%,73%,40%),hsl(var(--background))_60%)] flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
        <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight m-4">Price Smarter, Sell Bigger!</h1>
        <p className="text-lg lg:text-3xl max-w-screen-xl">
          Optimize your product pricing across countries to maximize sales. Capture 85% of the untapped market with location-based dynamic pricing
        </p>
        <SignUpButton>
          <Button className="text-lg p-6 rounded-xl flex gap-2">
            Get started for free <ArrowRightIcon className="size-5" />
          </Button>
        </SignUpButton>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container py-16 flex flex-col gap-16 px-8 md:px-16">
          <h2 className="text-3xl text-center text-balance">
            Trusted by the top modern companies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-16">
            <Link href="https://neon.tech" target="_blank">
              <NeonIcon />
            </Link>
            <Link href="https://clerk.com" target="_blank">
              <ClerkIcon />
            </Link>
            <Link href="https://neon.tech" target="_blank">
              <NeonIcon />
            </Link>
            <Link href="https://clerk.com" target="_blank">
              <ClerkIcon />
            </Link>
            <Link href="https://neon.tech" target="_blank">
              <NeonIcon />
            </Link>
            <Link href="https://clerk.com" target="_blank">
              <ClerkIcon />
            </Link>
            <Link href="https://neon.tech" target="_blank">
              <NeonIcon />
            </Link>
            <Link href="https://clerk.com" target="_blank">
              <ClerkIcon />
            </Link>
            <Link href="https://neon.tech" target="_blank">
              <NeonIcon />
            </Link>
            <Link className="md:max-xl:hidden" href="https://clerk.com" target="_blank">
              <ClerkIcon />
            </Link>
          </div>
        </div>
      </section>

      <section id="pricing" className="px-8 py-16 bg-accent/5">
        <h2 className="text-4xl text-center text-balance font-semibold mb-8">
          Pricing software which pays for itself 20 times over
        </h2>
        <div className="grid grid-cols-2 ls:grid-cols-4 gap-4 max-w-screen-xl mx-auto">
          {subscriptionTiersInOrder.map(tier => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>
      </section>

      <footer className="container pt-16 pb-8 flex
      flex-col sm:flex-row gap-8 sm:gap-4 justify-between items-start">
        <Link href="/">
          <BrandLogo />
        </Link>
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex flex-col gap-8">
            <FooterLinkGroup
              title="Help"
              links={[
                { label: "PPP Discounts", href: "#" },
                { label: "Discount API", href: "#" },
              ]}
            />
            {/* TODO: add the rest of the footer linkGroups */}
          </div>
        </div>
      </footer>
    </>
  )
}

function PricingCard({
  name,
  priceInCents,
  maxNumberOfProducts,
  maxNumberOfVisits,
  canAccessAnalytics,
  canCustomizeBanner,
  canRemoveBranding,
}: (typeof subscriptionTiersInOrder)[number]) {
  const isMostPopular = name === "Standard"

  return <Card>
    <CardHeader>
      <div className="text-accent font-semibold mb-8">
        {name}
      </div>
      <CardTitle className="text-xl font-bold">€{priceInCents / 100}/mo</CardTitle>
      <CardDescription>
        {formatCompactNumber(maxNumberOfVisits)} pricing page visits/mo
      </CardDescription>
    </CardHeader>

    <CardContent>
      <SignUpButton>
        <Button
          className="text-lg w-full rounded-lg"
          variant={isMostPopular ? "accent" : "default"}
        >
          Get Started
        </Button>
      </SignUpButton>
    </CardContent>

    <CardFooter className="flex flex-col gap-4 items-start">
      <Feature className="font-bold">
        {maxNumberOfProducts}{" "}
        {maxNumberOfProducts === 1 ? "product" : "products"}
      </Feature>
      <Feature>PPP discounts</Feature>
      {canAccessAnalytics && <Feature>Advanced analytics</Feature>}
      {canRemoveBranding && <Feature>Remove PriceFlex Branding</Feature>}
      {canCustomizeBanner && <Feature>Banner Customization</Feature>}
    </CardFooter>
  </Card>
}

function Feature({ children, className }: { children: ReactNode, className?: string }) {
  return <div className={cn("flex items-center gap-2", className)}>
    <CheckIcon className="size-4 stroke-accent bg-accent/25 rounded-full p-0.5" />
    <span>{children}</span>
  </div>
}

function FooterLinkGroup({ title, links }: { title: string, links: { label: string, href: string }[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold">{title}</h3>
      <ul className="flex flex-col gap-2 text-sm">
        {links.map(link => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
