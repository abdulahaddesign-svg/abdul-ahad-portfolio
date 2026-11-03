'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { checkAdminSession, AdminUser } from '@/lib/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    async function verify() {
      const sessionUser = await checkAdminSession();
      if (!sessionUser && !isLoginPage) {
        router.push('/admin/login');
      } else {
        setUser(sessionUser);
      }
      setIsLoading(false);
    }
    verify();
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <div className="min-h-screen bg-charcoal text-ivory">{children}</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center text-ivory">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-copper border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-sans uppercase tracking-widest text-charcoal-400">
            Verifying Admin Authentication...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-charcoal text-ivory">
      {/* Sidebar (Desktop persistent + Mobile slide-over) */}
      <AdminSidebar />

      {/* Main Admin Workspace */}
      <main className="flex-1 overflow-y-auto min-h-screen bg-ivory text-charcoal pt-14 lg:pt-0">
        <div className="max-w-7xl mx-auto p-4 sm:p-8 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
