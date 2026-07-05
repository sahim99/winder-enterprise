import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ProductDetailClient } from './ProductDetailClient'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  return data
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const product = await getProduct(params.slug)
  if (!product) return { title: 'Product not found' }
  return { title: product.name, description: product.description ?? undefined }
}

export default async function ProductDetailPage(props: PageProps) {
  const params = await props.params
  const product = await getProduct(params.slug)
  if (!product) notFound()
  return <ProductDetailClient product={product} />
}
