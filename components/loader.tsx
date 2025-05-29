"use client"

import React from "react"
import * as THREE from "three"
import { useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { motion } from "framer-motion"
import { HeartIcon } from "lucide-react"

// Wedding Ring Model Component
function WeddingRings() {
  const heartShape = React.useMemo(() => {
    const shape = new THREE.Shape()

    shape.moveTo(0, 0.5)
    shape.bezierCurveTo(0, 0.8, 0.7, 0.8, 0.7, 0.5)
    shape.bezierCurveTo(0.7, 0, 0, 0, 0, 0.5)

    shape.moveTo(0, 0.5)
    shape.bezierCurveTo(0, 0.8, -0.7, 0.8, -0.7, 0.5)
    shape.bezierCurveTo(-0.7, 0, 0, 0, 0, 0.5)

    return shape
  }, [])

  return (
    <group>
      {/* First Ring */}
      <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1, 0.2, 16, 32]} />
        <meshStandardMaterial color="#E8C7C8" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Second Ring */}
      <mesh position={[0.5, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.8, 0.15, 16, 32]} />
        <meshStandardMaterial color="#FAEEC8" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

export function Loader() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Preparing your invitation...")
  const loadingTexts = [
    "Preparing your invitation...",
    "Arranging the flowers...",
    "Setting up the venue...",
    "Sending out the invites...",
    "Almost ready...",
  ]

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 30)

    // Change loading text periodically
    const textInterval = setInterval(() => {
      setLoadingText(loadingTexts[Math.floor(Math.random() * loadingTexts.length)])
    }, 2000)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-[#8E4585] flex flex-col items-center justify-center z-50">
      <div className="w-full max-w-md h-[400px] mb-8">
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <WeddingRings />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={4} />
          <Environment preset="sunset" />
        </Canvas>
      </div>

      <motion.div
        className="text-white text-2xl font-bold mb-4 font-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Adeola & Abiola
      </motion.div>

      <div className="text-white mb-4 flex items-center">
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
          <HeartIcon className="text-[#E8C7C8] mr-2" size={24} />
        </motion.div>
        <span>{loadingText}</span>
      </div>

      <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#FAEEC8]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="text-white mt-2">{progress}%</div>
    </div>
  )
}
