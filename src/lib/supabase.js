import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://excrqfhlnhaceiuowhck.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4Y3JxZmhsbmhhY2VpdW93aGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMjcxOTAsImV4cCI6MjA5MTkwMzE5MH0.1MTAQ2JzuEBs2tYraLUO2MWHk1CArD-3iBWluz7nzMc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper to get public URL for storage files
export const getStorageUrl = (bucket, path) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
