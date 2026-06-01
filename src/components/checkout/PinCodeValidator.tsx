"use client"

import { useState } from "react"
import { isValidWestBengalPin } from "@/lib/pincode"
import { CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface PinCodeValidatorProps {
  pin: string
  onChange: (pin: string) => void
  onValidChange: (isValid: boolean) => void
}

export function PinCodeValidator({ pin, onChange, onValidChange }: PinCodeValidatorProps) {
  const [touched, setTouched] = useState(false)
  const isValid = isValidWestBengalPin(pin)

  const handleBlur = () => {
    setTouched(true)
    onValidChange(isValid)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6)
    onChange(val)
    if (val.length === 6) {
      setTouched(true)
      onValidChange(isValidWestBengalPin(val))
    } else {
      onValidChange(false)
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm text-[var(--color-muted-foreground)]">Pin Code *</label>
      <div className="relative">
        <input
          type="text"
          required
          value={pin}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(
            "w-full bg-[var(--color-charcoal)] border border-[var(--color-gold)]/20 text-[var(--color-off-white)] px-4 py-3 rounded-sm focus:outline-none focus:border-[var(--color-gold)]/60 transition-colors",
            touched && pin.length === 6 && !isValid && "border-[var(--color-destructive)]",
            touched && isValid && "border-green-500/50"
          )}
          placeholder="713216"
        />
        {touched && pin.length === 6 && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {isValid ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-[var(--color-destructive)]" />
            )}
          </div>
        )}
      </div>
      {touched && pin.length === 6 && (
        <p className={cn("text-sm", isValid ? "text-green-500" : "text-[var(--color-destructive)]")}>
          {isValid ? "Delivery available." : "Sorry, we don't deliver to this pin code yet."}
        </p>
      )}
    </div>
  )
}
