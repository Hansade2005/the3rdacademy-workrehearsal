import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sowcghvvsjkdotiedpef.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvd2NnaHZ2c2prZG90aWVkcGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MTYyMjgsImV4cCI6MjA5NTI5MjIyOH0.a036cVnuxqj4M__COSxvwth8APrONaYMt25YhaXvIU8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
