'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

export function GlassDoors() {
  const scroll = useScroll()
  const leftDoorRef = useRef<THREE.Group>(null)
  const rightDoorRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!scroll) return
    
    // The doors should start opening around scroll offset 0.2 and be fully open by 0.3
    // because the camera hits z=5 at roughly offset 0.33
    const offset = scroll.offset
    
    let openProgress = 0
    if (offset > 0.15) {
      // Map 0.15 - 0.25 to 0.0 - 1.0
      openProgress = Math.min((offset - 0.15) * 10, 1)
    }

    // Ease out cubic
    const eased = 1 - Math.pow(1 - openProgress, 3)

    if (leftDoorRef.current && rightDoorRef.current) {
      // Swing doors outward (or slide them)
      // Sliding looks more modern like an automatic mall door
      leftDoorRef.current.position.x = -2 - (eased * 2)
      rightDoorRef.current.position.x = 2 + (eased * 2)
    }
  })

  // Glass material
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.9, // glass effect
    thickness: 0.1,
    transparent: true,
    opacity: 1,
  })

  // Frame material
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    metalness: 0.8,
    roughness: 0.2,
  })

  return (
    <group>
      {/* Left Door */}
      <group ref={leftDoorRef} position={[-2, 1.5, 0]}>
        <mesh material={glassMaterial}>
          <boxGeometry args={[4, 4, 0.1]} />
        </mesh>
        {/* Door handle */}
        <mesh position={[1.5, 0, 0.1]} material={frameMaterial}>
          <cylinderGeometry args={[0.02, 0.02, 0.6]} />
        </mesh>
      </group>

      {/* Right Door */}
      <group ref={rightDoorRef} position={[2, 1.5, 0]}>
        <mesh material={glassMaterial}>
          <boxGeometry args={[4, 4, 0.1]} />
        </mesh>
        {/* Door handle */}
        <mesh position={[-1.5, 0, 0.1]} material={frameMaterial}>
          <cylinderGeometry args={[0.02, 0.02, 0.6]} />
        </mesh>
      </group>
    </group>
  )
}
