import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/server'
import { ProductForm } from '@/components/admin/ProductForm'

interface PageProps {
  params: { id: string }
}

async function getProduct(id: string) {
  const supabase = await createServiceClient()
  const { data } = await supabase.from('products').select('*').eq('id', id).single()
  return data
}

async function getCategories() {
  const supabase = await createServiceClient()
  const { data } = await supabase.from('categories').select('id, name').order('name')
  return data ?? []
}

export default async function EditProductPage({ params }: PageProps) {
  const [product, categories] = await Promise.all([getProduct(params.id), getCategories()])
  if (!product) notFound()

  const initialData = {
    ...product,
    description: product.description ?? undefined,
    category_id: product.category_id ?? undefined,
    is_published: product.is_published ?? undefined,
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit product</h1>
      <ProductForm categories={categories} initialData={initialData} mode="edit" />
    </div>
  )
}
