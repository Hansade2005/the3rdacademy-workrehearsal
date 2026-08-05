import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hwdqjrppeiyftwlsxpva.supabase.co'
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_9Mfa4wwQoEqESWartQ7-oA_7RjeDkSE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
