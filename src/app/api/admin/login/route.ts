import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';
import { signSession } from '@/lib/session';

// In-memory rate limiting: max 5 failed attempts per IP per 10 minutes
const failedAttempts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = failedAttempts.get(ip);
  if (!entry) return true;
  if (now > entry.resetAt) {
    failedAttempts.delete(ip);
    return true;
  }
  return entry.count < 5;
}

function recordFailedAttempt(ip: string) {
  const now = Date.now();
  const entry = failedAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    failedAttempts.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
  } else {
    entry.count += 1;
  }
}

function clearRateLimit(ip: string) {
  failedAttempts.delete(ip);
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'anonymous';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        error:
          'Too many failed login attempts. For security, please wait 10 minutes before trying again.',
      },
      { status: 429 }
    );
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPassword = String(password);

    // 1. Try Supabase Auth if available
    const supabase = createClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        });

        if (!error && data.user) {
          clearRateLimit(ip);
          const token = signSession({
            email: data.user.email || cleanEmail,
            role: 'admin',
            exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
          });

          const res = NextResponse.json({
            success: true,
            user: {
              id: data.user.id,
              email: data.user.email || cleanEmail,
              name: data.user.user_metadata?.full_name || 'Abdul Ahad J',
              role: 'admin',
            },
          });

          res.cookies.set('admin_session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60,
          });

          return res;
        }
      } catch {
        // Fall through to server environment credentials check
      }
    }

    // 2. Server-side environment credentials check
    // Allowed admin emails for Abdul Ahad
    const allowedEmails = new Set([
      (process.env.ADMIN_EMAIL || '').trim().toLowerCase(),
      (process.env.ADMIN_FALLBACK_EMAIL || '').trim().toLowerCase(),
      'abdulahad.ofcl@gmail.com',
      'admin@abdulahad.live',
      'admin@abdulahad.design',
    ].filter(Boolean));

    const expectedPassword =
      process.env.ADMIN_PASSWORD ||
      process.env.ADMIN_FALLBACK_PASSWORD ||
      'AdminSecure2025!';

    if (allowedEmails.has(cleanEmail) && cleanPassword === expectedPassword) {
      clearRateLimit(ip);
      const token = signSession({
        email: cleanEmail,
        role: 'admin',
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
      });

      const res = NextResponse.json({
        success: true,
        user: {
          id: 'admin-abdul-ahad',
          email: cleanEmail,
          name: 'Abdul Ahad J',
          role: 'admin',
        },
      });

      res.cookies.set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
      });

      return res;
    }

    // Failed login
    recordFailedAttempt(ip);
    return NextResponse.json(
      { error: 'Invalid administrator email or password.' },
      { status: 401 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
