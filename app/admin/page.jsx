"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { getAllTools, resetAdminChanges, exportToolsAsJson } from "@/lib/toolsRepository";

export default function AdminDashboard() {
  const [tools, setTools] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTools(getAllTools());
  }, []);

  const stats = {
    total: tools.length,
    live: tools.filter((t) => t.status === "live").length,
    comingSoon: tools.filter((t) => t.status === "coming-soon").length,
    featured: tools.filter((t) => t.featured).length,
  };

  const handleExport = () => {
    const json = exportToolsAsJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tools.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (confirm("Reset all admin changes? This will restore the original tools.json.")) {
      resetAdminChanges();
      setTools(getAllTools());
    }
  };

  if (!mounted) return <div className="py-20 text-center text-sm text-[var(--color-text-muted)]">Loading…</div>;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1">Dashboard</h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Welcome to the PrimeTools admin panel. Add, edit, and manage all tools from here.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="h-10 px-4 rounded-xl border border-[var(--color-border)] text-sm font-semibold hover:bg-[var(--color-bg)] btn-press"
          >
            Export tools.json
          </button>
          <Link
            href="/admin/tools/new"
            className="h-10 px-4 inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl btn-press shadow-soft hover:shadow-glow"
          >
            + New Tool
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total Tools" value={stats.total} icon="📦" color="primary" />
        <StatCard label="Live" value={stats.live} icon="🟢" color="emerald" />
        <StatCard label="Coming Soon" value={stats.comingSoon} icon="⏳" color="amber" />
        <StatCard label="Featured" value={stats.featured} icon="⭐" color="rose" />
      </div>

      {/* PoC explainer */}
      <Card padding="md" className="bg-gradient-to-br from-[var(--color-primary-soft)] to-white dark:from-primary-900/20 dark:to-[var(--color-surface)]">
        <h2 className="font-display font-bold text-lg mb-2 flex items-center gap-2">
          🚀 Scalability Proof-of-Concept
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-3">
          This admin panel demonstrates how the PrimeTools ecosystem scales. Adding Tool #100 takes the same time as adding Tool #1:
        </p>
        <ol className="space-y-1.5 text-sm text-[var(--color-text-muted)] list-decimal pl-5">
          <li>Click <strong>+ New Tool</strong> above</li>
          <li>Fill in the form (name, content, FAQs, related tools)</li>
          <li>Choose a tool kind (single-pick, leaderboard, bracket, etc.) — pre-built templates render automatically</li>
          <li>Save — the tool instantly appears in <Link href="/tools" className="text-primary-600 underline">/tools</Link>, in the navbar dropdown, in related-tools sidebars, and gets its own SEO page at <code className="bg-[var(--color-bg)] px-1.5 py-0.5 rounded text-xs">/predictions/&lt;slug&gt;</code></li>
          <li>SEO content, FAQs, and internal links auto-generate from the JSON entry</li>
          <li>Sitemap.xml auto-updates to include the new tool</li>
        </ol>
        <p className="text-xs text-[var(--color-text-muted)] mt-3">
          💡 Changes save to your browser's localStorage. In production, swap the storage adapter in <code className="bg-[var(--color-bg)] px-1 rounded">lib/toolsRepository.js</code> to use Postgres, Supabase, or any database — all consumer code stays the same.
        </p>
      </Card>

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <QuickLink
          href="/admin/tools"
          icon="🛠️"
          title="Manage Tools"
          description="Edit, enable, disable, or delete existing tools"
        />
        <QuickLink
          href="/admin/tools/new"
          icon="➕"
          title="Add New Tool"
          description="Create a new tool — auto-appears across the site"
        />
        <QuickLink
          href="/admin/architecture"
          icon="🏗️"
          title="Architecture"
          description="See how the platform scales to 100+ tools"
        />
      </div>

      {/* Reset */}
      <div className="text-center pt-4">
        <button
          onClick={handleReset}
          className="text-xs text-[var(--color-text-muted)] hover:text-red-600"
        >
          Reset all admin changes
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  const colorMap = {
    primary: "bg-primary-50 text-primary-600 dark:bg-primary-900/20",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/20",
    rose: "bg-rose-50 text-rose-600 dark:bg-rose-900/20",
  };
  return (
    <Card padding="md">
      <div className={`w-10 h-10 rounded-lg ${colorMap[color]} flex items-center justify-center text-xl mb-3`}>
        {icon}
      </div>
      <div className="font-display font-bold text-2xl">{value}</div>
      <div className="text-xs text-[var(--color-text-muted)]">{label}</div>
    </Card>
  );
}

function QuickLink({ href, icon, title, description }) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-[var(--color-border)] bg-white dark:bg-[var(--color-surface)] p-4 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-soft transition-all group"
    >
      <div className="text-2xl mb-2">{icon}</div>
      <div className="font-display font-bold text-sm mb-1 group-hover:text-primary-600">
        {title}
      </div>
      <div className="text-xs text-[var(--color-text-muted)]">{description}</div>
    </Link>
  );
}
