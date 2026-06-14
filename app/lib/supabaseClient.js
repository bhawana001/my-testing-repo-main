import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// True only when real credentials have been provided (not the placeholders).
export const isSupabaseConfigured =
  !!supabaseUrl &&
  !!supabaseAnonKey &&
  /^https?:\/\//.test(supabaseUrl) &&
  !supabaseUrl.includes("YOUR_PROJECT_URL_HERE");

// Avoid throwing at import time (which crashes the page) when env vars are
// missing — the login page checks `isSupabaseConfigured` and shows guidance.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
