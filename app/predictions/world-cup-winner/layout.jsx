import toolsData from "@/data/tools.json";

const tool = toolsData.find((t) => t.id === "world-cup-winner");

export const metadata = {
  title: `${tool.name} | ${tool.tournament} | PrimeTools`,
  description: tool.description,
  keywords: tool.keywords,
  openGraph: {
    title: `${tool.name} — ${tool.tournament}`,
    description: tool.description,
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

export default function Layout({ children }) {
  return children;
}
