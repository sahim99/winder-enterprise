import { createServiceClient } from '@/lib/supabase/server'
import { BulkUploadForm } from '@/components/admin/BulkUploadForm'

async function getCategories() {
  const supabase = await createServiceClient()
  const { data } = await supabase.from('categories').select('id, name').order('name')
  return data ?? []
}

export default async function AdminBulkUploadPage() {
  const categories = await getCategories()
  return (
    <div className="p-8">
      <BulkUploadForm categories={categories} />
    </div>
  )
}
