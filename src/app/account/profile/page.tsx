'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

export default function ProfilePage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [isDeveloper, setIsDeveloper] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      setEmail(user.email || '')

      const { data: profile } = await supabase
        .from('profiles')
        .select('name, phone, role')
        .eq('id', user.id)
        .single()

      if (profile) {
        setName(profile.name || '')
        setPhone(profile.phone || '')
        setIsDeveloper(profile.role === 'developer')
      }
      setLoaded(true)
    })
  }, [])

  async function handleSave() {
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
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

  if (!loaded) {
    return <p className="text-muted-foreground py-8">Loading profile…</p>
  }

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
