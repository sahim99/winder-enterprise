'use client'

import { Suspense, useRef, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll, Preload, Text, Html, Billboard, Float } from '@react-three/drei'
import * as THREE from 'three'
import type { Product } from '@/types/supabase'
import { VirtualShowroomPanel } from '../VirtualShowroomPanel'

// ─── Types ──────────────────────────────────────────────────────────────────

interface ShowroomProps {
  fashion: Product[]
  furniture: Product[]
  electronics: Product[]
  essentials: Product[]
}

// ─── Utility ──────────────────────────────────────────────────────────────────

function formatINR(price: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(price)
}

// ─── Scene Layout constants ───────────────────────────────────────────────────
// Total scroll pages = 6, so scroll.offset goes 0 → 1 over 6 screen heights
// Departments appear at: 20%, 40%, 60%, 80% of scroll
const TOTAL_PAGES = 6
const DEPT_OFFSETS = [0.18, 0.40, 0.62, 0.82] // scroll offset when each zone is front-and-center

// Camera Z travel
const CAM_Z_START = 10
const CAM_Z_END = -10
const CAM_Y = 2

// ─── CSS Background Layer (DOM-based, fog-immune, always crisp) ───────────────

function BgLayer() {
  const backgrounds = [
    { src: '/winder-shop-v3.png',          label: 'Exterior',   activeFrom: 0,    activeTo: 0.15  },
    { src: '/backgrounds/bg_fashion.png',  label: 'Fashion',    activeFrom: 0.14, activeTo: 0.34  },
    { src: '/backgrounds/bg_furniture.png',label: 'Furniture',  activeFrom: 0.34, activeTo: 0.54  },
    { src: '/backgrounds/bg_electronics.png', label: 'Electronics', activeFrom: 0.54, activeTo: 0.74 },
    { src: '/backgrounds/bg_essentials.png',  label: 'Essentials',  activeFrom: 0.74, activeTo: 1.0  },
  ]

  return (
    <div id="showroom-bg-container" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {backgrounds.map((bg, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('${bg.src}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === 0 ? 1 : 0,
            transition: 'opacity 0.1s linear',
            willChange: 'opacity',
          }}
        />
      ))}
    </div>
  )
}

// ─── Camera Controller ────────────────────────────────────────────────────────

function CameraController() {
  const scroll = useScroll()

  useFrame(({ camera }) => {
    const offset = scroll.offset
    
    // Update backgrounds manually to bypass 60fps React renders
    const bgContainer = document.getElementById('showroom-bg-container')
    if (bgContainer) {
      const backgrounds = [
        { activeFrom: 0,    activeTo: 0.15  },
        { activeFrom: 0.14, activeTo: 0.34  },
        { activeFrom: 0.34, activeTo: 0.54  },
        { activeFrom: 0.54, activeTo: 0.74 },
        { activeFrom: 0.74, activeTo: 1.0  },
      ]
      const FADE_RANGE = 0.06
      for (let i = 0; i < backgrounds.length; i++) {
        const bg = backgrounds[i]
        let opacity = 0
        if (offset < bg.activeFrom - FADE_RANGE) opacity = 0
        else if (offset < bg.activeFrom) opacity = (offset - (bg.activeFrom - FADE_RANGE)) / FADE_RANGE
        else if (offset <= bg.activeTo) opacity = 1
        else if (offset < bg.activeTo + FADE_RANGE) opacity = 1 - (offset - bg.activeTo) / FADE_RANGE
        else opacity = 0

        const child = bgContainer.children[i] as HTMLElement
        if (child) child.style.opacity = opacity.toString()
      }
    }

    const z = CAM_Z_START + offset * (CAM_Z_END - CAM_Z_START)
    camera.position.set(0, CAM_Y, z)
    camera.lookAt(0, CAM_Y, z - 5)
  })

  return null
}

// ─── Product Hotspot ──────────────────────────────────────────────────────────

function ProductHotspot({ product, position, onSelect }: {
  product: Product
  position: [number, number, number]
  onSelect: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef<THREE.Group>(null)
  const imageUrl = product.images?.[0] ?? null
  const price = formatINR(product.price)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 1.5 + position[0]) * 0.08
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto' }}
      onClick={(e) => { e.stopPropagation(); onSelect() }}
    >
      {/* HTML product card — no distanceFactor, so it's always full-size DOM overlay */}
      <Html center zIndexRange={[50, 0]} occlude={false}>
        <div
          onClick={(e) => { e.stopPropagation(); onSelect() }}
          style={{
            width: '170px',
            background: 'rgba(255,255,255,0.98)',
            borderRadius: '18px',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
            transform: hovered ? 'scale(1.1) translateY(-6px)' : 'scale(1)',
            boxShadow: hovered
              ? '0 0 0 3px #d4a855, 0 20px 50px rgba(0,0,0,0.8)'
              : '0 6px 24px rgba(0,0,0,0.6)',
          }}
        >
          {/* Product Image */}
          <div style={{ height: '145px', background: '#1e293b', overflow: 'hidden', position: 'relative' }}>
            {imageUrl
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>🛍️</div>
            }
            {/* Price badge */}
            <div style={{
              position: 'absolute', bottom: '8px', right: '8px',
              background: '#d4a855', color: '#0f172a',
              padding: '3px 9px', borderRadius: '8px',
              fontSize: '12px', fontWeight: 900,
            }}>{price}</div>
          </div>
          {/* Product name */}
          <div style={{ padding: '10px 12px', background: hovered ? '#0f172a' : '#fff', transition: 'background 0.2s' }}>
            <p style={{
              margin: 0, fontSize: '13px', fontWeight: 800, lineHeight: '1.3',
              color: hovered ? '#fff' : '#0f172a',
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>{product.name}</p>
            <p style={{ margin: '4px 0 0', fontSize: '10px', color: hovered ? '#94a3b8' : '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Tap to view</p>
          </div>
        </div>
      </Html>

      {/* Invisible hit-test box */}
      <mesh>
        <boxGeometry args={[2, 3, 0.4]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Floor glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <ringGeometry args={[0.5, 1, 32]} />
        <meshBasicMaterial color="#d4a855" transparent opacity={hovered ? 0.5 : 0.12} />
      </mesh>
    </group>
  )
}

// ─── Department Zone ──────────────────────────────────────────────────────────

const ZONE_ICONS: Record<string, string> = {
  'Fashion & Lifestyle':          '👗',
  'Furniture & Home Décor':       '🛋️',
  'Electronics & Appliances':     '📺',
  'Home Essentials':              '🏠',
}

function DepartmentZone({ name, products, position, onSelect }: {
  name: string
  products: Product[]
  position: [number, number, number]
  onSelect: (p: Product) => void
}) {
  const valid = products.filter(p => p.name && p.price).slice(0, 4)
  const icon = ZONE_ICONS[name] ?? '🏪'

  return (
    <group position={position}>
      {/* Overhead department sign */}
      <Billboard follow>
        <Float speed={1} rotationIntensity={0} floatIntensity={0.1}>
          <group position={[0, 4, 0]}>
            <mesh>
              <planeGeometry args={[10, 1.4]} />
              <meshBasicMaterial color="#000000" transparent opacity={0.35} />
            </mesh>
            <Text
              position={[0, 0, 0.01]}
              fontSize={0.55}
              color="#d4a855"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.1}
            >
              {`${icon}  ${name.toUpperCase()}`}
            </Text>
          </group>
        </Float>
      </Billboard>

      {/* Product cards spread horizontally */}
      {valid.map((product, i) => {
        const spacing = 3.2
        const xOff = (i - (valid.length - 1) / 2) * spacing
        return (
          <ProductHotspot
            key={product.id}
            product={product}
            position={[xOff, 0.5, 0]}
            onSelect={() => onSelect(product)}
          />
        )
      })}
    </group>
  )
}

// ─── 3D Scene (transparent canvas over the CSS backgrounds) ──────────────────

function Scene({ fashion, furniture, electronics, essentials, onSelect }: ShowroomProps & { onSelect: (p: Product) => void }) {
  return (
    <>
      {/* Transparent background — CSS layers show through */}
      <color attach="background" args={['#000000']} />
      
      <ambientLight intensity={0.7} />
      <directionalLight position={[0, 10, 5]} intensity={1.2} />
      
      <CameraController />

      {/* Department Zones — positioned so they appear center-screen at the right scroll offset */}
      {/* Fashion: visible at scroll 18-34%, centered at 26% */}
      <DepartmentZone name="Fashion & Lifestyle"      products={fashion}     position={[0, 0, -1]}  onSelect={onSelect} />
      {/* Furniture: visible at scroll 34-54%, centered at 47% */}
      <DepartmentZone name="Furniture & Home Décor"   products={furniture}   position={[0, 0, -5]}  onSelect={onSelect} />
      {/* Electronics: visible at scroll 54-74%, centered at 64% */}
      <DepartmentZone name="Electronics & Appliances" products={electronics} position={[0, 0, -9]}  onSelect={onSelect} />
      {/* Essentials: visible at scroll 74-100%, centered at 87% */}
      <DepartmentZone name="Home Essentials"          products={essentials}  position={[0, 0, -13]} onSelect={onSelect} />
    </>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function ScrollShowroom(props: ShowroomProps) {
  const [selected, setSelected] = useState<Product | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative h-[100dvh] w-full bg-black overflow-hidden">
      {/* Viewport locked to screen, ScrollControls handles internal scrolling */}
      <div className="absolute inset-0">
        
        {/* Layer 1: CSS background images (crisp, no fog, smooth crossfade) */}
        <BgLayer />

        {/* Layer 2: 3D canvas rendered over the backgrounds (transparent bg) */}
        <div className="absolute inset-0">
          <Canvas
            shadows={false}
            dpr={[1, 1.5]}
            camera={{ position: [0, CAM_Y, CAM_Z_START], fov: 55, near: 0.1, far: 100 }}
            gl={{ antialias: true, alpha: true }} // alpha: true so canvas is transparent!
          >
            <Suspense fallback={null}>
              <ScrollControls pages={TOTAL_PAGES} damping={0.2}>
                <Scene {...props} onSelect={setSelected} />
              </ScrollControls>
              <Preload all />
            </Suspense>
          </Canvas>
        </div>

        {/* Layer 3: Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-2 opacity-80">
          <p className="text-white text-[10px] font-black tracking-[0.25em] uppercase drop-shadow-lg">Scroll to Walk Forward</p>
          <div className="w-5 h-8 border-2 border-white/70 rounded-full flex justify-center pt-1.5">
            <div className="w-0.5 h-1.5 bg-white rounded-full animate-bounce" />
          </div>
        </div>

        {/* Layer 4: Product detail panel */}
        {selected && (
          <div className="absolute inset-y-0 right-0 z-50 pointer-events-auto">
            <VirtualShowroomPanel product={selected} onClose={() => setSelected(null)} />
          </div>
        )}
      </div>
    </div>
  )
}
