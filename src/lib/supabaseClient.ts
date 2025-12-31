// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

let supabaseInstance = null;

if (SUPABASE_URL && SUPABASE_KEY) {
    try {
        supabaseInstance = createClient(String(SUPABASE_URL), String(SUPABASE_KEY));
    } catch (e) {
        console.warn("Supabase initialization failed:", e);
    }
} else {
    console.warn('Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY. Supabase client will be null.');
}

export const supabase = supabaseInstance;
export default supabase;
