import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Glass Replacement — Windshields & Vehicle Glass",
  description:
    "Auto glass replacement and windshield repair in Odessa & Midland, TX. Cars, trucks, SUVs, and fleet vehicles. Fast, professional service — we work around your schedule.",
  keywords: [
    "auto glass Odessa TX",
    "windshield replacement Odessa",
    "auto glass repair Midland TX",
    "windshield repair West Texas",
    "car window replacement Odessa",
    "fleet auto glass Permian Basin",
    "truck windshield replacement Midland",
    "auto glass shop Odessa TX",
  ],
  alternates: {
    canonical: "https://www.lsglassandshower.com/services/auto-glass",
  },
  openGraph: {
    title: "Auto Glass Replacement — Windshields & Vehicle Glass | Lone Star Glass & Shower",
    description:
      "Windshield and auto glass replacement in Odessa & Midland, TX. Cars, trucks, and fleet vehicles. Fast turnaround, professional installation.",
    url: "https://www.lsglassandshower.com/services/auto-glass",
  },
};

export default function AutoGlassLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
