import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/server'
import { ProductForm } from '@/components/admin/ProductForm'

interface PageProps {
  params: Promise<{ id: string }>
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
  const { id } = await params
  const [product, categories] = await Promise.all([getProduct(id), getCategories()])
  if (!product) notFound()

  const initialData = {
    ...product,
    description: product.description ?? undefined,
    category_id: product.category_id ?? undefined,
    is_published: product.is_published ?? undefined,
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">Edit Product</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Update pricing, inventory, descriptions, and media.</p>
      </div>
      <div className="bg-card rounded-2xl border border-border/50 p-6 sm:p-8 shadow-xs">
        <ProductForm categories={categories} initialData={initialData} mode="edit" />
      </div>
    </div>
  )
}
