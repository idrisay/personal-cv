import type { MetadataRoute } from "next";
import { CONTACT } from "@/data/cv";

// Static export: evaluated at build time and written to out/robots.txt
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${CONTACT.site}/sitemap.xml`,
    host: CONTACT.site,
  };
}
