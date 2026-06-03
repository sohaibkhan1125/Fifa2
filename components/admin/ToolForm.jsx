"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import categoriesData from "@/data/categories.json";
import {
  TOOL_KINDS,
  TOOL_STATUSES,
  ACCENT_COLORS,
  generateSlug,
  validateTool,
} from "@/lib/schemas";
import { saveTool, createTool } from "@/lib/toolsRepository";

export default function ToolForm({ initial, isEdit = false }) {
  const router = useRouter();
  const [tool, setTool] = useState(initial);
  const [errors, setErrors] = useState([]);
  const [saving, setSaving] = useState(false);

  const update = (patch) => setTool((prev) => ({ ...prev, ...patch }));
  const updateSeo = (patch) => setTool((prev) => ({ ...prev, seo: { ...prev.seo, ...patch } }));

  const handleAutoSlug = (name) => {
    const patch = { name };
    if (!isEdit && (!tool.slug || tool.slug === generateSlug(tool.name))) {
      patch.slug = generateSlug(name);
      patch.id = patch.slug;
    }
    update(patch);
  };

  const addSection = () => {
    updateSeo({
      sections: [...(tool.seo.sections || []), { heading: "", body: "" }],
    });
  };

  const updateSection = (idx, patch) => {
    const sections = [...tool.seo.sections];
    sections[idx] = { ...sections[idx], ...patch };
    updateSeo({ sections });
  };

  const removeSection = (idx) => {
    updateSeo({ sections: tool.seo.sections.filter((_, i) => i !== idx) });
  };

  const addFaq = () => {
    updateSeo({ faqs: [...(tool.seo.faqs || []), { question: "", answer: "" }] });
  };

  const updateFaq = (idx, patch) => {
    const faqs = [...tool.seo.faqs];
    faqs[idx] = { ...faqs[idx], ...patch };
    updateSeo({ faqs });
  };

  const removeFaq = (idx) => {
    updateSeo({ faqs: tool.seo.faqs.filter((_, i) => i !== idx) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setSaving(true);

    // Coerce keywords from comma-separated string if it's a string
    const finalTool = {
      ...tool,
      keywords: Array.isArray(tool.keywords)
        ? tool.keywords
        : (tool.keywords || "").split(",").map((k) => k.trim()).filter(Boolean),
    };

    const validation = validateTool(finalTool);
    if (!validation.ok) {
      setErrors(validation.errors);
      setSaving(false);
      return;
    }

    const result = isEdit ? saveTool(finalTool) : createTool(finalTool);

    if (result.ok) {
      router.push("/admin/tools");
    } else {
      setErrors([result.error || "Save failed"]);
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1">
            {isEdit ? "Edit Tool" : "Create New Tool"}
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            {isEdit
              ? "Update this tool — changes appear instantly across the site."
              : "Fill in the form below. The tool will auto-render at /predictions/<slug> with full SEO."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/tools")}
            className="h-10 px-4 rounded-xl border border-[var(--color-border)] text-sm font-semibold hover:bg-[var(--color-bg)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="h-10 px-5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl btn-press shadow-soft"
          >
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Tool"}
          </button>
        </div>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <Card padding="md" className="border-red-300 bg-red-50 dark:bg-red-900/20">
          <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
            {errors.map((e, i) => <li key={i}>• {e}</li>)}
          </ul>
        </Card>
      )}

      {/* Basic Info */}
      <Card padding="md">
        <SectionTitle>Basic Info</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Tool Name *">
            <input
              type="text"
              value={tool.name}
              onChange={(e) => handleAutoSlug(e.target.value)}
              placeholder="e.g. Top Assist Predictor"
              className="input"
              required
            />
          </Field>
          <Field label="Icon (emoji)">
            <input
              type="text"
              value={tool.icon}
              onChange={(e) => update({ icon: e.target.value })}
              placeholder="⚽"
              className="input"
            />
          </Field>
          <Field label="ID (auto-generated, lowercase) *">
            <input
              type="text"
              value={tool.id}
              onChange={(e) => update({ id: e.target.value, slug: e.target.value })}
              placeholder="top-assist"
              className="input font-mono text-xs"
              required
              disabled={isEdit}
            />
          </Field>
          <Field label="URL Slug">
            <input
              type="text"
              value={tool.slug}
              onChange={(e) => update({ slug: e.target.value })}
              placeholder="top-assist"
              className="input font-mono text-xs"
              required
            />
          </Field>
          <Field label="Tagline">
            <input
              type="text"
              value={tool.tagline}
              onChange={(e) => update({ tagline: e.target.value })}
              placeholder="Predict the top assist provider"
              className="input"
            />
          </Field>
          <Field label="Tournament">
            <input
              type="text"
              value={tool.tournament}
              onChange={(e) => update({ tournament: e.target.value })}
              className="input"
            />
          </Field>
          <Field label="Short Description (for cards)" full>
            <input
              type="text"
              value={tool.shortDescription}
              onChange={(e) => update({ shortDescription: e.target.value })}
              placeholder="One-line description shown in tool cards"
              className="input"
            />
          </Field>
          <Field label="Description (for SEO)" full>
            <textarea
              rows={2}
              value={tool.description}
              onChange={(e) => update({ description: e.target.value })}
              placeholder="A 1-2 sentence description used for meta tags."
              className="input"
              required
            />
          </Field>
        </div>
      </Card>

      {/* Configuration */}
      <Card padding="md">
        <SectionTitle>Configuration</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Tool Kind *">
            <select
              value={tool.kind}
              onChange={(e) => update({ kind: e.target.value })}
              className="input"
            >
              {TOOL_KINDS.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-1">
              Determines which template renders this tool
            </p>
          </Field>
          <Field label="Category *">
            <select
              value={tool.categoryId}
              onChange={(e) => update({ categoryId: e.target.value })}
              className="input"
            >
              {categoriesData.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Status *">
            <select
              value={tool.status}
              onChange={(e) => update({ status: e.target.value })}
              className="input"
            >
              {TOOL_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="Accent Color">
            <select
              value={tool.accent}
              onChange={(e) => update({ accent: e.target.value })}
              className="input"
            >
              {ACCENT_COLORS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Featured?">
            <label className="flex items-center gap-2 h-10">
              <input
                type="checkbox"
                checked={tool.featured}
                onChange={(e) => update({ featured: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Show on featured row of /tools</span>
            </label>
          </Field>
          <Field label="Keywords (comma-separated)" full>
            <input
              type="text"
              value={Array.isArray(tool.keywords) ? tool.keywords.join(", ") : tool.keywords}
              onChange={(e) => update({ keywords: e.target.value })}
              placeholder="prediction, fifa, top scorer"
              className="input"
            />
          </Field>
        </div>

        {/* Kind-specific config */}
        {(tool.kind === "single-pick" || tool.kind === "bracket") && (
          <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
            <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)] mb-3">
              {tool.kind} Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Options Source">
                <select
                  value={tool.config?.optionsRef || ""}
                  onChange={(e) => update({ config: { ...tool.config, optionsRef: e.target.value } })}
                  className="input"
                >
                  <option value="">(choose data source)</option>
                  <option value="teams">teams.json</option>
                  <option value="youngPlayers">youngPlayers.json</option>
                  <option value="matchups">matchups.json</option>
                </select>
              </Field>
              <Field label="Option Label">
                <input
                  type="text"
                  value={tool.config?.optionLabel || ""}
                  onChange={(e) => update({ config: { ...tool.config, optionLabel: e.target.value } })}
                  placeholder="Pick a team"
                  className="input"
                />
              </Field>
            </div>
          </div>
        )}
      </Card>

      {/* SEO Content */}
      <Card padding="md">
        <SectionTitle>SEO Content (800-1,200 words)</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Field label="Meta Title">
            <input
              type="text"
              value={tool.seo.metaTitle}
              onChange={(e) => updateSeo({ metaTitle: e.target.value })}
              placeholder="Tool Name 2026 — Description | PrimeTools"
              className="input"
            />
          </Field>
          <Field label="Meta Description">
            <input
              type="text"
              value={tool.seo.metaDescription}
              onChange={(e) => updateSeo({ metaDescription: e.target.value })}
              placeholder="Search engine description"
              className="input"
            />
          </Field>
        </div>

        {/* Sections */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
              Content Sections ({tool.seo.sections?.length || 0})
            </h3>
            <button
              type="button"
              onClick={addSection}
              className="text-xs font-semibold text-primary-600 hover:text-primary-700"
            >
              + Add section
            </button>
          </div>
          <div className="space-y-3">
            {(tool.seo.sections || []).map((section, idx) => (
              <div key={idx} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[var(--color-text-muted)]">
                    Section {idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSection(idx)}
                    className="text-xs text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <input
                  type="text"
                  value={section.heading}
                  onChange={(e) => updateSection(idx, { heading: e.target.value })}
                  placeholder="Section heading"
                  className="input mb-2"
                />
                <textarea
                  rows={4}
                  value={section.body}
                  onChange={(e) => updateSection(idx, { body: e.target.value })}
                  placeholder="Section body. Use double line breaks for paragraphs."
                  className="input"
                />
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
              FAQs ({tool.seo.faqs?.length || 0})
            </h3>
            <button
              type="button"
              onClick={addFaq}
              className="text-xs font-semibold text-primary-600 hover:text-primary-700"
            >
              + Add FAQ
            </button>
          </div>
          <div className="space-y-3">
            {(tool.seo.faqs || []).map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/40 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[var(--color-text-muted)]">
                    FAQ {idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFaq(idx)}
                    className="text-xs text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFaq(idx, { question: e.target.value })}
                  placeholder="Question"
                  className="input mb-2"
                />
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => updateFaq(idx, { answer: e.target.value })}
                  placeholder="Answer"
                  className="input"
                />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <style jsx>{`
        .input {
          width: 100%;
          height: 40px;
          padding: 8px 12px;
          border-radius: 8px;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          font-size: 14px;
          color: var(--color-text);
          outline: none;
        }
        .input:focus {
          border-color: #a78bfa;
          box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.15);
        }
        textarea.input {
          height: auto;
          padding: 10px 12px;
          line-height: 1.5;
          resize: vertical;
        }
      `}</style>
    </form>
  );
}

function SectionTitle({ children }) {
  return <h2 className="font-display font-bold text-base mb-4">{children}</h2>;
}

function Field({ label, full, children }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="block text-xs font-semibold mb-1.5 text-[var(--color-text-muted)]">
        {label}
      </label>
      {children}
    </div>
  );
}
