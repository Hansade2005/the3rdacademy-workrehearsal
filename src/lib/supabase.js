import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lwlfqqioobnkeiekueuh.supabase.co'
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_-SFM4lstK-gH1xbo5YlkIA_J7UUW3Wg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
