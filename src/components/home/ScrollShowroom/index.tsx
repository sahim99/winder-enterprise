'use client'

import { Suspense, useRef, useState } from 'react'
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
const TOTAL_PAGES = 7

// Camera Z travel range
const CAM_Z_START = 12
const CAM_Z_END = -28
const CAM_Y = 1.8

// ─── CSS Background Layer (DOM-based, fog-immune, always crisp) ───────────────

function BgLayer() {
  const backgrounds = [
    { src: '/winder-shop-v3.png',          label: 'Exterior',   activeFrom: 0,    activeTo: 0.15  },
    { src: '/backgrounds/bg_fashion.png',  label: 'Fashion',    activeFrom: 0.14, activeTo: 0.38  },
    { src: '/backgrounds/bg_furniture.png',label: 'Furniture',  activeFrom: 0.36, activeTo: 0.60  },
    { src: '/backgrounds/bg_electronics.png', label: 'Electronics', activeFrom: 0.58, activeTo: 0.82 },
    { src: '/backgrounds/bg_essentials.png',  label: 'Essentials',  activeFrom: 0.80, activeTo: 1.0  },
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
            transition: 'opacity 0.15s linear',
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
    
    // Update backgrounds manually
    const bgContainer = document.getElementById('showroom-bg-container')
    if (bgContainer) {
      const backgrounds = [
        { activeFrom: 0,    activeTo: 0.15  },
        { activeFrom: 0.14, activeTo: 0.38  },
        { activeFrom: 0.36, activeTo: 0.60  },
        { activeFrom: 0.58, activeTo: 0.82 },
        { activeFrom: 0.80, activeTo: 1.0  },
      ]
      const FADE_RANGE = 0.08
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
    camera.lookAt(0, CAM_Y - 0.2, z - 5)
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
      groupRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 1.5 + position[0]) * 0.06
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
      {/* 3D HTML product card with distanceFactor for true 3D scaling */}
      <Html center transform distanceFactor={7} zIndexRange={[50, 0]}>
        <div
          onClick={(e) => { e.stopPropagation(); onSelect() }}
          style={{
            width: '210px',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            overflow: 'hidden',
            cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.3)',
            transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
            transform: hovered ? 'scale(1.08) translateY(-4px)' : 'scale(1)',
            boxShadow: hovered
              ? '0 0 0 3px #d4a855, 0 20px 40px rgba(0,0,0,0.6)'
              : '0 10px 30px rgba(0,0,0,0.4)',
          }}
        >
          {/* Product Image */}
          <div style={{ height: '170px', background: '#0f172a', overflow: 'hidden', position: 'relative' }}>
            {imageUrl
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>🛍️</div>
            }
            {/* Price badge */}
            <div style={{
              position: 'absolute', bottom: '8px', right: '8px',
              background: '#d4a855', color: '#0f172a',
              padding: '4px 10px', borderRadius: '10px',
              fontSize: '13px', fontWeight: 900,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}>{price}</div>
          </div>
          {/* Product name */}
          <div style={{ padding: '12px 14px', background: hovered ? '#0f172a' : '#ffffff', transition: 'background 0.2s' }}>
            <p style={{
              margin: 0, fontSize: '13px', fontWeight: 800, lineHeight: '1.3',
              color: hovered ? '#ffffff' : '#0f172a',
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>{product.name}</p>
            <p style={{ margin: '4px 0 0', fontSize: '10px', color: hovered ? '#94a3b8' : '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tap to view</p>
          </div>
        </div>
      </Html>

      {/* Invisible hit-test box */}
      <mesh>
        <boxGeometry args={[2.5, 3.5, 0.4]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Floor glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <ringGeometry args={[0.6, 1.2, 32]} />
        <meshBasicMaterial color="#d4a855" transparent opacity={hovered ? 0.6 : 0.18} />
      </mesh>
    </group>
  )
}

// ─── Department Zone ──────────────────────────────────────────────────────────

const ZONE_ICONS: Record<string, string> = {
  'Living Room & Sofas':        '🛋️',
  'Bedroom & Dining':          '🛏️',
  'Televisions & Appliances':   '📺',
  'Home Decor & Essentials':    '✨',
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
          <group position={[0, 4.2, 0]}>
            <mesh>
              <planeGeometry args={[11, 1.5]} />
              <meshBasicMaterial color="#000000" transparent opacity={0.4} />
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

      {/* Product cards arranged in a staggered 3D walkthrough aisle */}
      {valid.map((product, i) => {
        const isLeft = i % 2 === 0
        const xOff = isLeft ? -2.6 : 2.6
        const zOff = -i * 2.2
        return (
          <ProductHotspot
            key={product.id}
            product={product}
            position={[xOff, 0.2, zOff]}
            onSelect={() => onSelect(product)}
          />
        )
      })}
    </group>
  )
}

// ─── 3D Scene ─────────────────────────────────────────────────────────────────

function Scene({ fashion, furniture, electronics, essentials, onSelect }: ShowroomProps & { onSelect: (p: Product) => void }) {
  return (
    <>
      <color attach="background" args={['#000000']} />
      
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 10, 5]} intensity={1.2} />
      
      <CameraController />

      {/* Department Zones along Z-axis */}
      <DepartmentZone name="Living Room & Sofas"      products={fashion}     position={[0, 0, 0]}   onSelect={onSelect} />
      <DepartmentZone name="Bedroom & Dining"          products={furniture}   position={[0, 0, -8]}  onSelect={onSelect} />
      <DepartmentZone name="Televisions & Appliances" products={electronics} position={[0, 0, -16]} onSelect={onSelect} />
      <DepartmentZone name="Home Decor & Essentials"  products={essentials}  position={[0, 0, -24]} onSelect={onSelect} />
    </>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function ScrollShowroom(props: ShowroomProps) {
  const [selected, setSelected] = useState<Product | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative h-[100dvh] w-full bg-black overflow-hidden select-none">
      <div className="absolute inset-0">
        
        {/* Layer 1: CSS background images */}
        <BgLayer />

        {/* Layer 2: 3D canvas */}
        <div className="absolute inset-0">
          <Canvas
            shadows={false}
            dpr={[1, 1.5]}
            camera={{ position: [0, CAM_Y, CAM_Z_START], fov: 55, near: 0.1, far: 100 }}
            gl={{ antialias: true, alpha: true }}
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
