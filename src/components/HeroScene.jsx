import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

// Animated glowing sphere with jelly distortion
const JellySphere = () => {
  const meshRef = useRef()
  const lightRef = useRef()

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.15
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2
    }
    if (lightRef.current) {
      lightRef.current.intensity = 1.5 + Math.sin(clock.getElapsedTime() * 2) * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <Sphere args={[1.8, 64, 64]}>
          <MeshDistortMaterial
            color="#7c3aed"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive="#4c1d95"
            emissiveIntensity={0.3}
            transparent
            opacity={0.85}
          />
        </Sphere>
      </mesh>
      <pointLight ref={lightRef} position={[0, 0, 3]} color="#7c3aed" intensity={1.5} distance={8} />
    </Float>
  )
}

// Orbiting particles ring
const ParticleRing = () => {
  const groupRef = useRef()
  const particleCount = 120

  const positions = useMemo(() => {
    const pos = []
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const radius = 3 + Math.random() * 0.5
      pos.push({
        x: Math.cos(angle) * radius,
        y: (Math.random() - 0.5) * 0.5,
        z: Math.sin(angle) * radius,
        scale: 0.02 + Math.random() * 0.03,
      })
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[pos.scale, 8, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#06b6d4' : '#a855f7'}
            emissive={i % 2 === 0 ? '#06b6d4' : '#a855f7'}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

// Secondary floating icosahedron
const FloatingGem = ({ position }) => {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.5
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={0.3}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#06b6d4"
          distort={0.3}
          speed={3}
          roughness={0.1}
          metalness={0.9}
          emissive="#0e7490"
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
          wireframe
        />
      </mesh>
    </Float>
  )
}

const HeroScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['transparent']} />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#e2e8f0" />
      <pointLight position={[-5, -3, 3]} color="#06b6d4" intensity={0.8} />
      <pointLight position={[5, 3, -3]} color="#a855f7" intensity={0.6} />

      {/* Main Elements */}
      <JellySphere />
      <ParticleRing />
      <FloatingGem position={[3, 1.5, -1]} />
      <FloatingGem position={[-2.5, -1.5, 0.5]} />

      {/* Stars Background */}
      <Stars radius={50} depth={50} count={1000} factor={3} fade speed={1} />

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 2.5}
      />
    </Canvas>
  )
}

export default HeroScene
