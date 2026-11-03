import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';

let clientInstance: SupabaseClient | null = null;

export function createClient(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  if (clientInstance) {
    return clientInstance;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wsTransport: any = undefined;
  if (typeof window === 'undefined') {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      wsTransport = require('ws');
    } catch {
      // ignore
    }
  }

  clientInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: typeof window !== 'undefined',
      autoRefreshToken: typeof window !== 'undefined',
    },
    realtime: wsTransport ? { transport: wsTransport } : undefined,
  });

  return clientInstance;
}
