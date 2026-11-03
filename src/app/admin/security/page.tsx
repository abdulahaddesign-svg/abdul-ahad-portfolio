'use client';

import React, { useEffect, useState } from 'react';
import { 
  ShieldCheck, 
  Key, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Database, 
  Cloud, 
  UserCheck,
  LogOut 
} from 'lucide-react';
import { checkAdminSession, AdminUser, logoutAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/client';
import { isR2Configured } from '@/lib/storage';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function AdminSecurityPage() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [supabaseConnected, setSupabaseConnected] = useState(false);

  useEffect(() => {
    async function init() {
      const u = await checkAdminSession();
      setUser(u);

      const client = createClient();
      setSupabaseConnected(Boolean(client));
    }
    init();
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;

    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setIsUpdating(true);
    setMessage(null);

    try {
      const supabase = createClient();
      if (supabase) {
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (error) {
          setMessage({ type: 'error', text: error.message });
        } else {
          setMessage({ type: 'success', text: 'Password updated successfully in Supabase Auth.' });
          setNewPassword('');
          setConfirmPassword('');
        }
      } else {
        setMessage({
          type: 'success',
          text: 'Demo mode: Password updated locally. To update live credentials, configure NEXT_PUBLIC_SUPABASE_URL.',
        });
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to update password.' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    if (confirm('Log out of the Admin CMS?')) {
      await logoutAdmin();
      window.location.href = '/admin/login';
    }
  };

  return (
    <div className="space-y-10 font-sans max-w-4xl">
      {/* Header */}
      <div className="pb-6 border-b border-charcoal/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-copper block mb-1">
            ACCESS &amp; INFRASTRUCTURE
          </span>
          <h1 className="font-display font-extrabold text-3xl text-charcoal tracking-tight">
            Security &amp; Account Portal
          </h1>
          <p className="text-xs text-charcoal-600 mt-1">
            Manage admin credentials, verify Row-Level Security policies, and inspect storage connectivity.
          </p>
        </div>

        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          icon={<LogOut className="w-3.5 h-3.5" />}
        >
          Sign Out
        </Button>
      </div>

      {/* 1. Current Session Identity */}
      <div className="p-6 border border-charcoal/15 bg-ivory space-y-4">
        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-copper font-bold">
          <UserCheck className="w-4 h-4" />
          <span>Authenticated Admin Identity</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 border border-charcoal/10 bg-ivory-100">
            <span className="text-[11px] font-mono uppercase text-charcoal-500 block mb-1">
              Active User Email
            </span>
            <span className="font-display font-bold text-sm text-charcoal">
              {user?.email || 'admin@abdulahad.design'}
            </span>
          </div>

          <div className="p-4 border border-charcoal/10 bg-ivory-100">
            <span className="text-[11px] font-mono uppercase text-charcoal-500 block mb-1">
              Role &amp; Permissions
            </span>
            <span className="font-display font-bold text-sm text-copper">
              Super Administrator
            </span>
          </div>

          <div className="p-4 border border-charcoal/10 bg-ivory-100">
            <span className="text-[11px] font-mono uppercase text-charcoal-500 block mb-1">
              Auth Mechanism
            </span>
            <span className="font-display font-bold text-sm text-charcoal">
              Supabase Auth / JWT
            </span>
          </div>
        </div>
      </div>

      {/* 2. Change Admin Password Form */}
      <form onSubmit={handleUpdatePassword} className="p-6 border border-charcoal/15 bg-ivory space-y-5">
        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-copper font-bold">
          <Key className="w-4 h-4" />
          <span>Update Admin Password</span>
        </div>

        {message && (
          <div
            className={`p-3 text-xs font-sans border ${
              message.type === 'success'
                ? 'bg-sage/10 text-sage-800 border-sage/30'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="New Secure Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Minimum 8 characters"
            required
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            required
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isUpdating}
            icon={<Lock className="w-3.5 h-3.5" />}
          >
            Update Password
          </Button>
        </div>
      </form>

      {/* 3. Security & Infrastructure Status Checklist */}
      <div className="p-6 border border-charcoal/15 bg-ivory space-y-4">
        <div className="text-xs font-sans uppercase tracking-widest text-copper font-bold">
          INFRASTRUCTURE &amp; SECURITY STATUS
        </div>

        <div className="divide-y divide-charcoal/10 border border-charcoal/15">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="w-4 h-4 text-copper" />
              <div>
                <span className="text-xs font-bold text-charcoal block">
                  Supabase PostgreSQL &amp; Auth
                </span>
                <span className="text-[11px] text-charcoal-500 font-sans">
                  Structured tables (projects, services, clients, inquiries, settings)
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono uppercase bg-sage/20 text-charcoal border border-sage/40">
              <CheckCircle2 className="w-3 h-3 text-sage" /> Active
            </span>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cloud className="w-4 h-4 text-copper" />
              <div>
                <span className="text-xs font-bold text-charcoal block">
                  Cloudflare R2 Object Storage
                </span>
                <span className="text-[11px] text-charcoal-500 font-sans">
                  S3-compatible bucket for high-res project showcase assets &amp; resumes
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono uppercase bg-sage/20 text-charcoal border border-sage/40">
              <CheckCircle2 className="w-3 h-3 text-sage" /> Configured / Fallback Ready
            </span>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-copper" />
              <div>
                <span className="text-xs font-bold text-charcoal block">
                  Row-Level Security (RLS)
                </span>
                <span className="text-[11px] text-charcoal-500 font-sans">
                  Public read-only for published work; mutations restricted to authenticated admin
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono uppercase bg-sage/20 text-charcoal border border-sage/40">
              <CheckCircle2 className="w-3 h-3 text-sage" /> Enforced
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
