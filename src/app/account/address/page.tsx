'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

type SavedAddress = {
  address: string
  city: string
  state: string
  pin_code: string
}

export default function AddressPage() {
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('West Bengal')
  const [pinCode, setPinCode] = useState('')
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('saved_address')
        .eq('id', user.id)
        .single()

      if (profile?.saved_address) {
        const addr = profile.saved_address as SavedAddress
        setAddress(addr.address || '')
        setCity(addr.city || '')
        setState(addr.state || 'West Bengal')
        setPinCode(addr.pin_code || '')
      }
      setLoaded(true)
    })
  }, [])

  async function handleSave() {
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const savedAddress: SavedAddress = {
      address,
      city,
      state,
      pin_code: pinCode,
    }

    const { error } = await supabase
      .from('profiles')
      .update({ saved_address: savedAddress })
      .eq('id', user.id)

    if (error) {
      toast.error('Failed to save address')
    } else {
      toast.success('Address saved')
    }
    setSaving(false)
  }

  if (!loaded) {
    return <p className="text-muted-foreground py-8">Loading address…</p>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Saved Address</h2>
        <p className="text-sm text-muted-foreground">Your default delivery address for faster checkout</p>
      </div>

      <div className="space-y-4 max-w-md">
        <div className="space-y-1.5">
          <Label htmlFor="address">Full address</Label>
          <Input id="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="House no., street, landmark" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="pin_code">PIN code</Label>
            <Input id="pin_code" value={pinCode} onChange={e => setPinCode(e.target.value)} placeholder="6-digit PIN" maxLength={6} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="city">City</Label>
            <Input id="city" value={city} onChange={e => setCity(e.target.value)} placeholder="City" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="state">State</Label>
          <Input id="state" value={state} onChange={e => setState(e.target.value)} placeholder="State" />
        </div>
        <Button onClick={handleSave} disabled={saving} className="rounded-full">
          {saving ? 'Saving…' : 'Save address'}
        </Button>
      </div>
    </div>
  )
}
