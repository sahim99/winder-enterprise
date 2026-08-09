import { LandingPage } from '@/components/home/LandingPage'
import { createClient } from '@/lib/supabase/server'

async function getCategoryShelf(categorySlugs: string[], limit = 4) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*, categories!inner(name, slug)')
    .eq('is_published', true)
    .in('categories.slug', categorySlugs)
    .order('created_at', { ascending: false })
    .limit(limit)
  return data ?? []
}

export default async function ShowroomPage() {
  const [fashion, furniture, electronics, essentials] = await Promise.all([
    getCategoryShelf(['fashion', 'clothing', 'shirts', 'pants'], 4),
    getCategoryShelf(['sofas', 'chairs', 'tables', 'beds'], 4),
    getCategoryShelf(['televisions', 'air-conditioners', 'refrigerators', 'washing-machines'], 4),
    getCategoryShelf(['decor', 'lighting', 'kitchen', 'wardrobes', 'dining-sets'], 4),
  ])

  return (
    <LandingPage 
      fashion={fashion} 
      furniture={furniture} 
      electronics={electronics} 
      essentials={essentials} 
    />
  )
}
