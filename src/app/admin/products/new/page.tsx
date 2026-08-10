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
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">Add New Product</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Create and publish a new item into the Winder catalog.</p>
      </div>
      <div className="glass-card p-6 sm:p-8 shadow-xs">
        <ProductForm categories={categories} mode="new" />
      </div>
    </div>
  )
}
