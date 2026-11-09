import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://portfolio-alma.local";

  return [
    {
      url: baseUrl,
      lastModified: "2026-11-08",
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
