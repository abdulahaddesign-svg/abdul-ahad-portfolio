'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Home,
  PanelTop,
  FolderKanban, 
  Layers,
  Wrench,
  Building2,
  User,
  Briefcase,
  FileText,
  Settings,
  Image as ImageIcon,
  ShieldCheck,
  MessageSquare,
  ExternalLink,
  LogOut,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { logoutAdmin } from '@/lib/auth';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const NAV_SECTIONS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Homepage', href: '/admin/homepage', icon: Home },
  { label: 'Header & Footer', href: '/admin/header-footer', icon: PanelTop },
  { label: 'About', href: '/admin/about', icon: User },
  { label: 'Work Experience', href: '/admin/experience', icon: Briefcase },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Services', href: '/admin/services', icon: Layers },
  { label: 'Tools & Capabilities', href: '/admin/tools', icon: Wrench },
  { label: 'Clients', href: '/admin/clients', icon: Building2 },
  { label: 'Resume', href: '/admin/resume', icon: FileText },
  { label: 'Website Settings', href: '/admin/settings', icon: Settings },
  { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  { label: 'Account & Security', href: '/admin/security', icon: ShieldCheck },
];

interface AdminSidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function AdminSidebar({ isCollapsed = false, onToggleCollapse }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  const collapsed = onToggleCollapse !== undefined ? isCollapsed : internalCollapsed;
  const toggleCollapse = onToggleCollapse || (() => setInternalCollapsed(!internalCollapsed));

  // Global hotkey: Ctrl + B / Cmd + B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleCollapse();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleCollapse]);

  const handleLogout = async () => {
    if (confirm('Are you sure you want to log out of the Admin CMS?')) {
      await logoutAdmin();
      window.location.href = '/admin/login';
    }
  };

  const navContent = (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Brand Header */}
      <div className={`shrink-0 border-b border-charcoal-800 transition-all duration-300 ${collapsed ? 'p-3 py-4 flex flex-col items-center gap-3.5' : 'p-5 flex items-start justify-between'}`}>
        {collapsed ? (
          <>
            {/* Minimized: Monogram Logo in top left / center */}
            <div className="w-full flex justify-center py-1">
              <Logo variant="dark" height={28} showMonogramOnly={true} href="/admin" />
            </div>
            <button
              type="button"
              onClick={toggleCollapse}
              className="p-1.5 text-charcoal-400 hover:text-copper hover:bg-charcoal-800/80 rounded transition-colors"
              title="Expand sidebar (Ctrl+B)"
              aria-label="Expand sidebar"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            {/* Maximized: Primary Logo + Details */}
            <div className="flex-1 min-w-0 pr-2">
              <Logo variant="dark" height={30} href="/admin" />
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-copper">
                  Editorial CMS
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 border border-charcoal-700 text-charcoal-400">
                  v2.0
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleCollapse}
              className="p-1.5 text-charcoal-400 hover:text-copper hover:bg-charcoal-800/80 rounded transition-colors mt-0.5"
              title="Minimize sidebar (Ctrl+B)"
              aria-label="Minimize sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Primary Navigation */}
      <nav className={`flex-1 overflow-y-auto ${collapsed ? 'p-2 space-y-1.5' : 'p-3 space-y-1'} font-sans overscroll-contain`} aria-label="Admin Navigation">
        {NAV_SECTIONS.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <div key={item.href} className="relative group/navitem">
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center transition-all duration-200 ${
                  collapsed
                    ? 'justify-center w-10 h-10 mx-auto rounded-md'
                    : 'gap-3 px-3 py-2 text-[12px] font-semibold tracking-wide'
                } ${
                  isActive
                    ? 'bg-copper text-ivory font-bold shadow-sm'
                    : 'text-charcoal-300 hover:text-ivory hover:bg-charcoal-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-ivory' : 'text-copper'}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>

              {/* Tooltip when collapsed */}
              {collapsed && (
                <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-charcoal-900 border border-charcoal-700 text-ivory text-xs font-sans font-semibold whitespace-nowrap rounded shadow-2xl opacity-0 -translate-x-1 group-hover/navitem:opacity-100 group-hover/navitem:translate-x-0 transition-all z-50">
                  {item.label}
                  <div className="w-2 h-2 bg-charcoal-900 border-l border-b border-charcoal-700 -rotate-45 absolute -left-1 top-1/2 -translate-y-1/2" />
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer System Actions - Fixed at Bottom */}
      <div className={`shrink-0 border-t border-charcoal-800 bg-charcoal transition-all duration-300 ${collapsed ? 'p-2 py-4 flex flex-col items-center gap-3' : 'p-4 space-y-2'}`}>
        {collapsed ? (
          <>
            <div className="relative group/ftip">
              <ThemeToggle showLabel={false} className="w-10 h-10 justify-center p-0 border-charcoal-700 hover:border-copper" />
              <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-charcoal-900 border border-charcoal-700 text-ivory text-xs font-sans whitespace-nowrap rounded shadow-xl opacity-0 -translate-x-1 group-hover/ftip:opacity-100 group-hover/ftip:translate-x-0 transition-all z-50">
                Theme Toggle
              </div>
            </div>

            <div className="relative group/ftip">
              <Link
                href="/"
                target="_blank"
                className="w-10 h-10 flex items-center justify-center text-copper hover:text-ivory hover:bg-charcoal-800/60 rounded transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-charcoal-900 border border-charcoal-700 text-ivory text-xs font-sans whitespace-nowrap rounded shadow-xl opacity-0 -translate-x-1 group-hover/ftip:opacity-100 group-hover/ftip:translate-x-0 transition-all z-50">
                Live Portfolio
              </div>
            </div>

            <div className="relative group/ftip">
              <button
                type="button"
                onClick={handleLogout}
                className="w-10 h-10 flex items-center justify-center text-charcoal-400 hover:text-red-400 hover:bg-red-950/20 rounded transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
              <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-charcoal-900 border border-charcoal-700 text-ivory text-xs font-sans whitespace-nowrap rounded shadow-xl opacity-0 -translate-x-1 group-hover/ftip:opacity-100 group-hover/ftip:translate-x-0 transition-all z-50">
                Log Out
              </div>
            </div>
          </>
        ) : (
          <>
            <ThemeToggle showLabel className="w-full justify-between mb-1" />
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 text-xs font-sans text-charcoal-400 hover:text-ivory hover:bg-charcoal-800/40 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-copper" />
                <span>Live Portfolio</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal-500">
                VIEW
              </span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-sans text-charcoal-400 hover:text-red-300 hover:bg-red-950/20 transition-colors"
            >
              <span className="flex items-center gap-2">
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header Bar with Drawer Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-charcoal text-ivory px-4 py-3 border-b border-charcoal-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo variant="dark" height={26} />
          <span className="text-[10px] font-mono text-copper uppercase tracking-wider">CMS</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-ivory hover:text-copper transition-colors"
          aria-label="Toggle Navigation Drawer"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sliding Drawer (Always full width for usability) */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-72 bg-charcoal text-ivory shadow-2xl border-r border-charcoal-800 flex flex-col h-full">
            {navContent}
          </div>
          <div
            className="fixed inset-y-0 right-0 left-72"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}

      {/* Desktop Persistent Left Sidebar - Supports Minimize / Maximize */}
      <aside className={`hidden lg:flex flex-col bg-charcoal text-ivory border-r border-charcoal-800 shrink-0 sticky top-0 h-screen z-30 transition-all duration-300 ease-in-out ${collapsed ? 'w-[72px]' : 'w-64'}`}>
        {navContent}
      </aside>
    </>
  );
}
