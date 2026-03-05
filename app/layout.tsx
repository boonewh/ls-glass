import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-open-sans",
});

const BASE_URL = "https://www.lsglassandshower.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Lone Star Glass & Shower | Glass Repair & Remodels — Odessa & Midland, TX",
    template: "%s | Lone Star Glass & Shower",
  },
  description:
    "Lone Star Glass & Shower serves Odessa and Midland, TX with residential window glass replacement, commercial storefronts, custom cut glass, bathroom remodels, auto glass, and oilfield equipment glass repair.",
  keywords: [
    "glass repair Odessa TX",
    "glass shop Midland TX",
    "window glass replacement Odessa",
    "custom shower glass Odessa",
    "bathroom remodel Odessa TX",
    "auto glass Odessa TX",
    "commercial glass Odessa",
    "storefront glass Midland",
    "oilfield glass repair Permian Basin",
    "heavy equipment glass West Texas",
    "custom cut glass Odessa",
    "mirror cutting Odessa",
    "insulated glass unit replacement",
    "Lone Star Glass and Shower",
  ],
  authors: [{ name: "Lone Star Glass & Shower" }],
  creator: "Lone Star Glass & Shower",
  publisher: "Lone Star Glass & Shower",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Lone Star Glass & Shower",
    title: "Lone Star Glass & Shower | Odessa & Midland, TX",
    description:
      "Glass repair, custom showers, bathroom remodels, auto glass, and oilfield equipment glazing in Odessa and Midland, TX.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lone Star Glass & Shower — Odessa, TX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lone Star Glass & Shower | Odessa & Midland, TX",
    description:
      "Glass repair, custom showers, bathroom remodels, auto glass, and oilfield equipment glazing in Odessa and Midland, TX.",
    images: ["/images/og-image.jpg"],
  },
};

/* ── LocalBusiness JSON-LD ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#business`,
  name: "Lone Star Glass & Shower",
  description:
    "Glass repair and installation shop serving Odessa and Midland, TX. Specializing in residential window glass replacement, custom shower enclosures, commercial storefronts, auto glass, custom cut glass, and oilfield/heavy equipment glass.",
  url: BASE_URL,
  telephone: "+14323163142",
  email: "noreply@lsglassandshower.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2011 W 7th St",
    addressLocality: "Odessa",
    addressRegion: "TX",
    postalCode: "79763",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 31.8457,
    longitude: -102.3779,
  },
  areaServed: [
    { "@type": "City", name: "Odessa", containedIn: "Texas" },
    { "@type": "City", name: "Midland", containedIn: "Texas" },
    { "@type": "AdministrativeArea", name: "Permian Basin" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Glass & Shower Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Residential Glass Replacement" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Glass & Storefronts" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Cut Glass" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bathroom Remodels & Custom Showers" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Auto Glass Replacement" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Oilfield & Heavy Equipment Glass" } },
    ],
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable} font-sans text-gray-800 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
