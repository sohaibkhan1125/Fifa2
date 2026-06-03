"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { getAllTools, deleteTool, toggleToolStatus } from "@/lib/toolsRepository";

export default function AdminToolsListPage() {
  const [tools, setTools] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => setTools(getAllTools());

  const handleToggle = (id) => {
    toggleToolStatus(id);
    refresh();
  };

  const handleDelete = (id, name) => {
    if (confirm(`Delete tool "${name}"? This cannot be undone via the admin (the original tools.json file is not modified).`)) {
      deleteTool(id);
      refresh();
    }
  };

  const filtered = tools.filter((t) => {
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || t.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1">Manage Tools</h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            {tools.length} total · {tools.filter((t) => t.status === "live").length} live
          </p>
        </div>
        <Link
          href="/admin/tools/new"
          className="h-10 px-4 inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl btn-press shadow-soft"
        >
          + New Tool
        </Link>
      </div>

      {/* Filter bar */}
      <Card padding="sm">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools..."
            className="flex-1 h-10 px-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-sm focus:outline-none focus:border-primary-400"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-10 px-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] text-sm font-medium cursor-pointer focus:outline-none focus:border-primary-400"
          >
            <option value="all">All Status</option>
            <option value="live">Live</option>
            <option value="coming-soon">Coming Soon</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </Card>

      {/* Tools list */}
      <Card padding="none" className="overflow-hidden">
        <div className="hidden md:grid grid-cols-[48px_1fr_120px_120px_100px_140px] items-center px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] border-b border-[var(--color-border)] bg-[var(--color-bg)]/40">
          <div></div>
          <div>Tool</div>
          <div>Kind</div>
          <div>Category</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        <div className="divide-y divide-[var(--color-border)]">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-[var(--color-text-muted)]">
              No tools match your filter
            </div>
          ) : (
            filtered.map((tool) => (
              <ToolRow key={tool.id} tool={tool} onToggle={handleToggle} onDelete={handleDelete} />
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

function ToolRow({ tool, onToggle, onDelete }) {
  return (
    <div className="grid grid-cols-[36px_1fr_auto] md:grid-cols-[48px_1fr_120px_120px_100px_140px] items-center gap-3 md:gap-4 px-4 md:px-5 py-3.5 hover:bg-[var(--color-bg)]/40">
      <div className="text-2xl">{tool.icon}</div>
      <div className="min-w-0">
        <div className="font-semibold text-sm truncate">{tool.name}</div>
        <div className="text-xs text-[var(--color-text-muted)] truncate">/predictions/{tool.slug}</div>
      </div>
      <div className="hidden md:block">
        <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-[var(--color-bg)] text-[var(--color-text-muted)]">
          {tool.kind}
        </span>
      </div>
      <div className="hidden md:block text-xs text-[var(--color-text-muted)] capitalize">
        {tool.categoryId}
      </div>
      <div className="hidden md:block">
        <StatusBadge status={tool.status} />
      </div>
      <div className="flex items-center gap-1.5 justify-end">
        <Link
          href={`/admin/tools/${tool.id}/edit`}
          className="h-8 px-2.5 inline-flex items-center text-xs font-semibold border border-[var(--color-border)] rounded-md hover:bg-[var(--color-bg)]"
        >
          Edit
        </Link>
        <button
          onClick={() => onToggle(tool.id)}
          className="h-8 px-2.5 text-xs font-semibold border border-[var(--color-border)] rounded-md hover:bg-[var(--color-bg)]"
        >
          {tool.status === "live" ? "Pause" : "Publish"}
        </button>
        <button
          onClick={() => onDelete(tool.id, tool.name)}
          className="h-8 w-8 inline-flex items-center justify-center text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
          aria-label="Delete"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    live: { color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20", label: "Live", dot: "bg-emerald-500" },
    "coming-soon": { color: "bg-amber-50 text-amber-700 dark:bg-amber-900/20", label: "Soon", dot: "bg-amber-500" },
    draft: { color: "bg-slate-100 text-slate-600 dark:bg-slate-800", label: "Draft", dot: "bg-slate-400" },
  };
  const s = map[status] || map.draft;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-md ${s.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
