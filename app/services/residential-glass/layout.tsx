import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Residential Glass Replacement — Window Glass Repair",
  description:
    "Save thousands with glass-only window replacement in Odessa & Midland, TX. We replace just the IGU — no frame demolition, no drywall damage. Fast, affordable residential glass repair.",
  keywords: [
    "residential glass replacement Odessa TX",
    "window glass repair Odessa",
    "insulated glass unit replacement Midland",
    "glass only window replacement West Texas",
    "foggy window repair Odessa",
    "broken window glass Odessa TX",
    "Low-E glass replacement Midland",
  ],
  alternates: {
    canonical: "https://www.lsglassandshower.com/services/residential-glass",
  },
  openGraph: {
    title: "Residential Glass Replacement | Lone Star Glass & Shower",
    description:
      "Glass-only window replacement in Odessa & Midland, TX. Keep your frames, replace just the glass. Fast turnaround, affordable pricing.",
    url: "https://www.lsglassandshower.com/services/residential-glass",
  },
};

export default function ResidentialGlassLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
