"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";

export default function FaqAccordion({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs.length) return null;

  // Inject FAQ schema.org JSON-LD for rich snippets in Google
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Card padding="lg">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 rounded-lg bg-[var(--color-primary-soft)] text-primary-600 flex items-center justify-center">
            <QuestionIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-[var(--color-text-muted)]">
              Everything you need to know
            </p>
          </div>
        </div>

        <div className="divide-y divide-[var(--color-border)]">
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </Card>
    </>
  );
}

function FaqItem({ faq, open, onToggle }) {
  return (
    <div className="py-1">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full text-left flex items-center justify-between gap-4 py-3.5 hover:text-primary-600 transition-colors group"
      >
        <span className="font-semibold text-sm md:text-base">{faq.question}</span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-lg border border-[var(--color-border)] group-hover:border-primary-300 flex items-center justify-center transition-all ${
            open ? "bg-primary-600 text-white border-primary-600 rotate-180" : "text-[var(--color-text-muted)]"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-[var(--color-text-muted)] pr-10">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function QuestionIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
      <path d="M9.5 9.5a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 3.5M12 17v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
