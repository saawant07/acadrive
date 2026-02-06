import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    // Warn but don't crash immediately, helps with dev if env vars aren't set yet
    console.warn("Supabase URL or Anon Key is missing. Check your .env file.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
