"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import {
  Heart,
  Eye,
  Share2,
  Bookmark,
  Play,
  ZoomIn,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category?: string;
  aspectRatio?: number;
  tags?: string[];
  featured?: boolean;
  isVideo?: boolean;
}

interface MasonryGalleryProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
  showCategories?: boolean;
  enableInfiniteScroll?: boolean;
  categoryFilter?: string;
}

export function MasonryGallery({
  images,
  onImageClick,
  showCategories = true,
  enableInfiniteScroll = false,
  categoryFilter,
}: MasonryGalleryProps) {
  const [columns, setColumns] = useState(3);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [bookmarkedImages, setBookmarkedImages] = useState<Set<number>>(
    new Set()
  );
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [visibleImages, setVisibleImages] = useState(12);
  const galleryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(galleryRef, { once: false });

  // Responsive columns with smoother breakpoints
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 520) {
        setColumns(1);
      } else if (width < 768) {
        setColumns(2);
      } else if (width < 1200) {
        setColumns(3);
      } else if (width < 1600) {
        setColumns(4);
      } else {
        setColumns(5);
      }
    };

    updateColumns();
    const debouncedUpdate = debounce(updateColumns, 100);
    window.addEventListener("resize", debouncedUpdate);
    return () => window.removeEventListener("resize", debouncedUpdate);
  }, []);

  // Debounce utility
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), wait);
    };
  };

  // Filter images by category if specified
  const filteredImages = categoryFilter
    ? images.filter((img) => img.category === categoryFilter)
    : images;

  // Show only visible images for performance
  const displayImages = enableInfiniteScroll
    ? filteredImages.slice(0, visibleImages)
    : filteredImages;

  // Advanced image distribution with better balancing
  const distributeImages = useCallback(() => {
    const columnArrays: (GalleryImage & { originalIndex: number })[][] =
      Array.from({ length: columns }, () => []);
    const columnHeights = Array(columns).fill(0);

    displayImages.forEach((image, index) => {
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );
      columnArrays[shortestColumnIndex].push({
        ...image,
        originalIndex: index,
      });

      // Better height estimation
      let estimatedHeight = 320;
      if (image.aspectRatio) {
        estimatedHeight = Math.max(200, Math.min(500, 300 / image.aspectRatio));
      }

      // Add extra height for featured images
      if (image.featured) {
        estimatedHeight *= 1.2;
      }

      columnHeights[shortestColumnIndex] += estimatedHeight + 24;
    });

    return columnArrays;
  }, [displayImages, columns]);

  const columnArrays = distributeImages();

  // Actions
  const toggleLike = useCallback((index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedImages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const toggleBookmark = useCallback((index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedImages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const handleShare = useCallback(
    async (image: GalleryImage, e: React.MouseEvent) => {
      e.stopPropagation();
      if (navigator.share) {
        try {
          await navigator.share({
            title: image.title || "Beautiful Image",
            text: image.description || "Check out this amazing image!",
            url: image.src,
          });
        } catch (error) {
          console.log("Error sharing:", error);
        }
      }
    },
    []
  );

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => new Set([...prev, index]));
  }, []);

  // Infinite scroll
  useEffect(() => {
    if (!enableInfiniteScroll) return;

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1000
      ) {
        setVisibleImages((prev) => Math.min(prev + 8, filteredImages.length));
      }
    };

    const debouncedScroll = debounce(handleScroll, 100);
    window.addEventListener("scroll", debouncedScroll);
    return () => window.removeEventListener("scroll", debouncedScroll);
  }, [enableInfiniteScroll, filteredImages.length]);

  return (
    <div ref={galleryRef} className="w-full px-4 md:px-6 lg:px-8">
      {/* Header with stats */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-2">
          Gallery Collection
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {displayImages.length} beautiful{" "}
          {displayImages.length === 1 ? "image" : "images"}
          {categoryFilter && ` in ${categoryFilter}`}
        </p>
      </motion.div>

      <div
        className={`grid gap-4 md:gap-6 transition-all duration-500 ${
          columns === 1
            ? "grid-cols-1"
            : columns === 2
            ? "grid-cols-2"
            : columns === 3
            ? "grid-cols-3"
            : columns === 4
            ? "grid-cols-4"
            : "grid-cols-5"
        }`}
      >
        {columnArrays.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-4 md:gap-6">
            {column.map((image, imageIndex) => {
              const globalIndex = image.originalIndex;
              const isHovered = hoveredIndex === globalIndex;
              const isLiked = likedImages.has(globalIndex);
              const isBookmarked = bookmarkedImages.has(globalIndex);
              const isLoaded = loadedImages.has(globalIndex);

              return (
                <motion.div
                  key={globalIndex}
                  className="relative group cursor-pointer"
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: columnIndex * 0.1 + imageIndex * 0.15,
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{
                    y: -12,
                    scale: 1.02,
                    transition: { duration: 0.4, ease: "easeOut" },
                  }}
                  onHoverStart={() => setHoveredIndex(globalIndex)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => onImageClick(globalIndex)}
                  style={{ willChange: "transform, opacity" }}
                >
                  {/* Main Image Container */}
                  <div
                    className={`
                    relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl 
                    transition-all duration-500 border border-white/20
                    ${
                      image.featured
                        ? "ring-2 ring-gradient-to-r ring-pink-400/50"
                        : ""
                    }
                    bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800
                  `}
                  >
                    {/* Featured Badge */}
                    {image.featured && (
                      <motion.div
                        className="absolute top-3 left-3 z-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        <Sparkles size={12} />
                        Featured
                      </motion.div>
                    )}

                    {/* Video Play Button */}
                    {image.isVideo && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center z-10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="bg-black/60 backdrop-blur-sm rounded-full p-4">
                          <Play
                            className="text-white"
                            size={32}
                            fill="currentColor"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Loading State */}
                    {!isLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 z-10">
                        <div className="w-8 h-8 border-2 border-pink-400 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}

                    {/* Main Image */}
                    <div className="relative overflow-hidden">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        width={600}
                        height={
                          image.aspectRatio ? 600 / image.aspectRatio : 400
                        }
                        className={`
                          w-full h-auto object-cover transition-all duration-700 
                          group-hover:scale-110 group-hover:brightness-110
                          ${!isLoaded ? "opacity-0" : "opacity-100"}
                        `}
                        style={{ willChange: "transform, filter" }}
                        loading="lazy"
                        quality={85}
                        onLoad={() => handleImageLoad(globalIndex)}
                      />

                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Floating Action Buttons */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          className="absolute top-3 right-3 flex flex-col gap-2 z-20"
                          initial={{ opacity: 0, x: 20, scale: 0.8 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 20, scale: 0.8 }}
                          transition={{ duration: 0.3, staggerChildren: 0.1 }}
                        >
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <Button
                              size="sm"
                              variant="ghost"
                              className={`
                                backdrop-blur-md rounded-full w-10 h-10 p-0 border border-white/20
                                ${
                                  isLiked
                                    ? "bg-pink-500/90 text-white hover:bg-pink-600/90"
                                    : "bg-white/20 text-white hover:bg-white/30"
                                }
                                transition-all duration-300
                              `}
                              onClick={(e) => toggleLike(globalIndex, e)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Heart
                                size={16}
                                fill={isLiked ? "currentColor" : "none"}
                                className={isLiked ? "animate-pulse" : ""}
                              />
                            </Button>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <Button
                              size="sm"
                              variant="ghost"
                              className={`
                                backdrop-blur-md rounded-full w-10 h-10 p-0 border border-white/20
                                ${
                                  isBookmarked
                                    ? "bg-amber-500/90 text-white hover:bg-amber-600/90"
                                    : "bg-white/20 text-white hover:bg-white/30"
                                }
                                transition-all duration-300
                              `}
                              onClick={(e) => toggleBookmark(globalIndex, e)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Bookmark
                                size={16}
                                fill={isBookmarked ? "currentColor" : "none"}
                              />
                            </Button>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <Button
                              size="sm"
                              variant="ghost"
                              className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-md rounded-full w-10 h-10 p-0 border border-white/20 transition-all duration-300"
                              onClick={(e) => handleShare(image, e)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Share2 size={16} />
                            </Button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Bottom Content Panel */}
                    <AnimatePresence>
                      {(image.title || image.description || showCategories) && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? 0 : 20,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="text-white">
                            {image.title && (
                              <h3 className="font-bold text-lg mb-1 drop-shadow-lg">
                                {image.title}
                              </h3>
                            )}

                            {image.description && (
                              <p className="text-sm text-white/90 mb-2 line-clamp-2 leading-relaxed">
                                {image.description}
                              </p>
                            )}

                            <div className="flex items-center justify-between">
                              {showCategories && image.category && (
                                <span className="inline-block bg-white/20 backdrop-blur-sm text-white/90 px-2 py-1 rounded-full text-xs font-medium">
                                  {image.category}
                                </span>
                              )}

                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-white hover:bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 p-0 ml-auto"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onImageClick(globalIndex);
                                }}
                              >
                                <ZoomIn size={14} />
                              </Button>
                            </div>

                            {/* Tags */}
                            {image.tags && image.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {image.tags.slice(0, 3).map((tag, index) => (
                                  <span
                                    key={index}
                                    className="text-xs bg-white/10 text-white/80 px-2 py-0.5 rounded-full"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Elegant Corner Decorations */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/20 via-pink-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-500/20 via-indigo-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                      animate={
                        isHovered ? { x: ["100%", "200%"] } : { x: "-100%" }
                      }
                      transition={{
                        duration: 1.2,
                        ease: "easeInOut",
                        repeat: isHovered ? Infinity : 0,
                        repeatDelay: 2,
                      }}
                      style={{ willChange: "transform" }}
                    />
                  </div>

                  {/* Elegant Shadow */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-200/50 via-purple-200/30 to-indigo-200/50 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-110" />
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Load More Button for Infinite Scroll */}
      {enableInfiniteScroll && visibleImages < filteredImages.length && (
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <Button
            onClick={() =>
              setVisibleImages((prev) =>
                Math.min(prev + 8, filteredImages.length)
              )
            }
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Images
          </Button>
        </motion.div>
      )}

      {/* Floating Stats */}
      <AnimatePresence>
        {(likedImages.size > 0 || bookmarkedImages.size > 0) && (
          <motion.div
            className="fixed bottom-6 right-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 z-30"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
          >
            <div className="flex items-center gap-4 text-sm">
              {likedImages.size > 0 && (
                <div className="flex items-center gap-1 text-pink-500">
                  <Heart size={16} fill="currentColor" />
                  <span>{likedImages.size}</span>
                </div>
              )}
              {bookmarkedImages.size > 0 && (
                <div className="flex items-center gap-1 text-amber-500">
                  <Bookmark size={16} fill="currentColor" />
                  <span>{bookmarkedImages.size}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
