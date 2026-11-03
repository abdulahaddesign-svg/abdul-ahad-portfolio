'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FolderKanban, 
  PlusCircle, 
  MessageSquare, 
  Building2,
  Image as ImageIcon, 
  Settings, 
  ExternalLink,
  LogOut 
} from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { logoutAdmin } from '@/lib/auth';

const NAV_ITEMS = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Projects CMS', href: '/admin/projects', icon: FolderKanban },
  { label: 'New Project', href: '/admin/projects/new', icon: PlusCircle },
  { label: 'Clients', href: '/admin/clients', icon: Building2 },
  { label: 'Client Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { label: 'Site Content', href: '/admin/content', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    if (confirm('Are you sure you want to log out of the Admin CMS?')) {
      await logoutAdmin();
      window.location.href = '/admin/login';
    }
  };

  return (
    <aside className="w-64 bg-charcoal text-ivory border-r border-charcoal-800 flex flex-col justify-between shrink-0 min-h-screen">
      {/* Top Branding */}
      <div>
        <div className="p-6 border-b border-charcoal-800">
          <Logo variant="dark" height={36} />
          <div className="mt-2 text-[10px] font-sans font-bold uppercase tracking-widest text-copper">
            Admin CMS Portal
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5 font-sans" aria-label="Admin Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold tracking-wide transition-colors ${
                  isActive
                    ? 'bg-copper text-ivory'
                    : 'text-charcoal-300 hover:text-ivory hover:bg-charcoal-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-charcoal-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs font-sans text-charcoal-400 hover:text-ivory transition-colors"
        >
          <span>View Live Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-sans font-semibold text-red-400 hover:bg-red-950/40 transition-colors text-left"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
