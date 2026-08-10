'use client'

import { useState, useEffect, startTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { useAuth } from '@/providers/AuthProvider'

export default function ProfilePage() {
  const { user, profile, loading } = useAuth()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (profile) {
      startTransition(() => {
        setName(profile.name || '')
        setPhone(profile.phone || '')
      })
    }
  }, [profile])

  async function handleSave() {
    setSaving(true)
    const supabase = createClient()
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .update({ name, phone })
      .eq('id', user.id)

    if (error) {
      toast.error('Failed to update profile')
    } else {
      toast.success('Profile updated')
    }
    setSaving(false)
  }

  if (loading) {
    return <p className="text-muted-foreground py-8">Loading profile…</p>
  }

  if (!user) {
    return <p className="text-muted-foreground py-8">Please login to view your profile.</p>
  }

  const isDeveloper = profile?.role === 'developer'
  const email = user.email || ''

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Profile</h2>
        <p className="text-sm text-muted-foreground">Manage your personal information</p>
      </div>

      <div className="space-y-4 max-w-md">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="10-digit number" maxLength={10} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={email} disabled className="bg-muted/30" />
          <p className="text-xs text-muted-foreground">Email cannot be changed</p>
          
          {isDeveloper && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mt-2 rounded-full bg-blue-50 border border-blue-200 text-xs font-medium text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 inline-block" />
              Developer account
            </div>
          )}
        </div>
        <Button onClick={handleSave} disabled={saving} className="rounded-full">
          {saving ? 'Saving…' : 'Save changes'}
        </Button>
      </div>
    </div>
  )
}
