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

// TODO (SEO AUDIT): Remove the robots noindex below once the site is live and has passed an SEO audit.
export const metadata: Metadata = {
  title: "Lone Star Glass & Shower | Odessa, TX",
  description:
    "Premier glass and shower solutions in Odessa, TX. Full bathroom remodels, custom showers, and auto glass.",
  robots: {
    index: false,
    follow: false,
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
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable} font-sans text-gray-800 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
