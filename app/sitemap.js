import toolsData from "@/data/tools.json";

export default function sitemap() {
  const base = "https://primetools.example.com";
  const now = new Date();

  const staticRoutes = [
    { url: `${base}/`, lastModified: now, priority: 1.0 },
    { url: `${base}/tools`, lastModified: now, priority: 0.9 },
  ];

  const toolRoutes = toolsData
    .filter((t) => t.status === "live")
    .map((t) => ({
      url: `${base}/predictions/${t.slug}`,
      lastModified: now,
      priority: t.featured ? 0.9 : 0.7,
      changeFrequency: "weekly",
    }));

  return [...staticRoutes, ...toolRoutes];
}
