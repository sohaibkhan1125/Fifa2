"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { loadTheme, saveTheme } from "@/lib/storage";
import toolsData from "@/data/tools.json";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const t = loadTheme();
    setTheme(t);
  }, []);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
    setToolsOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    saveTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const isActive = (href) =>
    href !== "#" &&
    (pathname === href ||
      (href === "/tools" && pathname?.startsWith("/predictions")));

  const liveTools = toolsData.filter((t) => t.status === "live");
  const comingSoonTools = toolsData.filter((t) => t.status !== "live");

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[var(--color-surface)]/80 backdrop-blur-xl border-b border-[var(--color-border)]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center shadow-glow">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
              <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M12 12L21 7M12 12L3 7M12 12v10" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-display font-bold text-lg">
            Prime<span className="text-primary-600">Tools</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          <NavLink href="/" icon={HomeIcon} active={isActive("/")}>Home</NavLink>

          {/* Tools dropdown */}
          <div ref={toolsRef} className="relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/tools") || toolsOpen
                  ? "bg-[var(--color-primary-soft)] text-primary-600"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)]"
              }`}
              aria-expanded={toolsOpen}
              aria-haspopup="true"
            >
              <ToolsIcon className="w-4 h-4" />
              Tools
              <ChevronDownIcon className={`w-3 h-3 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
            </button>

            {toolsOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-72 bg-white dark:bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-card overflow-hidden animate-scale-in z-50">
                <div className="p-2">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Available Now
                  </div>
                  {liveTools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/predictions/${tool.slug}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--color-primary-soft)] group"
                    >
                      <span className="text-xl">{tool.icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-sm group-hover:text-primary-600">
                          {tool.name}
                        </div>
                        <div className="text-[11px] text-[var(--color-text-muted)] truncate">
                          {tool.shortDescription}
                        </div>
                      </div>
                    </Link>
                  ))}

                  {comingSoonTools.length > 0 && (
                    <>
                      <div className="px-3 py-1.5 mt-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] border-t border-[var(--color-border)] mt-2 pt-3">
                        Coming Soon
                      </div>
                      {comingSoonTools.map((tool) => (
                        <div
                          key={tool.id}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg opacity-70"
                        >
                          <span className="text-xl">{tool.icon}</span>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-sm text-[var(--color-text-muted)]">
                              {tool.name}
                            </div>
                          </div>
                          <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-[var(--color-text-muted)]/15 text-[var(--color-text-muted)] flex-shrink-0">
                            Soon
                          </span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                <Link
                  href="/tools"
                  className="block text-center py-2.5 text-xs font-semibold text-primary-600 hover:bg-[var(--color-primary-soft)] border-t border-[var(--color-border)]"
                >
                  View all tools →
                </Link>
              </div>
            )}
          </div>

          <NavLink href="/predictions/golden-boot" icon={PredictionsIcon} active={pathname?.startsWith("/predictions")}>
            Predictions
          </NavLink>
          <NavLink href="#" icon={RankingsIcon}>Rankings</NavLink>
          <NavLink href="#" icon={BlogIcon}>Blog</NavLink>
          <NavLink href="#" icon={AboutIcon}>About</NavLink>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)] transition-colors btn-press"
          >
            {theme === "dark" ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
          <button className="hidden sm:flex h-10 px-4 items-center justify-center bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg btn-press transition-colors shadow-soft hover:shadow-glow">
            Sign Up
          </button>
          <button
            className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[var(--color-bg)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-white dark:bg-[var(--color-surface)] animate-slide-up">
          <div className="px-4 py-3 flex flex-col gap-1">
            <Link href="/" className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${isActive("/") ? "bg-[var(--color-primary-soft)] text-primary-600" : ""}`}>
              <HomeIcon className="w-4 h-4" />
              Home
            </Link>
            <Link href="/tools" className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${isActive("/tools") ? "bg-[var(--color-primary-soft)] text-primary-600" : ""}`}>
              <ToolsIcon className="w-4 h-4" />
              Tools
            </Link>

            {/* Show available tools inline on mobile */}
            <div className="ml-7 my-1 space-y-0.5 border-l border-[var(--color-border)] pl-3">
              {liveTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/predictions/${tool.slug}`}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-[var(--color-text-muted)] hover:text-primary-600"
                >
                  <span>{tool.icon}</span>
                  {tool.name}
                </Link>
              ))}
            </div>

            <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text)]">
              <RankingsIcon className="w-4 h-4" />
              Rankings
            </a>
            <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text)]">
              <BlogIcon className="w-4 h-4" />
              Blog
            </a>
            <a href="#" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text)]">
              <AboutIcon className="w-4 h-4" />
              About
            </a>
            <button className="mt-2 h-11 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, icon: Icon, children, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-[var(--color-primary-soft)] text-primary-600"
          : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)]"
      }`}
    >
      <Icon className="w-4 h-4" />
      {children}
    </Link>
  );
}

/* ---- Icons ---- */
function HomeIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><path d="M3 10l9-7 9 7v10a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2V10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>); }
function ToolsIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2"/></svg>); }
function PredictionsIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><path d="M12 2l2.4 6.6 7 .5-5.4 4.6 1.7 6.9L12 16.8l-5.7 3.8 1.7-6.9L2.6 9.1l7-.5L12 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>); }
function RankingsIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><path d="M4 19h4v-7H4v7zM10 19h4V5h-4v14zM16 19h4v-10h-4v10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>); }
function BlogIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><path d="M5 4h11a3 3 0 013 3v13a1 1 0 01-1.6.8L15 18H8a3 3 0 01-3-3V4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M9 9h6M9 13h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>); }
function AboutIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 8v.01M11 12h1v4h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>); }
function ChevronDownIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>); }
function SunIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>); }
function MoonIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>); }
function MenuIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>); }
function CloseIcon(props) { return (<svg viewBox="0 0 24 24" fill="none" {...props}><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>); }
