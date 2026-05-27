'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Image from 'next/image'
import { Upload, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const productSchema = z.object({
  name: z.string().min(2, 'Name required'),
  slug: z.string().min(2, 'Slug required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  description: z.string().optional(),
  price: z.coerce.number().positive('Price must be positive'),
  stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
  category_id: z.string().uuid('Select a category'),
  is_published: z.boolean(),
})

type ProductFormData = z.infer<typeof productSchema>

interface Category {
  id: string
  name: string
}

interface ProductFormProps {
  categories: Category[]
  initialData?: Partial<ProductFormData> & { id?: string; images?: string[] }
  mode: 'new' | 'edit'
}

export function ProductForm({ categories, initialData, mode }: ProductFormProps) {
  const router = useRouter()
  const [images, setImages] = useState<string[]>(initialData?.images ?? [])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      slug: initialData?.slug ?? '',
      description: initialData?.description ?? '',
      price: initialData?.price ?? 0,
      stock: initialData?.stock ?? 0,
      category_id: initialData?.category_id ?? '',
      is_published: initialData?.is_published ?? false,
    },
  })

  function generateSlug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return
    setUploading(true)
    try {
      const uploaded: string[] = []
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error ?? 'Upload failed')
        uploaded.push(data.url)
      }
      setImages(prev => [...prev, ...uploaded])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  function removeImage(index: number) {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  async function onSubmit(data: any) {
    setSaving(true)
    setError('')
    try {
      const payload = { ...data, images }
      const url = mode === 'new' ? '/api/admin/products' : `/api/admin/products/${initialData?.id}`
      const method = mode === 'new' ? 'POST' : 'PUT'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error ?? 'Save failed')
      router.push('/admin/products')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setSaving(false)
    }
  }

  const nameValue = watch('name')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="space-y-1">
        <Label htmlFor="name">Product name</Label>
        <Input
          id="name"
          {...register('name')}
          onChange={e => {
            register('name').onChange(e)
            if (mode === 'new') setValue('slug', generateSlug(e.target.value))
          }}
          placeholder="e.g. Royal 3-Seater Sofa"
        />
        {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
      </div>

      <div className="space-y-1">
        <Label htmlFor="slug">URL slug</Label>
        <Input id="slug" {...register('slug')} placeholder="royal-3-seater-sofa" />
        <p className="text-xs text-gray-500">Auto-generated from name. Only lowercase letters, numbers, and hyphens.</p>
        {errors.slug && <p className="text-xs text-red-600">{errors.slug.message}</p>}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register('description')} rows={4} placeholder="Describe the product..." />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="price">Price (₹)</Label>
          <Input id="price" type="number" {...register('price')} placeholder="0" />
          {errors.price && <p className="text-xs text-red-600">{errors.price.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="stock">Stock quantity</Label>
          <Input id="stock" type="number" {...register('stock')} placeholder="0" />
          {errors.stock && <p className="text-xs text-red-600">{errors.stock.message}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <Label>Category</Label>
        <Select
          defaultValue={initialData?.category_id ?? undefined}
          onValueChange={(val: string | null) => {
            if (val) setValue('category_id', val)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category_id && <p className="text-xs text-red-600">{errors.category_id.message}</p>}
      </div>

      <div className="space-y-3">
        <Label>Product images</Label>
        <div className="flex flex-wrap gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative h-24 w-24 rounded-lg overflow-hidden border group">
              <Image src={img} alt={`Product image ${i + 1}`} fill className="object-cover" sizes="96px" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                aria-label="Remove image"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          ))}
          <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
            {uploading ? (
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            ) : (
              <>
                <Upload className="h-6 w-6 text-gray-400" />
                <span className="text-xs text-gray-500 mt-1">Upload</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </label>
        </div>
        <p className="text-xs text-gray-500">Upload multiple images. First image is the main display image.</p>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="is_published"
          {...register('is_published')}
          className="h-4 w-4 rounded border-gray-300"
        />
        <Label htmlFor="is_published">Published (visible to customers)</Label>
      </div>

      {error && <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>}

      <div className="flex gap-3">
        <Button type="submit" disabled={saving || uploading}>
          {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving…</> : mode === 'new' ? 'Create product' : 'Save changes'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/products')}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
