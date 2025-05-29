"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GalleryImage {
  src: string
  alt: string
  title?: string
  description?: string
  category?: string
  aspectRatio?: number
}

interface MasonryGalleryProps {
  images: GalleryImage[]
  onImageClick: (index: number) => void
}

export function MasonryGallery({ images, onImageClick }: MasonryGalleryProps) {
  const [columns, setColumns] = useState(3)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumns(1)
      } else if (window.innerWidth < 1024) {
        setColumns(2)
      } else {
        setColumns(3)
      }
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [])

  // Distribute images across columns
  const distributeImages = () => {
    const columnArrays: GalleryImage[][] = Array.from({ length: columns }, () => [])
    const columnHeights = Array(columns).fill(0)

    images.forEach((image, index) => {
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
      columnArrays[shortestColumnIndex].push({ ...image, originalIndex: index } as any)
      // Estimate height based on aspect ratio or use default
      const estimatedHeight = image.aspectRatio ? 300 / image.aspectRatio : 300
      columnHeights[shortestColumnIndex] += estimatedHeight + 24 // 24px gap
    })

    return columnArrays
  }

  const columnArrays = distributeImages()

  return (
    <div ref={galleryRef} className="w-full">
      <div className={`grid gap-6 ${columns === 1 ? "grid-cols-1" : columns === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
        {columnArrays.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-6">
            {column.map((image: any, imageIndex) => {
              const globalIndex = image.originalIndex
              const isHovered = hoveredIndex === globalIndex

              return (
                <motion.div
                  key={globalIndex}
                  className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: columnIndex * 0.1 + imageIndex * 0.1,
                    type: "spring",
                    stiffness: 50,
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -8 }}
                  onHoverStart={() => setHoveredIndex(globalIndex)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => onImageClick(globalIndex)}
                  style={{ willChange: "transform, opacity" }}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-[#E8C7C8] to-[#F5D5D6]">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      width={400}
                      height={image.aspectRatio ? 400 / image.aspectRatio : 300}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ willChange: "transform" }}
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Floating Hearts Animation */}
                    <motion.div
                      className="absolute top-4 right-4"
                      animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.6, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
                    >
                      <Heart
                        className="text-white drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        size={24}
                        fill="currentColor"
                      />
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                    >
                      <div className="text-white">
                        {image.title && <h3 className="font-semibold text-lg drop-shadow-lg">{image.title}</h3>}
                        {image.category && <p className="text-sm text-white/80 drop-shadow">{image.category}</p>}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            onImageClick(globalIndex)
                          }}
                        >
                          <Eye size={16} />
                        </Button>
                      </div>
                    </motion.div>

                    {/* Decorative Corner Elements */}
                    <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-[#FAEEC8]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#8E4585]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Bottom Info Panel */}
                  {image.description && (
                    <motion.div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm leading-relaxed">{image.description}</p>
                    </motion.div>
                  )}

                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    style={{ willChange: "transform" }}
                  />
                </motion.div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
