import toolsData from "@/data/tools.json";

/**
 * Generate static params for every live tool in the registry.
 * This is the "programmatic SEO" mechanism the client asked about.
 * Adding a new tool to tools.json = a new SEO-optimized page at build time.
 */
export async function generateStaticParams() {
  return toolsData
    .filter((t) => t.status === "live" && t.kind !== "custom")
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const tool = toolsData.find((t) => t.slug === params.slug);
  if (!tool) return { title: "Tool not found" };

  return {
    title: tool.seo?.metaTitle || `${tool.name} | PrimeTools`,
    description: tool.seo?.metaDescription || tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: tool.seo?.metaTitle || tool.name,
      description: tool.seo?.metaDescription || tool.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.name,
      description: tool.description,
    },
    alternates: {
      canonical: `/predictions/${tool.slug}`,
    },
  };
}

export default function Layout({ children }) {
  return children;
}
