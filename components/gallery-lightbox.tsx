"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category?: string;
}

interface GalleryLightboxProps {
  images: GalleryImage[];
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onIndexChange?: (index: number) => void;
}

export function GalleryLightbox({
  images,
  isOpen,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
  onIndexChange,
}: GalleryLightboxProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Reset image transforms when changing images
  useEffect(() => {
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
    setIsLoading(true);
    setImageError(false);
  }, [currentIndex]);

  // Auto-hide controls
  useEffect(() => {
    if (!showControls) return;

    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(controlsTimeoutRef.current);
  }, [showControls]);

  const showControlsHandler = useCallback(() => {
    setShowControls(true);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrevious();
          break;
        case "ArrowRight":
          onNext();
          break;
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        case "r":
        case "R":
          handleRotate();
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Touch/Mouse interactions for zoom and pan
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoom <= 1) return;
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    },
    [zoom, position]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || zoom <= 1) return;
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    },
    [isDragging, dragStart, zoom]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Zoom functions
  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev * 1.5, 5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const newZoom = Math.max(prev / 1.5, 1);
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  }, []);

  const handleRotate = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prev) => {
      const newZoom = Math.min(Math.max(prev * delta, 1), 5);
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  }, []);

  const handleShare = async () => {
    const currentImage = images[currentIndex];
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentImage.title || "Gallery Image",
          text: currentImage.description || "Beautiful image",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  const handleDownload = async () => {
    const currentImage = images[currentIndex];
    try {
      const response = await fetch(currentImage.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = currentImage.title || `image-${currentIndex + 1}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error downloading:", error);
    }
  };

  const handleThumbnailClick = (index: number) => {
    if (onIndexChange) {
      onIndexChange(index);
    }
  };

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/98 backdrop-blur-sm cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        onMouseMove={showControlsHandler}
        onWheel={handleWheel}
      >
        {/* Header */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-4"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center text-white">
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    {currentImage.title || "Gallery"}
                  </h3>
                  <p className="text-sm text-white/70">
                    {currentIndex + 1} of {images.length}
                    {currentImage.category && (
                      <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                        {currentImage.category}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleZoomIn();
                    }}
                    className="text-white hover:bg-white/20"
                    disabled={zoom >= 5}
                  >
                    <ZoomIn size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleZoomOut();
                    }}
                    className="text-white hover:bg-white/20"
                    disabled={zoom <= 1}
                  >
                    <ZoomOut size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRotate();
                    }}
                    className="text-white hover:bg-white/20"
                  >
                    <RotateCw size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFullscreen();
                    }}
                    className="text-white hover:bg-white/20"
                  >
                    <Maximize size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload();
                    }}
                    className="text-white hover:bg-white/20"
                  >
                    <Download size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare();
                    }}
                    className="text-white hover:bg-white/20"
                  >
                    <Share2 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-white hover:bg-white/20"
                  >
                    <X size={20} />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Arrows */}
        <AnimatePresence>
          {showControls && images.length > 1 && (
            <>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="ghost"
                  size="lg"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 rounded-full w-14 h-14 backdrop-blur-sm border border-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrevious();
                  }}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft size={28} />
                </Button>
              </motion.div>

              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="ghost"
                  size="lg"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 rounded-full w-14 h-14 backdrop-blur-sm border border-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                  }}
                  disabled={currentIndex === images.length - 1}
                >
                  <ChevronRight size={28} />
                </Button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Image */}
        <div className="flex items-center justify-center h-full p-4 md:p-16">
          <motion.div
            key={currentIndex}
            ref={imageRef}
            className="relative max-w-full max-h-full cursor-grab active:cursor-grabbing"
            style={{
              cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default",
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-xl z-10">
                  <div className="w-12 h-12 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}

              {imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-xl text-white">
                  <p>Failed to load image</p>
                </div>
              )}

              <motion.div
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg) translate(${
                    position.x / zoom
                  }px, ${position.y / zoom}px)`,
                  transformOrigin: "center center",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Image
                  src={currentImage.src || "/placeholder.svg"}
                  alt={currentImage.alt}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[80vh] object-contain select-none"
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false);
                    setImageError(true);
                  }}
                  priority
                  quality={90}
                />
              </motion.div>
            </div>

            {currentImage.description && (
              <AnimatePresence>
                {showControls && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 rounded-b-xl"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-white text-center text-lg leading-relaxed">
                      {currentImage.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <AnimatePresence>
            {showControls && (
              <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md rounded-2xl p-3 border border-white/10"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex gap-3 max-w-xs md:max-w-2xl overflow-x-auto scrollbar-hide">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      className={`relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden transition-all duration-300 flex-shrink-0 ${
                        index === currentIndex
                          ? "ring-3 ring-white scale-110 shadow-lg"
                          : "opacity-60 hover:opacity-100 hover:scale-105"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleThumbnailClick(index);
                      }}
                    >
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                      {index === currentIndex && (
                        <div className="absolute inset-0 bg-white/20" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Zoom indicator */}
        {zoom > 1 && (
          <motion.div
            className="absolute top-20 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {Math.round(zoom * 100)}%
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
