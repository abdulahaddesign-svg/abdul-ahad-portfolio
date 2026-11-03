import { createClient } from './supabase/client';

export const ADMIN_AUTH_KEY = 'abdul_ahad_admin_session';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

export async function checkAdminSession(): Promise<AdminUser | null> {
  // 1. Try server HTTP-only session verification
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/admin/me', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(data.user));
          return data.user as AdminUser;
        }
      }
    } catch {
      // Fallback to local check
    }
  }

  // 2. Try Supabase Auth if configured
  const supabase = createClient();
  if (supabase) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const user: AdminUser = {
          id: session.user.id,
          email: session.user.email || 'abdulahad.ofcl@gmail.com',
          name: session.user.user_metadata?.full_name || 'Abdul Ahad J',
          role: 'admin',
        };
        if (typeof window !== 'undefined') {
          localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(user));
        }
        return user;
      }
    } catch {
      // Fallback
    }
  }

  // 3. Check localStorage in browser (offline cache)
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem(ADMIN_AUTH_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed && parsed.email) {
          return parsed as AdminUser;
        }
      } catch {
        localStorage.removeItem(ADMIN_AUTH_KEY);
      }
    }
  }

  return null;
}

export async function loginAdmin(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      if (typeof window !== 'undefined' && data.user) {
        localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(data.user));
      }
      return { success: true };
    }

    return {
      success: false,
      error: data.error || 'Authentication failed. Please verify your credentials.',
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Network connection error during sign-in.',
    };
  }
}

export async function logoutAdmin(): Promise<void> {
  try {
    await fetch('/api/admin/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch {
    // Ignore network error on logout
  }

  const supabase = createClient();
  if (supabase) {
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
  }

  if (typeof window !== 'undefined') {
    localStorage.removeItem(ADMIN_AUTH_KEY);
  }
}
