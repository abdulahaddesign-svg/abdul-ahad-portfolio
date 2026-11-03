'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { loginAdmin } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@abdulahad.design');
  const [password, setPassword] = useState('AdminSecure2025!');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await loginAdmin(email, password);
      if (res.success) {
        router.push('/admin');
      } else {
        setErrorMessage(res.error || 'Authentication failed.');
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Login error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-charcoal text-ivory">
      <div className="w-full max-w-md p-8 sm:p-10 bg-charcoal-900 border border-charcoal-800 shadow-2xl space-y-8">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo variant="dark" height={44} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-charcoal-800 text-copper text-[11px] font-sans font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrator Access Portal</span>
          </div>
          <p className="text-xs text-charcoal-400 font-sans">
            Sign in to manage portfolio projects, client inquiries, and site content.
          </p>
        </div>

        {errorMessage && (
          <div className="p-4 bg-red-950/60 border border-red-500/50 text-red-300 text-xs font-sans flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal-300 mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-charcoal-950 border border-charcoal-700 text-ivory text-sm font-sans focus:outline-none focus:border-copper"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 bg-charcoal-950 border border-charcoal-700 text-ivory text-sm font-sans focus:outline-none focus:border-copper"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isLoading}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Access Dashboard
          </Button>
        </form>

        <div className="p-4 bg-charcoal-950 border border-charcoal-800 text-[11px] font-sans text-charcoal-400 space-y-1">
          <span className="font-bold text-copper block uppercase tracking-wider">
            Development Default Credentials:
          </span>
          <div>Email: <code className="text-ivory">admin@abdulahad.design</code></div>
          <div>Password: <code className="text-ivory">AdminSecure2025!</code></div>
          <p className="pt-1 text-[10px] text-charcoal-500">
            Also links to Supabase Auth automatically when Supabase environment variables are provided.
          </p>
        </div>
      </div>
    </div>
  );
}
