"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductImageGalleryProps {
  images: string[]
  alt: string
}

export function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/5] w-full bg-[var(--color-charcoal)] rounded-sm flex items-center justify-center text-[var(--color-muted-foreground)]">
        No images available
      </div>
    )
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 flex-shrink-0 hide-scrollbar pb-2 md:pb-0">
        {images.map((image, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              "relative w-20 md:w-full aspect-square bg-[var(--color-charcoal)] rounded-sm overflow-hidden flex-shrink-0 border-2 transition-colors duration-300",
              currentIndex === i ? "border-[var(--color-gold)]" : "border-transparent hover:border-[var(--color-gold)]/50"
            )}
          >
            <Image src={image} alt={`${alt} thumbnail ${i + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative aspect-[4/5] w-full bg-[var(--color-charcoal)] rounded-sm overflow-hidden group cursor-crosshair">
        <Image
          src={images[currentIndex]}
          alt={`${alt} main view`}
          fill
          priority
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.5]"
          style={{ transformOrigin: "center center" }}
          onMouseMove={(e) => {
            const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
            const x = ((e.clientX - left) / width) * 100
            const y = ((e.clientY - top) / height) * 100
            e.currentTarget.style.transformOrigin = `${x}% ${y}%`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transformOrigin = "center center"
          }}
        />
      </div>
    </div>
  )
}
