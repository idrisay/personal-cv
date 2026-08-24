import type { MetadataRoute } from "next";
import { CONTACT } from "@/data/cv";

// Static export: this is evaluated at build time and written to out/sitemap.xml
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${CONTACT.site}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${CONTACT.site}/resume/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${CONTACT.site}/resume/de/`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];
}
