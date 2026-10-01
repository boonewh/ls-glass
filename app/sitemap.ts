import type { MetadataRoute } from "next";
import { SITE_URL, services } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Omit lastModified until actual content update dates are maintained.
  return [
    { url: SITE_URL + "/" },
    ...Object.keys(services).map((slug) => ({ url: SITE_URL + "/services/" + slug })),
  ];
}
