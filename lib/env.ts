const requiredServerEnv = ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"] as const;
const requiredPublicEnv = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"] as const;

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getServerSupabaseEnv() {
  requiredServerEnv.forEach((name) => getEnvVar(name));
  return {
    url: getEnvVar("NEXT_PUBLIC_SUPABASE_URL"),
    serviceRoleKey: getEnvVar("SUPABASE_SERVICE_ROLE_KEY")
  };
}

export function getPublicSupabaseEnv() {
  requiredPublicEnv.forEach((name) => getEnvVar(name));
  return {
    url: getEnvVar("NEXT_PUBLIC_SUPABASE_URL"),
    anonKey: getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY")
  };
}

