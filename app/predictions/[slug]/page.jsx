"use client";

import { notFound } from "next/navigation";
import PredictionLayout from "@/components/layout/PredictionLayout";
import SinglePickTool from "@/components/predictor/SinglePickTool";
import SeoContent from "@/components/seo/SeoContent";
import FaqAccordion from "@/components/seo/FaqAccordion";
import RelatedTools from "@/components/predictor/RelatedTools";
import Card from "@/components/ui/Card";

import toolsData from "@/data/tools.json";
import teamsData from "@/data/teams.json";
import youngPlayersData from "@/data/youngPlayers.json";
import matchupsData from "@/data/matchups.json";

const DATA_SOURCES = {
  teams: teamsData,
  youngPlayers: youngPlayersData,
  matchups: matchupsData,
};

export default function DynamicToolPage({ params }) {
  const tool = toolsData.find((t) => t.slug === params.slug);

  // Tool not found → 404
  if (!tool) {
    if (typeof window !== "undefined") notFound();
    return null;
  }

  // Custom tools have their own dedicated routes (e.g. /predictions/golden-boot)
  // This dynamic route only renders non-custom tools (single-pick, bracket, poll)
  if (tool.kind === "custom") {
    if (typeof window !== "undefined") notFound();
    return null;
  }

  // Coming-soon: render a clean preview page
  if (tool.status === "coming-soon") {
    return <ComingSoonPage tool={tool} />;
  }

  // Resolve options from the registry's optionsRef
  const options = DATA_SOURCES[tool.config?.optionsRef] || [];

  return (
    <PredictionLayout
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: tool.name },
      ]}
    >
      {/* Render the right template based on tool.kind */}
      {tool.kind === "single-pick" && <SinglePickTool tool={tool} options={options} />}

      {/* SEO content (auto-rendered from JSON) */}
      <SeoContent sections={tool.seo?.sections || []} />

      {/* FAQs (auto-rendered from JSON) */}
      <FaqAccordion faqs={tool.seo?.faqs || []} />

      {/* Related tools (auto-resolved from registry) */}
      <RelatedTools currentToolId={tool.id} />
    </PredictionLayout>
  );
}

function ComingSoonPage({ tool }) {
  return (
    <PredictionLayout
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: tool.name },
      ]}
    >
      <section className="relative overflow-hidden rounded-3xl hero-bg border border-[var(--color-border)] shadow-soft px-6 md:px-10 py-12 md:py-16 text-center">
        <div className="text-6xl mb-4">{tool.icon}</div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold tracking-wide mb-3">
          ⏳ COMING SOON
        </div>
        <h1 className="font-display font-extrabold text-3xl md:text-4xl mb-2">
          {tool.name}
        </h1>
        <p className="text-base text-[var(--color-text-muted)] max-w-xl mx-auto">
          {tool.description}
        </p>
      </section>

      {tool.seo?.sections?.length > 0 && <SeoContent sections={tool.seo.sections} />}
      {tool.seo?.faqs?.length > 0 && <FaqAccordion faqs={tool.seo.faqs} />}
      <RelatedTools currentToolId={tool.id} />
    </PredictionLayout>
  );
}
