import { createClient } from './supabase/client';

export const ADMIN_AUTH_KEY = 'abdul_ahad_admin_session';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

export async function checkAdminSession(): Promise<AdminUser | null> {
  // 1. Try Supabase Auth if configured
  const supabase = createClient();
  if (supabase) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        return {
          id: session.user.id,
          email: session.user.email || 'admin@abdulahad.design',
          name: session.user.user_metadata?.full_name || 'Abdul Ahad J',
          role: 'admin',
        };
      }
    } catch {
      // Fallback
    }
  }

  // 2. Check localStorage in browser
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

export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();

  // Try Supabase Auth first
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (!error && data.user) {
        if (typeof window !== 'undefined') {
          const userObj: AdminUser = {
            id: data.user.id,
            email: data.user.email || cleanEmail,
            name: data.user.user_metadata?.full_name || 'Abdul Ahad J',
            role: 'admin',
          };
          localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(userObj));
        }
        return { success: true };
      }
    } catch {
      // Fall through to fallback
    }
  }

  // Fallback demo admin authentication (for local testing before Supabase project is linked)
  const defaultEmail = (process.env.ADMIN_FALLBACK_EMAIL || 'admin@abdulahad.design').toLowerCase();
  const defaultPass = process.env.ADMIN_FALLBACK_PASSWORD || 'AdminSecure2025!';

  if (cleanEmail === defaultEmail && password === defaultPass) {
    const adminObj: AdminUser = {
      id: 'local-admin-abdul-ahad',
      email: defaultEmail,
      name: 'Abdul Ahad J',
      role: 'admin',
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(adminObj));
    }
    return { success: true };
  }

  return { success: false, error: 'Invalid administrator credentials. Please check your email and password.' };
}

export async function logoutAdmin(): Promise<void> {
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
