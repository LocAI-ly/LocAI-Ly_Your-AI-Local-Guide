import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const publicAnonKey = process.env.NEXT_PUBLIC_PUBLIC_ANON_KEY


export const supabase = createClient(supabaseUrl, publicAnonKey)
