import { createClient } from "@supabase/supabase-js";
import { getServerSupabaseEnv } from "@/lib/env";
import { Database } from "@/lib/db/types";

let cachedClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseServerClient() {
  if (cachedClient) return cachedClient;
  const { url, serviceRoleKey } = getServerSupabaseEnv();
  cachedClient = createClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  return cachedClient;
}

