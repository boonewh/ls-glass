import type { Metadata } from "next";

export const SITE_URL = "https://www.lsglassandshower.com";
export const SITE_NAME = "Lone Star Glass & Shower";
export const SOCIAL_IMAGE = {
  url: `${SITE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "Lone Star Glass & Shower — Odessa, Texas and Bartlesville, Oklahoma",
};

export const services = {
  "residential-glass": {
    name: "Residential Glass Replacement",
    title: "Window Glass Repair in Odessa & Midland",
    description: "Replace foggy or broken window glass while keeping your existing frames. Residential glass repair in Odessa and Midland, TX. Request a free quote.",
  },
  "commercial-glass": {
    name: "Commercial Glass & Storefronts",
    title: "Commercial Glass in Odessa & Midland",
    description: "Storefront glass, entry systems, office partitions, and commercial glass repairs in Odessa and Midland, TX. Request a quote from Lone Star Glass & Shower.",
  },
  "custom-cut-glass": {
    name: "Custom Cut Glass",
    title: "Custom Cut Glass & Mirrors in Odessa",
    description: "Glass cut to your specifications in Odessa, TX: tabletops, mirrors, shelves, and shower panels. Bring your measurements or request a free consultation.",
  },
  "bathroom-remodel": {
    name: "Bathroom Remodels & Custom Showers",
    title: "Bathroom Remodels & Shower Glass in Odessa",
    description: "Custom frameless shower glass, tub-to-shower conversions, and full bathroom remodels in Odessa and Midland, TX. One crew from demolition to installation.",
  },
  "auto-glass": {
    name: "Auto Glass Repair & Replacement",
    title: "Auto Glass & Windshield Repair in Odessa",
    description: "Windshield repair and auto glass replacement for cars, trucks, SUVs, and fleet vehicles in Odessa and Midland, TX. Contact Lone Star Glass & Shower for a quote.",
  },
  "heavy-equipment": {
    name: "Oilfield & Heavy Equipment Glass",
    title: "Oilfield & Heavy Equipment Glass in Odessa",
    description: "Cab glass repair and replacement for dozers, graders, excavators, and oilfield equipment in Odessa, Midland, and the Permian Basin. Request a free quote.",
  },
} as const;

export type ServiceSlug = keyof typeof services;

export function pageMetadata(title: string, description: string, path = "/"): Metadata {
  const url = new URL(path, SITE_URL).href;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: SOCIAL_IMAGE.url, alt: SOCIAL_IMAGE.alt }],
    },
  };
}

export function serviceMetadata(slug: ServiceSlug): Metadata {
  const service = services[slug];
  return pageMetadata(`${service.title} | Lone Star Glass`, service.description, `/services/${slug}`);
}

const westTexas = [
  { "@type": "City", name: "Odessa, TX" },
  { "@type": "City", name: "Midland, TX" },
  { "@type": "AdministrativeArea", name: "Permian Basin" },
];

// Only publish confirmed location details. Oklahoma services, hours, and phone are pending.
export const businessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/lone-star-logo-small.png`,
        width: 500,
        height: 136,
      },
      location: [{ "@id": `${SITE_URL}/#business` }, { "@id": `${SITE_URL}/#bartlesville` }],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: `${SITE_URL}/#contact`,
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      image: `${SITE_URL}/images/lone-star-logo-small.png`,
      telephone: "+14323163142",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2011 West 7th Street",
        addressLocality: "Odessa",
        addressRegion: "TX",
        postalCode: "79763",
        addressCountry: "US",
      },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "09:00", closes: "17:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "08:00", closes: "17:00" },
      ],
      areaServed: westTexas,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Glass & Shower Services",
        itemListElement: Object.entries(services).map(([slug, service]) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: service.name, url: `${SITE_URL}/services/${slug}` },
        })),
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#bartlesville`,
      name: SITE_NAME,
      url: `${SITE_URL}/#contact`,
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      image: `${SITE_URL}/images/lone-star-logo-small.png`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "1781 W 14th St.",
        addressLocality: "Bartlesville",
        addressRegion: "OK",
        postalCode: "74003",
        addressCountry: "US",
      },
    },
  ],
};

export function serviceSchema(slug: ServiceSlug) {
  const service = services[slug];
  const url = `${SITE_URL}/services/${slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.name,
        serviceType: service.name,
        description: service.description,
        url,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: westTexas,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: service.name, item: url },
        ],
      },
    ],
  };
}
