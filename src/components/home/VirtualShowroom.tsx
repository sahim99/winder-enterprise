'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Billboard, Text, ContactShadows, Float, Html } from '@react-three/drei'
import * as THREE from 'three'
import type { Product } from '@/types/supabase'
import { VirtualShowroomPanel } from './VirtualShowroomPanel'
import { X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VirtualShowroomProps {
  products: Product[]
  onClose: () => void
}

// Category colors for visual variety
const CATEGORY_COLORS: Record<string, string> = {
  sofas:         '#d97706',
  beds:          '#7c3aed',
  chairs:        '#0891b2',
  tables:        '#059669',
  wardrobes:     '#dc2626',
  'dining-sets': '#d97706',
  'office-chairs':'#6d28d9',
  electronics:   '#1d4ed8',
  default:       '#334155',
}

function ProductCard3D({ 
  product, 
  position, 
  onClick 
}: { 
  product: Product
  position: [number, number, number]
  onClick: () => void 
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  // Get the first image from the images array
  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : null
  const categorySlug = product.categories?.slug ?? 'default'
  const cardColor = CATEGORY_COLORS[categorySlug] ?? CATEGORY_COLORS.default

  // Format currency in INR
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price)

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.08
    }
  })

  return (
    <group 
      ref={groupRef}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto' }}
      onClick={(e) => { e.stopPropagation(); onClick() }}
    >
      {/* Product Card Body — rendered as HTML inside the 3D scene for max compatibility */}
      <Html
        center
        distanceFactor={6}
        style={{ pointerEvents: 'none' }}
        occlude={false}
      >
        <div
          style={{
            width: '160px',
            background: hovered ? '#0f172a' : '#ffffff',
            borderRadius: '16px',
            boxShadow: hovered 
              ? `0 0 0 2px ${cardColor}, 0 20px 60px rgba(0,0,0,0.5)` 
              : '0 8px 32px rgba(0,0,0,0.15)',
            overflow: 'hidden',
            transition: 'all 0.2s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            pointerEvents: 'none',
          }}
        >
          {/* Product Image */}
          <div style={{ width: '160px', height: '140px', background: '#f1f5f9', overflow: 'hidden' }}>
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                crossOrigin="anonymous"
              />
            ) : (
              <div style={{ 
                width: '100%', 
                height: '100%', 
                background: cardColor, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '40px'
              }}>
                🛍️
              </div>
            )}
          </div>
          {/* Product Name */}
          <div style={{
            padding: '8px',
            background: hovered ? '#0f172a' : '#ffffff',
            transition: 'background 0.2s ease',
          }}>
            <p style={{
              margin: 0,
              fontSize: '11px',
              fontWeight: 700,
              color: hovered ? '#ffffff' : '#1e293b',
              lineHeight: '1.3',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              transition: 'color 0.2s ease',
            }}>
              {product.name}
            </p>
          </div>
        </div>
      </Html>

      {/* Invisible hit area for 3D raycasting */}
      <mesh visible={false}>
        <boxGeometry args={[1.8, 2.2, 0.1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Floating Price Tag Billboard */}
      <Billboard
        position={[0, 1.6, 0]}
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <Float speed={2} rotationIntensity={0} floatIntensity={0.3}>
          <group>
            <mesh>
              <planeGeometry args={[1.4, 0.45]} />
              <meshBasicMaterial color={hovered ? cardColor : '#ffffff'} transparent opacity={0.95} />
            </mesh>
            {/* Price */}
            <Text
              position={[0, 0, 0.01]}
              fontSize={0.16}
              color={hovered ? '#ffffff' : '#0f172a'}
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              {formattedPrice}
            </Text>
          </group>
        </Float>
      </Billboard>

      {/* Product name label */}
      <Billboard position={[0, -1.6, 0]}>
        <Text
          fontSize={0.11}
          color={hovered ? '#ffffff' : '#475569'}
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
          textAlign="center"
        >
          {product.name}
        </Text>
      </Billboard>

      {/* Floor shadow glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.51, 0]}>
        <circleGeometry args={[0.6, 32]} />
        <meshBasicMaterial color={cardColor} transparent opacity={hovered ? 0.3 : 0.1} />
      </mesh>

      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={3} blur={2} far={3} />
    </group>
  )
}

function ShowroomScene({ 
  products, 
  onSelectProduct 
}: { 
  products: Product[]
  onSelectProduct: (p: Product) => void 
}) {
  const validProducts = products.slice(0, 5)

  return (
    <>
      <color attach="background" args={['#0f172a']} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[0, 5, 0]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, 3, -5]} intensity={0.4} color="#6366f1" />
      <pointLight position={[5, 3, -5]} intensity={0.4} color="#f59e0b" />

      <Environment preset="night" blur={0.8} />

      {/* Glossy showroom floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.5} />
      </mesh>

      {/* Product Displays arranged in a wide arc */}
      {validProducts.map((product, index) => {
        const count = validProducts.length
        const spread = Math.min(count - 1, 4) * 0.5
        const angle = count > 1 ? (index / (count - 1) - 0.5) * spread * 1.2 : 0
        const radius = 5.5
        const x = Math.sin(angle) * radius
        const z = -Math.cos(angle) * radius + 1.5

        return (
          <ProductCard3D
            key={product.id}
            product={product}
            position={[x, 0, z]}
            onClick={() => onSelectProduct(product)}
          />
        )
      })}

      <OrbitControls
        makeDefault
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={2}
        maxDistance={12}
        enablePan={false}
        autoRotate={false}
      />
    </>
  )
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 bg-gray-900/95 border border-white/10 p-8 rounded-2xl backdrop-blur-md shadow-2xl whitespace-nowrap">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="font-bold text-white text-lg">Loading Virtual Showroom...</p>
        <p className="text-gray-400 text-sm">Preparing your 3D experience</p>
      </div>
    </Html>
  )
}

export default function VirtualShowroom({ products, onClose }: VirtualShowroomProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.cursor = 'auto'
    }
  }, [])

  // Filter out products without a name just in case
  const validProducts = products.filter(p => p.name && p.price)

  return (
    <div className="fixed inset-0 z-[100] bg-gray-950 animate-in fade-in duration-300">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-5 left-5 z-[110] rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 h-12 w-12 shadow-xl"
      >
        <X className="h-5 w-5" />
      </Button>

      {/* Top Center Badge */}
      <div className="absolute top-5 left-0 right-0 flex justify-center z-[110] pointer-events-none">
        <div className="bg-white/5 backdrop-blur-md text-white px-5 py-2 rounded-full border border-white/10 shadow-2xl flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
          <span className="font-bold tracking-[0.15em] uppercase text-xs">Live 3D Showroom</span>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-[110] pointer-events-none">
        <p className="text-white/50 font-medium text-xs bg-black/30 px-5 py-2 rounded-full backdrop-blur-md border border-white/10">
          Drag to rotate • Scroll to zoom • Click a product to view details
        </p>
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-full relative">
        <Canvas shadows camera={{ position: [0, 1, 6], fov: 55 }}>
          <Suspense fallback={<Loader />}>
            <ShowroomScene products={validProducts} onSelectProduct={setSelectedProduct} />
          </Suspense>
        </Canvas>

        {/* Product Detail Panel */}
        {selectedProduct && (
          <VirtualShowroomPanel
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </div>
  )
}
