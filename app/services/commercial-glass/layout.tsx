import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Glass — Storefronts, Partitions & Office Glass",
  description:
    "Commercial glass installation and repair in Odessa & Midland, TX. Storefront glass, office partitions, glass entry systems, and emergency board-up. Serving West Texas businesses.",
  keywords: [
    "commercial glass Odessa TX",
    "storefront glass repair Odessa",
    "office glass partitions Midland",
    "commercial glass installation West Texas",
    "business glass repair Odessa",
    "storefront door glass Midland",
    "glass entry systems Permian Basin",
    "emergency glass board-up Odessa",
  ],
  alternates: {
    canonical: "https://www.lsglassandshower.com/services/commercial-glass",
  },
  openGraph: {
    title: "Commercial Glass — Storefronts & Partitions | Lone Star Glass & Shower",
    description:
      "Storefront glass, office partitions, and commercial glass repair in Odessa & Midland, TX. Fast turnaround for West Texas businesses.",
    url: "https://www.lsglassandshower.com/services/commercial-glass",
  },
};

export default function CommercialGlassLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
