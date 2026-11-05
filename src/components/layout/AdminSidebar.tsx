'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Home,
  PanelTop,
  FolderKanban, 
  Layers,
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
  X
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
  { label: 'Clients', href: '/admin/clients', icon: Building2 },
  { label: 'Resume', href: '/admin/resume', icon: FileText },
  { label: 'Website Settings', href: '/admin/settings', icon: Settings },
  { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  { label: 'Account & Security', href: '/admin/security', icon: ShieldCheck },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    if (confirm('Are you sure you want to log out of the Admin CMS?')) {
      await logoutAdmin();
      window.location.href = '/admin/login';
    }
  };

  const navContent = (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-charcoal-800">
          <Logo variant="dark" height={32} />
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-copper">
              Editorial CMS
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 border border-charcoal-700 text-charcoal-400">
              v2.0
            </span>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="p-3 space-y-1 font-sans" aria-label="Admin Navigation">
          {NAV_SECTIONS.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 text-[12px] font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-copper text-ivory font-bold'
                    : 'text-charcoal-300 hover:text-ivory hover:bg-charcoal-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-ivory' : 'text-copper'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer System Actions */}
      <div className="p-4 border-t border-charcoal-800 space-y-2">
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

      {/* Mobile Sliding Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-72 bg-charcoal text-ivory shadow-2xl border-r border-charcoal-800">
            {navContent}
          </div>
          <div
            className="fixed inset-y-0 right-0 left-72"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}

      {/* Desktop Persistent Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-charcoal text-ivory border-r border-charcoal-800 shrink-0 min-h-screen">
        {navContent}
      </aside>
    </>
  );
}
