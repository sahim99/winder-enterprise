import { createClient } from '@/lib/supabase/server'
import { PromoBanner } from './PromoBanner'

export async function PromoBannerWrapper() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  return <PromoBanner />
}
