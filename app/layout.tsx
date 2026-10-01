import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import { SITE_URL, SITE_NAME, pageMetadata, businessSchema } from "@/lib/seo";

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

export const metadata: Metadata = {
  ...pageMetadata(
    "Lone Star Glass & Shower | Odessa, TX & Bartlesville, OK",
    "Glass repair, custom showers, and bathroom remodels in Odessa and Midland, TX. New Bartlesville, Oklahoma location. Contact Lone Star Glass & Shower for a quote.",
  ),
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
        <StructuredData data={businessSchema} />
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable} font-sans text-gray-800 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
