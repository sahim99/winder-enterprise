import { createServiceClient } from '@/lib/supabase/server'
import { ProductForm } from '@/components/admin/ProductForm'

async function getCategories() {
  const supabase = await createServiceClient()
  const { data } = await supabase.from('categories').select('id, name').order('name')
  return data ?? []
}

export default async function NewProductPage() {
  const categories = await getCategories()
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Add product</h1>
      <ProductForm categories={categories} mode="new" />
    </div>
  )
}
