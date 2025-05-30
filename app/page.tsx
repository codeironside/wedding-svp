"use client";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { Navbar } from "@/components/navbar";
import { MasonryGallery } from "@/components/masonry-gallery";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Gift,
  CreditCard,
  Home,
  Plane,
  Heart,
  Clock,
  Timer,
  Zap,
  Star,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LazyMotion, domAnimation } from "framer-motion";

// Gallery images with enhanced metadata
const galleryImages = [
  {
    src: "/couple-1.png",
    alt: "Adeola and Abiola - Engagement Photos",
    title: "Our Engagement",
    description: "The moment we said yes to forever together",
    category: "Engagement",
    aspectRatio: 1.5,
  },
  {
    src: "/couple-3.png",
    alt: "Traditional Nigerian Attire",
    title: "Traditional Elegance",
    description: "Celebrating our heritage in beautiful traditional wear",
    category: "Traditional",
    aspectRatio: 1.2,
  },
  {
    src: "/couple-5.png",
    alt: "Romantic Sunset Photos",
    title: "Golden Hour",
    description: "Love illuminated by the golden sunset",
    category: "Romantic",
    aspectRatio: 1.8,
  },
  {
    src: "/couple-6.png",
    alt: "Candid Moments",
    title: "Pure Joy",
    description: "Capturing the laughter and joy we share",
    category: "Candid",
    aspectRatio: 1.3,
  },
  {
    src: "/bride-1.png",
    alt: "Adeola - Bridal Portrait",
    title: "The Beautiful Bride",
    description: "Adeola in all her radiant beauty",
    category: "Bridal",
    aspectRatio: 1.4,
  },
  {
    src: "/groom.png",
    alt: "Abiola - Groom Portrait",
    title: "The Handsome Groom",
    description: "Abiola looking dapper and ready",
    category: "Groom",
    aspectRatio: 1.4,
  },
  {
    src: "/couple-2.png",
    alt: "Wedding Preparation",
    title: "Getting Ready",
    description: "The excitement before our big day",
    category: "Preparation",
    aspectRatio: 1.6,
  },
  {
    src: "/couple-4.png",
    alt: "Family Celebration",
    title: "Family Love",
    description: "Surrounded by the love of our families",
    category: "Family",
    aspectRatio: 1.7,
  },
  {
    src: "/bride-2.png",
    alt: "Bridal Details",
    title: "Wedding Details",
    description: "Every detail carefully chosen with love",
    category: "Details",
    aspectRatio: 1.1,
  },
];

// Traditional Nigerian Wedding Rings Component (CSS-based)
function WeddingRingsIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E8C7C8' fillOpacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 text-center">
        {/* Decorative elements */}
        <motion.div
          className="absolute -top-8 -left-8"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            type: "tween",
          }}
          style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        >
          <Sparkles className="text-[#FAEEC8]" size={24} />
        </motion.div>

        <motion.div
          className="absolute -top-4 -right-12"
          animate={{ rotate: -360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            type: "tween",
          }}
          style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        >
          <Star className="text-[#E8C7C8]" size={20} />
        </motion.div>

        {/* Wedding rings illustration */}
        <div className="relative mb-6">
          <motion.div
            className="relative w-40 h-40 mx-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ willChange: "transform, opacity" }}
          >
            {/* First ring */}
            <motion.div
              className="absolute top-8 left-8 w-24 h-24 border-8 border-[#E8C7C8] rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                type: "tween",
              }}
              style={{ willChange: "transform", backfaceVisibility: "hidden" }}
            />
            {/* Second ring */}
            <motion.div
              className="absolute top-12 left-12 w-16 h-16 border-6 border-[#FAEEC8] rounded-full"
              animate={{ rotate: -360 }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                type: "tween",
              }}
              style={{ willChange: "transform", backfaceVisibility: "hidden" }}
            />
            {/* Center heart */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#8E4585] rounded-full p-3"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                type: "tween",
              }}
              style={{ willChange: "transform" }}
            >
              <Heart className="text-white" size={24} fill="currentColor" />
            </motion.div>
          </motion.div>
        </div>

        {/* Traditional Nigerian wedding elements */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ willChange: "transform, opacity" }}
          >
            <div className="w-12 h-12 bg-[#E8C7C8] rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-[#8E4585] font-bold">A</span>
            </div>
            <p className="text-sm text-[#8E4585] font-medium">Adeola</p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ willChange: "transform, opacity" }}
          >
            <div className="w-12 h-12 bg-[#8E4585] rounded-full mx-auto mb-2 flex items-center justify-center">
              <Heart className="text-white" size={16} fill="currentColor" />
            </div>
            <p className="text-sm text-[#8E4585] font-medium">Love</p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ willChange: "transform, opacity" }}
          >
            <div className="w-12 h-12 bg-[#FAEEC8] rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-[#8E4585] font-bold">A</span>
            </div>
            <p className="text-sm text-[#8E4585] font-medium">Abiola</p>
          </motion.div>
        </div>

        {/* Traditional blessing text */}
        <motion.div
          className="bg-white/90 p-4 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ willChange: "opacity" }}
        >
          <p className="text-[#8E4585] text-sm italic">
            "Two hearts, one love, one destiny"
          </p>
          <p className="text-[#8E4585]/70 text-xs mt-1">
            Traditional Nigerian Blessing
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Gallery lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = ["/couple-1.png", "/couple-3.png"];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Alternate images
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, [loading]);

  // Calculate countdown to August 8th
  const weddingDate = new Date("2025-08-08T00:00:00");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Gallery handlers
  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleLightboxNext = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handleLightboxPrevious = () => {
    setLightboxIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#FAEEC8]">
        <Navbar />

        {/* Hero Section */}
        <section
          id="hero"
          ref={heroRef}
          className="relative h-screen overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            {videoError ? (
              <Image
                src="/couple-1.png"
                alt="Wedding Background"
                fill
                className="object-cover"
                priority
              />
            ) : (
              <video
                ref={videoRef}
                className="object-cover w-full h-full"
                autoPlay
                loop
                muted
                playsInline
                onError={() => setVideoError(true)}
              >
                <source
                  src="https://assets.mixkit.co/videos/preview/mixkit-traditional-african-wedding-ceremony-9598-large.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          </div>

          {/* Floating decorative elements - REDUCED NUMBER */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: Math.random() * 1200,
                  y: 800,
                  opacity: 0,
                }}
                animate={{
                  y: -100,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 3,
                  type: "tween",
                }}
                style={{
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                }}
              >
                <Heart
                  className="text-[#FAEEC8]"
                  size={12 + Math.random() * 8}
                  fill="currentColor"
                />
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white pt-16 px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 50 }}
              className="text-center"
              style={{ willChange: "transform, opacity" }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center font-serif">
                Adeola & Abiola
              </h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="flex items-center justify-center mb-8"
                style={{ willChange: "opacity" }}
              >
                <div className="h-px bg-[#FAEEC8] w-16 mr-4" />
                <p className="text-xl md:text-2xl font-light">
                  Are getting married
                </p>
                <div className="h-px bg-[#FAEEC8] w-16 ml-4" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1,
                duration: 0.8,
                type: "spring",
                stiffness: 50,
              }}
              className="flex gap-4"
              style={{ willChange: "transform, opacity" }}
            >
              <Button
                asChild
                size="lg"
                className="bg-[#FAEEC8] hover:bg-[#F5E6B8] text-[#8E4585] font-medium"
              >
                <Link href="/rsvp">RSVP Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/20"
              >
                <Link href="#story">Our Story</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Date & Location Section */}
        <section className="py-16 bg-gradient-to-r from-[#8E4585] to-[#A855A7] text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 50 }}
                viewport={{ once: true, amount: 0.3 }}
                style={{ willChange: "transform, opacity" }}
              >
                <div className="bg-white/10 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Calendar size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">The Date</h3>
                <p className="text-lg">August 8th, 2025</p>
                <p className="text-sm text-white/70">Friday, 2:00 PM</p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 50,
                }}
                viewport={{ once: true, amount: 0.3 }}
                style={{ willChange: "transform, opacity" }}
              >
                <div className="bg-white/10 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <MapPin size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">The Venue</h3>
                <p className="text-lg">Eko Hotels & Suites</p>
                <p className="text-sm text-white/70">Victoria Island, Lagos</p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                  type: "spring",
                  stiffness: 50,
                }}
                viewport={{ once: true, amount: 0.3 }}
                style={{ willChange: "transform, opacity" }}
              >
                <div className="bg-white/10 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Gift size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">The Celebration</h3>
                <p className="text-lg">Traditional & White Wedding</p>
                <p className="text-sm text-white/70">Reception to follow</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        {/* <section className="py-20 bg-gradient-to-br from-[#E8C7C8] to-[#F5D5D6] text-[#8E4585]">
          <div className="container mx-auto text-center px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 font-serif"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
              viewport={{ once: true, amount: 0.3 }}
              style={{ willChange: "transform, opacity" }}
            >
              Counting Down to Our Special Day
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { value: countdown.days, label: "Days" },
                { value: countdown.hours, label: "Hours" },
                { value: countdown.minutes, label: "Minutes" },
                { value: countdown.seconds, label: "Seconds" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="bg-white/90 rounded-lg p-6 shadow-lg border border-[#8E4585]/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <div className="text-4xl md:text-6xl font-bold">
                    {item.value}
                  </div>
                  <div className="text-lg mt-2">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        <section className="py-24 bg-gradient-to-br from-[#E8C7C8] via-[#F5D5D6] to-[#FAEEC8] text-[#8E4585] relative overflow-hidden">
          {/* Enhanced background with floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated background pattern */}
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238E4585' fillOpacity='0.1'%3E%3Cpath d='M40 40c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm20 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "80px 80px",
              }}
            />

            {/* Floating decorative hearts */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute opacity-30"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 30}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 6 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeInOut",
                }}
              >
                <Heart
                  size={20 + (i % 3) * 8}
                  className="text-[#8E4585]/40"
                  fill="currentColor"
                />
              </motion.div>
            ))}
          </div>

          <div className="container mx-auto text-center px-4 relative z-10">
            {/* Enhanced header with decorative elements */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-6 font-serif bg-gradient-to-r from-[#8E4585] via-[#A855A7] to-[#8E4585] bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                  willChange: "background-position",
                }}
              >
                Counting Down to Our Special Day
              </motion.h2>

              <motion.p
                className="text-xl text-[#8E4585]/80 max-w-2xl mx-auto leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                Every moment brings us closer to the beginning of our forever
              </motion.p>

              {/* Decorative divider */}
              <motion.div
                className="flex justify-center items-center gap-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.div
                  className="h-px bg-gradient-to-r from-transparent to-[#8E4585]/40 w-20"
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  transition={{ delay: 0.7, duration: 1 }}
                />
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  <Heart
                    className="text-[#8E4585]"
                    size={28}
                    fill="currentColor"
                  />
                </motion.div>
                <motion.div
                  className="h-px bg-gradient-to-l from-transparent to-[#8E4585]/40 w-20"
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  transition={{ delay: 0.7, duration: 1 }}
                />
              </motion.div>
            </motion.div>

            {/* Enhanced countdown grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {[
                {
                  value: countdown.days,
                  label: "Days",
                  color: "from-pink-400 to-rose-500",
                  bgColor: "from-pink-50 to-rose-50",
                  shadowColor: "shadow-pink-200/50",
                  accentColor: "text-pink-500",
                },
                {
                  value: countdown.hours,
                  label: "Hours",
                  color: "from-purple-400 to-indigo-500",
                  bgColor: "from-purple-50 to-indigo-50",
                  shadowColor: "shadow-purple-200/50",
                  accentColor: "text-purple-500",
                },
                {
                  value: countdown.minutes,
                  label: "Minutes",
                  color: "from-blue-400 to-cyan-500",
                  bgColor: "from-blue-50 to-cyan-50",
                  shadowColor: "shadow-blue-200/50",
                  accentColor: "text-blue-500",
                },
                {
                  value: countdown.seconds,
                  label: "Seconds",
                  color: "from-emerald-400 to-teal-500",
                  bgColor: "from-emerald-50 to-teal-50",
                  shadowColor: "shadow-emerald-200/50",
                  accentColor: "text-emerald-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className={`relative bg-gradient-to-br ${item.bgColor} backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-xl ${item.shadowColor} border border-white/40 group overflow-hidden`}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 120,
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  style={{ willChange: "transform" }}
                >
                  {/* Decorative corner gradients */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-white/30 to-transparent rounded-full -translate-x-8 -translate-y-8" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-[#8E4585]/10 to-transparent rounded-full translate-x-6 translate-y-6" />

                  {/* Animated border effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    animate={{
                      background: [
                        `linear-gradient(0deg, ${item.color})`,
                        `linear-gradient(180deg, ${item.color})`,
                        `linear-gradient(360deg, ${item.color})`,
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Icon decoration */}
                  <motion.div
                    className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {index === 0 && (
                      <Calendar className="text-white" size={20} />
                    )}
                    {index === 1 && <Clock className="text-white" size={20} />}
                    {index === 2 && <Timer className="text-white" size={20} />}
                    {index === 3 && <Zap className="text-white" size={20} />}
                  </motion.div>

                  {/* Animated number display */}
                  <motion.div
                    className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 relative"
                    key={item.value} // Force re-render on value change
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    <span
                      className={`bg-gradient-to-br ${item.color} bg-clip-text text-transparent`}
                    >
                      {String(item.value).padStart(2, "0")}
                    </span>

                    {/* Number glow effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} bg-clip-text text-transparent opacity-50 blur-sm`}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {String(item.value).padStart(2, "0")}
                    </motion.div>
                  </motion.div>

                  {/* Enhanced label */}
                  <motion.div
                    className={`text-lg lg:text-xl font-semibold ${item.accentColor} relative`}
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {item.label}

                    {/* Label underline animation */}
                    <motion.div
                      className={`h-0.5 bg-gradient-to-r ${item.color} mt-1 mx-auto`}
                      initial={{ width: 0 }}
                      whileInView={{ width: "60%" }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    />
                  </motion.div>

                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl"
                    style={{ willChange: "transform" }}
                  />

                  {/* Floating particles */}
                  <AnimatePresence>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 ${item.accentColor} rounded-full opacity-60`}
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${30 + i * 20}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          repeatDelay: 1,
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Enhanced call-to-action */}
            <motion.div
              className="mt-16 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-[#8E4585]/20 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8E4585]/5 to-[#A855A7]/5" />

                <motion.div
                  className="relative z-10"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Heart
                    className="text-[#8E4585] mx-auto mb-4"
                    size={32}
                    fill="currentColor"
                  />
                  <h3 className="text-2xl font-bold text-[#8E4585] mb-3">
                    Save the Date!
                  </h3>
                  <p className="text-[#8E4585]/80 text-lg leading-relaxed mb-6">
                    Mark your calendars and join us for the celebration of a
                    lifetime. Your presence will make our special day even more
                    meaningful.
                  </p>

                  <motion.div
                    className="flex justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  >
                    <Button
                      asChild
                      className="bg-gradient-to-r from-[#8E4585] to-[#A855A7] hover:from-[#7A3B75] hover:to-[#9333A0] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Link href="/rsvp">RSVP Now</Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="border-2 border-[#8E4585] text-[#8E4585] hover:bg-[#8E4585] hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
                      onClick={() => {
                        // Add to calendar functionality
                        const event = {
                          title: "Adeola & Abiola Wedding",
                          start: "2025-08-08T14:00:00",
                          end: "2025-08-08T22:00:00",
                          location: "Eko Hotels & Suites, Lagos",
                        };
                        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                          event.title
                        )}&dates=${event.start.replace(
                          /[-:]/g,
                          ""
                        )}/${event.end.replace(
                          /[-:]/g,
                          ""
                        )}&location=${encodeURIComponent(event.location)}`;
                        window.open(calendarUrl, "_blank");
                      }}
                    >
                      <Calendar size={16} className="mr-2" />
                      Add to Calendar
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Decorative sparkles */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${20 + i * 25}%`,
                      top: `${10 + (i % 2) * 70}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      repeatDelay: 2,
                    }}
                  >
                    <Sparkles size={16} className="text-[#8E4585]/30" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        {/* Our Love Story Section */}
        {/* <section id="story" className="py-20 bg-[#FAEEC8]">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#8E4585] font-serif"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
              viewport={{ once: true, amount: 0.3 }}
              style={{ willChange: "transform, opacity" }}
            >
              Our Love Story
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                className="h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-[#8E4585] to-[#A855A7] p-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
                viewport={{ once: true, amount: 0.3 }}
                style={{ willChange: "transform, opacity" }}
              >
                <WeddingRingsIllustration />
              </motion.div>

              <div className="space-y-6">
                {[
                  {
                    title: "How We Met",
                    content:
                      "Our paths crossed at a traditional Nigerian wedding ceremony in Lagos. Amidst the vibrant colors and joyous celebration, our eyes met across the room.",
                    delay: 0.2,
                  },
                  {
                    title: "Our First Date",
                    content:
                      "We shared our first meal together at a local restaurant, enjoying jollof rice and discussing our shared love for Nigerian culture and traditions.",
                    delay: 0.4,
                  },
                  {
                    title: "The Proposal",
                    content:
                      "During a family gathering, surrounded by our loved ones, Abiola got down on one knee and asked Adeola to spend forever together.",
                    delay: 0.6,
                  },
                ].map((story, index) => (
                  <motion.div
                    key={story.title}
                    className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#E8C7C8] hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: story.delay, type: "spring", stiffness: 50 }}
                    viewport={{ once: true, amount: 0.3 }}
                    style={{ willChange: "transform, opacity" }}
                  >
                    <h3 className="text-xl font-bold mb-2 text-[#8E4585]">{story.title}</h3>
                    <p>{story.content}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section> */}
        <section
          id="story"
          className="py-24 bg-gradient-to-br from-[#FAEEC8] via-[#F5E6B8] to-[#E8C7C8] relative overflow-hidden"
        >
          {/* Enhanced background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute opacity-20"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 4) * 25}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 6 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeInOut",
                }}
              >
                <Heart
                  size={16 + (i % 3) * 6}
                  className="text-[#8E4585]/40"
                  fill="currentColor"
                />
              </motion.div>
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Enhanced header with decorative elements */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-6 text-center font-serif bg-gradient-to-r from-[#8E4585] via-[#A855A7] to-[#B659B8] bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                  willChange: "background-position",
                }}
              >
                Our Love Story
              </motion.h2>

              {/* Decorative divider */}
              <motion.div
                className="flex justify-center items-center mt-6 gap-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.div
                  className="h-px bg-[#8E4585]/40 w-16"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  <Heart
                    className="text-[#8E4585]"
                    size={24}
                    fill="currentColor"
                  />
                </motion.div>
                <motion.div
                  className="h-px bg-[#8E4585]/40 w-16"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </motion.div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              {/* Enhanced illustration container */}
              <motion.div
                className="h-[450px] md:h-[550px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#8E4585] via-[#A855A7] to-[#B659B8] p-8 relative border border-white/20"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, type: "spring", stiffness: 60 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(142, 69, 133, 0.3)",
                }}
                style={{ willChange: "transform, box-shadow" }}
              >
                {/* Enhanced corner decorations */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-br-full" />
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-white/20 to-transparent rounded-tl-full" />

                <WeddingRingsIllustration />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                  animate={{ x: ["100%", "200%"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Enhanced story cards */}
              <div className="space-y-8">
                {[
                  {
                    title: "How We Met",
                    content:
                      "Our paths crossed at a traditional Nigerian wedding ceremony in Lagos. Amidst the vibrant colors and joyous celebration, our eyes met across the room, and we knew something magical was beginning.",
                    delay: 0.2,
                    icon: Heart,
                    color: "from-pink-400 to-rose-500",
                    accentColor: "border-pink-300",
                  },
                  {
                    title: "Our First Date",
                    content:
                      "We shared our first meal together at a local restaurant, enjoying perfectly seasoned jollof rice and discussing our shared love for Nigerian culture, family traditions, and dreams for the future.",
                    delay: 0.4,
                    icon: Star,
                    color: "from-amber-400 to-orange-500",
                    accentColor: "border-amber-300",
                  },
                  {
                    title: "The Proposal",
                    content:
                      "During a family gathering, surrounded by our loved ones and blessed by our elders, Abiola got down on one knee and asked Adeola to spend forever together in love and unity.",
                    delay: 0.6,
                    icon: Sparkles,
                    color: "from-purple-400 to-indigo-500",
                    accentColor: "border-purple-300",
                  },
                ].map((story, index) => (
                  <motion.div
                    key={story.title}
                    className={`bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border-l-4 ${story.accentColor} hover:shadow-2xl transition-all duration-500 group relative overflow-hidden`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: story.delay,
                      type: "spring",
                      stiffness: 80,
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    style={{ willChange: "transform, box-shadow" }}
                  >
                    {/* Decorative corner gradient */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#8E4585]/5 to-transparent" />

                    {/* Story header with icon */}
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div
                        className={`bg-gradient-to-br ${story.color} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}
                        whileHover={{ rotate: 5 }}
                      >
                        <story.icon size={24} className="text-white" />
                      </motion.div>

                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2 text-[#8E4585] group-hover:text-[#A855A7] transition-colors">
                          {story.title}
                        </h3>
                        <motion.div
                          className="h-1 bg-gradient-to-r from-[#8E4585]/30 to-transparent rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{
                            delay: story.delay + 0.3,
                            duration: 0.8,
                          }}
                        />
                      </div>
                    </div>

                    {/* Story content */}
                    <p className="text-[#8E4585]/90 leading-relaxed text-lg relative z-10">
                      {story.content}
                    </p>

                    {/* Subtle hover shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8E4585]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                      style={{ willChange: "transform" }}
                    />
                  </motion.div>
                ))}

                {/* Additional decorative element */}
                <motion.div
                  className="text-center pt-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <motion.p
                    className="text-[#8E4585]/70 italic text-lg font-medium"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    "And so our beautiful journey continues..."
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section - ENHANCED */}
        <section
          id="gallery"
          className="py-20 bg-gradient-to-br from-[#8E4585] to-[#A855A7] text-white"
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
              viewport={{ once: true, amount: 0.3 }}
              style={{ willChange: "transform, opacity" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
                Our Beautiful Journey
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Every picture tells a story of love, laughter, and the beautiful
                moments we've shared together
              </p>

              {/* Decorative elements */}
              <div className="flex justify-center items-center mt-8 gap-4">
                <div className="h-px bg-white/30 w-16" />
                <Heart
                  className="text-[#FAEEC8]"
                  size={24}
                  fill="currentColor"
                />
                <div className="h-px bg-white/30 w-16" />
              </div>
            </motion.div>

            <MasonryGallery
              images={galleryImages}
              onImageClick={handleImageClick}
            />

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                type: "spring",
                stiffness: 50,
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-white/70 italic">
                Click any image to view in full size
              </p>
            </motion.div>
          </div>
        </section>

        {/* Gallery Lightbox */}
        <GalleryLightbox
          images={galleryImages}
          isOpen={lightboxOpen}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={handleLightboxNext}
          onPrevious={handleLightboxPrevious}
        />

        {/* RSVP Section */}
        <section
          id="rsvp"
          className="py-20 bg-gradient-to-br from-[#E8C7C8] to-[#F5D5D6] text-[#8E4585]"
        >
          <div className="container mx-auto text-center px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6 font-serif"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
              viewport={{ once: true, amount: 0.3 }}
              style={{ willChange: "transform, opacity" }}
            >
              Join Our Celebration
            </motion.h2>
            <motion.p
              className="text-xl mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                stiffness: 50,
              }}
              viewport={{ once: true, amount: 0.3 }}
              style={{ willChange: "transform, opacity" }}
            >
              We would be honored to have you join us on our special day. Please
              let us know if you can attend.
            </motion.p>

            <motion.div
              className="max-w-md mx-auto bg-white/90 p-8 rounded-lg shadow-lg border border-[#8E4585]/10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                type: "spring",
                stiffness: 50,
              }}
              viewport={{ once: true, amount: 0.3 }}
              style={{ willChange: "transform, opacity" }}
            >
              <Button
                asChild
                size="lg"
                className="w-full bg-[#8E4585] text-white hover:bg-[#7A3B75]"
              >
                <Link href="/rsvp">RSVP Now</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Gifting Section */}
        <section id="gifts" className="py-20 bg-[#FAEEC8]">
          <div className="container mx-auto text-center px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6 text-[#8E4585] font-serif"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
              viewport={{ once: true, amount: 0.3 }}
              style={{ willChange: "transform, opacity" }}
            >
              Gift Registry
            </motion.h2>
            <motion.p
              className="text-xl mb-12 max-w-2xl mx-auto text-[#8E4585]/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                stiffness: 50,
              }}
              viewport={{ once: true, amount: 0.3 }}
              style={{ willChange: "transform, opacity" }}
            >
              Your presence is our present. However, if you wish to honor us
              with a gift, here are some options.
            </motion.p>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: CreditCard,
                  title: "Cash Gift",
                  description:
                    "Contribute to our new life together with a cash gift.",
                  details: [
                    "Bank: First Bank of Nigeria",
                    "Account Name: Adeola & Abiola Wedding",
                    "Account Number: 3104567890",
                    "Swift Code: FBNINGLA",
                  ],
                  buttonText: "Copy Account Details",
                },
                {
                  icon: Home,
                  title: "Gift Registry",
                  description:
                    "Choose from our curated selection of items for our new home.",
                  details: [
                    "Store: Mega Plaza Shopping Center",
                    "Registry ID: AM-2025-08-08",
                    "Delivery Address:",
                    "15B Admiralty Way, Lekki Phase 1, Lagos",
                  ],
                  buttonText: "View Registry",
                },
                {
                  icon: Plane,
                  title: "Honeymoon Fund",
                  description:
                    "Help us create unforgettable memories on our honeymoon.",
                  details: [
                    "Destination: Seychelles",
                    "Date: August 13-27, 2025",
                    "PayPal: honeymoon@adeolaandabiola.com",
                    "Mobile Money: +234 803 456 7890",
                  ],
                  buttonText: "Contribute",
                },
              ].map((gift, index) => (
                <motion.div
                  key={gift.title}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-[#8E4585]/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 50,
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <div className="bg-[#E8C7C8] rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <gift.icon size={40} className="text-[#8E4585]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#8E4585]">
                    {gift.title}
                  </h3>
                  <p className="mb-4 text-[#8E4585]/80">{gift.description}</p>

                  <div className="bg-[#F5E6B8] p-4 rounded-md mb-4 text-left">
                    <p className="font-medium mb-1">Details:</p>
                    {gift.details.map((detail, i) => (
                      <p key={i} className="text-sm mb-1">
                        {detail}
                      </p>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="border-[#8E4585] text-[#8E4585] hover:bg-[#8E4585] hover:text-white"
                  >
                    {gift.buttonText}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 bg-gradient-to-r from-[#8E4585] to-[#A855A7] text-white">
          <div className="container mx-auto text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
              viewport={{ once: true, amount: 0.3 }}
              style={{ willChange: "transform, opacity" }}
            >
              <h2 className="text-3xl font-bold mb-4 font-serif">
                Adeola & Abiola
              </h2>
              <p className="mb-6">August 8th, 2025 • Lagos, Nigeria</p>

              <div className="flex justify-center gap-4 mb-6">
                <Button
                  asChild
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <Link href="/admin">Admin Login</Link>
                </Button>
              </div>

              <p className="text-sm opacity-70">
                © {new Date().getFullYear()} Adeola & Abiola Wedding
              </p>
            </motion.div>
          </div>
        </footer>
      </div>
    </LazyMotion>
  );
}
