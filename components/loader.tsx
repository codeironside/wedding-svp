"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { HeartIcon, Sparkles } from "lucide-react"

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
    <div className="fixed inset-0 bg-gradient-to-br from-[#8E4585] via-[#A855A7] to-[#8E4585] flex flex-col items-center justify-center z-50">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * 1200,
              y: Math.random() * 800,
              opacity: 0,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles className="text-[#FAEEC8]" size={16 + Math.random() * 8} />
          </motion.div>
        ))}
      </div>

      {/* Traditional Nigerian pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23FAEEC8' fillOpacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='10' r='2'/%3E%3Ccircle cx='10' cy='50' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Wedding rings illustration */}
      <div className="relative mb-8">
        <motion.div
          className="relative w-32 h-32 mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          {/* First ring */}
          <div className="absolute top-4 left-4 w-24 h-24 border-8 border-[#E8C7C8] rounded-full opacity-80" />
          {/* Second ring */}
          <div className="absolute top-6 left-6 w-20 h-20 border-6 border-[#FAEEC8] rounded-full opacity-90" />
          {/* Center heart */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <HeartIcon className="text-[#FAEEC8]" size={32} fill="currentColor" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="text-white text-3xl md:text-4xl font-bold mb-4 font-serif text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Adeola & Abiola
      </motion.div>

      <motion.div
        className="text-[#FAEEC8] text-lg mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {loadingText}
      </motion.div>

      <div className="w-80 h-3 bg-white/20 rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FAEEC8] to-[#E8C7C8]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="text-white text-lg font-medium">{progress}%</div>
    </div>
  )
}
