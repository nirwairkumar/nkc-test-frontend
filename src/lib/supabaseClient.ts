// src/lib/supabaseClient.ts

// Disabling Supabase client for standalone frontend mode
// The application should now rely entirely on src/data/mock*.ts so this client should not be used.

// Exporting null to ensure any missed usage throws/fails explicitly or safely.
// If you need a dummy object to prevent crashes, we can add it, but null is safer to catch missed migrations.
export const supabase = null;
export default supabase;

