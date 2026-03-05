import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oilfield & Heavy Equipment Glass — Permian Basin Cab Glazing",
  description:
    "Heavy equipment and oilfield glass repair in the Permian Basin. We glaze cabs for dozers, graders, excavators, driller cabins, dog houses, and oil rig enclosures. If it has a cab, we can glaze it.",
  keywords: [
    "oilfield glass repair Permian Basin",
    "heavy equipment glass Odessa TX",
    "equipment cab glass replacement West Texas",
    "dozer cab glass repair Midland",
    "excavator windshield replacement Odessa",
    "oil rig glass repair Permian Basin",
    "CAT equipment glass Midland TX",
    "driller cabin glazing West Texas",
    "heavy equipment windshield Odessa",
    "Permian Basin oilfield services glass",
  ],
  alternates: {
    canonical: "https://www.lsglassandshower.com/services/heavy-equipment",
  },
  openGraph: {
    title: "Oilfield & Heavy Equipment Glass | Lone Star Glass & Shower",
    description:
      "Equipment cab glazing in the Permian Basin. Dozers, graders, excavators, drill rigs, and oilfield enclosures. If it has a cab, we can glaze it.",
    url: "https://www.lsglassandshower.com/services/heavy-equipment",
  },
};

export default function HeavyEquipmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
