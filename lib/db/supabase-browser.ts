"use client";

import { createClient } from "@supabase/supabase-js";
import { getPublicSupabaseEnv } from "@/lib/env";
import { Database } from "@/lib/db/types";

let cachedClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseBrowserClient() {
  if (cachedClient) return cachedClient;
  const { url, anonKey } = getPublicSupabaseEnv();
  cachedClient = createClient<Database>(url, anonKey);
  return cachedClient;
}

