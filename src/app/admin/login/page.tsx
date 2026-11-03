'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { loginAdmin } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your admin email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await loginAdmin(email, password);
      if (res.success) {
        router.push('/admin');
      } else {
        setErrorMessage(res.error || 'Authentication failed. Please verify your credentials.');
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Network error during sign-in.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-charcoal text-ivory selection:bg-copper selection:text-ivory">
      <div className="w-full max-w-md p-8 sm:p-10 bg-charcoal-900 border border-charcoal-800 shadow-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo variant="dark" height={44} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-charcoal-800 text-copper text-[11px] font-sans font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrator Access Portal</span>
          </div>
          <p className="text-xs text-charcoal-400 font-sans">
            Sign in to manage portfolio projects, credentials, inquiries, and site content.
          </p>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="p-4 bg-red-950/60 border border-red-500/50 text-red-300 text-xs font-sans flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal-300 mb-1.5"
            >
              Admin Email
            </label>
            <div className="relative">
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                autoFocus
                placeholder="admin@abdulahad.live"
                className="w-full pl-10 pr-4 py-3 bg-charcoal-950 border border-charcoal-700 text-ivory text-sm font-sans placeholder:text-charcoal-500 focus:outline-none focus:border-copper transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-sans font-bold uppercase tracking-wider text-charcoal-300 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder="Enter admin password"
                className="w-full pl-10 pr-11 py-3 bg-charcoal-950 border border-charcoal-700 text-ivory text-sm font-sans placeholder:text-charcoal-500 focus:outline-none focus:border-copper transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-ivory transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
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

        {/* Security Footer Notice */}
        <div className="pt-2 border-t border-charcoal-800 text-center">
          <span className="text-[11px] font-sans text-charcoal-500 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3 text-copper" />
            <span>Encrypted HTTP-only Session · Rate-limit Protected</span>
          </span>
        </div>
      </div>
    </div>
  );
}
