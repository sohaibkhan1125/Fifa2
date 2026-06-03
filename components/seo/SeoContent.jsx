import Card from "@/components/ui/Card";

/**
 * Renders the long-form SEO content for a tool.
 * Reads from tool.seo.sections — each section has a heading + body.
 * Body supports paragraphs separated by \n\n.
 */
export default function SeoContent({ sections = [] }) {
  if (!sections.length) return null;

  return (
    <Card padding="lg" className="prose-content">
      <div className="space-y-8">
        {sections.map((section, i) => (
          <section key={i} className="animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
            <h2 className="font-display font-bold text-xl md:text-2xl mb-3 text-[var(--color-text)]">
              {section.heading}
            </h2>
            <div className="space-y-3 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
              {section.body.split("\n\n").map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Card>
  );
}
