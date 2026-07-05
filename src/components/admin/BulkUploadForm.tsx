'use client'

import { useState } from 'react'
import { Upload, X, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import Link from 'next/link'

interface Category {
  id: string
  name: string
}

interface BulkUploadFormProps {
  categories: Category[]
}

export function BulkUploadForm({ categories }: BulkUploadFormProps) {
  const [categoryId, setCategoryId] = useState('')
  const [baseName, setBaseName] = useState('')
  const [baseDescription, setBaseDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(1)
  const [isPublished, setIsPublished] = useState(true)
  
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  
  const [uploading, setUploading] = useState(false)
  const [currentStep, setCurrentStep] = useState('')
  const [progress, setProgress] = useState(0) // percentage
  const [completedProducts, setCompletedProducts] = useState<string[]>([])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(e.target.files ?? [])
    if (selectedFiles.length === 0) return
    
    setFiles(prev => [...prev, ...selectedFiles])
    
    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file))
    setPreviews(prev => [...prev, ...newPreviews])
  }

  function removeFile(index: number) {
    setFiles(prev => prev.filter((_, i) => i !== index))
    
    // Revoke object URL
    URL.revokeObjectURL(previews[index])
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  async function handleBulkUpload(e: React.FormEvent) {
    e.preventDefault()
    
    if (!categoryId) {
      toast.error('Please select a category')
      return
    }
    if (files.length === 0) {
      toast.error('Please select at least one catalog image')
      return
    }
    let finalBaseName = baseName.trim()
    if (!finalBaseName) {
      const matchedCat = categories.find(c => c.id === categoryId)
      finalBaseName = matchedCat ? `${matchedCat.name} Item` : 'Catalog Item'
    }

    setUploading(true)
    setCompletedProducts([])
    setProgress(0)

    try {
      const totalSteps = files.length
      const createdNames: string[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const displayIndex = i + 1
        
        // Step 1: Uploading image to Cloudinary
        setCurrentStep(`[${displayIndex}/${totalSteps}] Uploading image to Cloudinary...`)
        const imageFormData = new FormData()
        imageFormData.append('file', file)
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: imageFormData,
        })
        const uploadData = await uploadRes.json()
        if (!uploadRes.ok) throw new Error(uploadData.error ?? `Upload failed for image ${displayIndex}`)
        
        const imageUrl = uploadData.url

        // Step 2: Creating product record
        setCurrentStep(`[${displayIndex}/${totalSteps}] Creating product in database...`)
        const productIndex = displayIndex > 1 ? ` ${displayIndex}` : ''
        const productName = `${finalBaseName}${productIndex}`
        const productSlug = `${generateSlug(finalBaseName)}-${Math.floor(1000 + Math.random() * 9000)}`

        const productPayload = {
          name: productName,
          slug: productSlug,
          description: baseDescription.trim(),
          price: Number(price),
          stock: Number(stock),
          category_id: categoryId,
          is_published: isPublished,
          images: [imageUrl]
        }

        const createRes = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productPayload),
        })
        const createData = await createRes.json()
        if (!createRes.ok) throw new Error(createData.error ?? `Creation failed for product ${displayIndex}`)

        createdNames.push(productName)
        setCompletedProducts(prev => [...prev, productName])
        setProgress(Math.round(((i + 1) / totalSteps) * 100))
      }

      toast.success(`Successfully uploaded ${createdNames.length} products to the catalog!`)
      
      // Reset files
      setFiles([])
      setPreviews([])
      
    } catch (err: any) {
      toast.error(err.message || 'Bulk upload process failed')
    } finally {
      setUploading(false)
      setCurrentStep('')
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bulk Catalog Uploader</h1>
          <p className="text-sm text-gray-500 mt-1">Upload multiple photos to generate a batch of new products for a selected section.</p>
        </div>
      </div>

      <form onSubmit={handleBulkUpload} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Details */}
        <div className="lg:col-span-7 bg-white rounded-2xl border p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">Catalog Details</h2>
          
          <div className="space-y-1">
            <Label htmlFor="category">Target Section / Category</Label>
            <Select 
              value={categoryId} 
              onValueChange={(val) => setCategoryId(val || '')}
              disabled={uploading}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Choose where to list these items" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">Selecting Bed adds items to the Bed section, Refrigerators to Refrigerators section, etc.</p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="baseName">Base Product Name</Label>
            <Input 
              id="baseName" 
              value={baseName} 
              onChange={e => setBaseName(e.target.value)} 
              placeholder="e.g. Luxury Handcrafted Bed" 
              required
              disabled={uploading}
            />
            <p className="text-xs text-gray-500 mt-1">Products will be named "Base Name", "Base Name 2", etc.</p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Base Description</Label>
            <Textarea 
              id="description" 
              value={baseDescription} 
              onChange={e => setBaseDescription(e.target.value)} 
              placeholder="Features, material details, dimensions..." 
              rows={4}
              disabled={uploading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="price">Price (₹)</Label>
              <Input 
                id="price" 
                type="number" 
                value={price} 
                onChange={e => setPrice(Number(e.target.value))} 
                min={0}
                required
                disabled={uploading}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="stock">Initial Stock</Label>
              <Input 
                id="stock" 
                type="number" 
                value={stock} 
                onChange={e => setStock(Number(e.target.value))} 
                min={0}
                required
                disabled={uploading}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 border-t pt-4">
            <input
              type="checkbox"
              id="is_published"
              checked={isPublished}
              onChange={e => setIsPublished(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              disabled={uploading}
            />
            <Label htmlFor="is_published">Publish immediately (visible to customers)</Label>
          </div>
        </div>

        {/* Right Form: Upload & Progress */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* File Picker & Previews */}
          <div className="bg-white rounded-2xl border p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b pb-3">Catalog Photos</h2>
            
            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto p-1 border rounded-lg">
                {previews.map((preview, index) => (
                  <div key={index} className="relative aspect-square border rounded-lg overflow-hidden group">
                    <img src={preview} alt="Catalog preview" className="object-cover h-full w-full" />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      disabled={uploading}
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm font-semibold text-gray-600">Select catalog photos</span>
              <span className="text-xs text-gray-400 mt-1">JPEG, PNG or WEBP. Upload multiple images.</span>
              <input 
                type="file" 
                accept="image/*" 
                multiple 
                className="hidden" 
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>
            <p className="text-[11px] text-gray-400 text-center">Every image uploaded represents a distinct product generated with the left details.</p>
          </div>

          {/* Progress / Status Panel */}
          {uploading && (
            <div className="bg-white rounded-2xl border p-6 space-y-4 shadow-sm animate-pulse">
              <div className="flex items-center gap-3">
                <Loader2 className="h-5 w-5 text-primary animate-spin" />
                <span className="text-sm font-medium text-gray-900">{currentStep}</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-xs text-right text-gray-500">{progress}% complete</div>
            </div>
          )}

          {/* Success summary */}
          {completedProducts.length > 0 && (
            <div className="bg-green-50/50 border border-green-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-green-700 font-semibold">
                <CheckCircle2 className="h-5 w-5" />
                <span>Uploaded Products ({completedProducts.length})</span>
              </div>
              <ul className="text-xs text-green-800 space-y-1.5 max-h-40 overflow-y-auto pl-1">
                {completedProducts.map((name, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl text-base shadow-sm"
            disabled={uploading || files.length === 0}
          >
            {uploading ? (
              <><Loader2 className="h-5 w-5 animate-spin mr-2" />Processing Batch…</>
            ) : (
              `Start Catalog Upload (${files.length} items)`
            )}
          </Button>

        </div>

      </form>
    </div>
  )
}
