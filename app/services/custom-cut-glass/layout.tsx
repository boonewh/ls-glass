import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Cut Glass — Tabletops, Mirrors & Specialty Glass",
  description:
    "Custom cut glass to any shape or size in Odessa, TX. Glass tabletops, mirrors, shelving, shower panels, and specialty cuts. Bring your specs — we cut it in our shop.",
  keywords: [
    "custom cut glass Odessa TX",
    "glass cutting Odessa",
    "custom mirror cutting Midland TX",
    "glass tabletop Odessa",
    "glass shelves cut to size Odessa",
    "specialty glass cutting West Texas",
    "mirror installation Odessa TX",
    "decorative glass Midland",
  ],
  alternates: {
    canonical: "https://www.lsglassandshower.com/services/custom-cut-glass",
  },
  openGraph: {
    title: "Custom Cut Glass — Tabletops, Mirrors & Specialty Cuts | Lone Star Glass & Shower",
    description:
      "Glass cut to your exact specs in Odessa, TX. Tabletops, mirrors, shelving, shower panels, and more. In-shop cutting with fast turnaround.",
    url: "https://www.lsglassandshower.com/services/custom-cut-glass",
  },
};

export default function CustomCutGlassLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
