"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Share2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface GalleryImage {
  src: string
  alt: string
  title?: string
  description?: string
  category?: string
}

interface GalleryLightboxProps {
  images: GalleryImage[]
  isOpen: boolean
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export function GalleryLightbox({ images, isOpen, currentIndex, onClose, onNext, onPrevious }: GalleryLightboxProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          onPrevious()
          break
        case "ArrowRight":
          onNext()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, onNext, onPrevious])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const currentImage = images[currentIndex]

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentImage.title || "Wedding Photo",
          text: currentImage.description || "Beautiful wedding moment",
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        {/* Header */}
        <motion.div
          className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center text-white">
            <div>
              <h3 className="text-lg font-semibold">{currentImage.title || "Wedding Gallery"}</h3>
              <p className="text-sm text-white/70">
                {currentIndex + 1} of {images.length}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleShare()
                }}
                className="text-white hover:bg-white/20"
              >
                <Share2 size={16} />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                <X size={20} />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="lg"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full w-12 h-12"
          onClick={(e) => {
            e.stopPropagation()
            onPrevious()
          }}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={24} />
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full w-12 h-12"
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          disabled={currentIndex === images.length - 1}
        >
          <ChevronRight size={24} />
        </Button>

        {/* Main Image */}
        <div className="flex items-center justify-center h-full p-16">
          <motion.div
            key={currentIndex}
            className="relative max-w-4xl max-h-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/10 rounded-lg">
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
              <Image
                src={currentImage.src || "/placeholder.svg"}
                alt={currentImage.alt}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false)
                  setImageError(true)
                }}
                priority
              />
            </div>

            {currentImage.description && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-white text-center">{currentImage.description}</p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Thumbnail Strip */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex gap-2 max-w-md overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                className={`relative w-12 h-12 rounded-lg overflow-hidden transition-all ${
                  index === currentIndex ? "ring-2 ring-white scale-110" : "opacity-60 hover:opacity-100"
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  // Handle thumbnail click to change image
                }}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
