import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bathroom Remodels — Custom Shower Glass & Full Renovations",
  description:
    "Full bathroom remodels and custom shower glass enclosures in Odessa & Midland, TX. Frameless showers, tub-to-shower conversions, and complete bathroom renovations done right.",
  keywords: [
    "bathroom remodel Odessa TX",
    "custom shower glass Odessa",
    "frameless shower enclosure Midland TX",
    "shower door installation Odessa",
    "tub to shower conversion West Texas",
    "bathroom renovation Odessa TX",
    "custom shower doors Midland",
    "glass shower enclosure Permian Basin",
  ],
  alternates: {
    canonical: "https://www.lsglassandshower.com/services/bathroom-remodel",
  },
  openGraph: {
    title: "Bathroom Remodels & Custom Shower Glass | Lone Star Glass & Shower",
    description:
      "Custom shower enclosures and full bathroom remodels in Odessa & Midland, TX. Frameless showers, tub conversions, and complete renovations.",
    url: "https://www.lsglassandshower.com/services/bathroom-remodel",
  },
};

export default function BathroomRemodelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
