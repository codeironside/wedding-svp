"use client"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/loader"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Gift, CreditCard, Home, Plane, Heart, Star, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

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
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Sparkles className="text-[#FAEEC8]" size={24} />
        </motion.div>

        <motion.div
          className="absolute -top-4 -right-12"
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
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
          >
            {/* First ring */}
            <motion.div
              className="absolute top-8 left-8 w-24 h-24 border-8 border-[#E8C7C8] rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            {/* Second ring */}
            <motion.div
              className="absolute top-12 left-12 w-16 h-16 border-6 border-[#FAEEC8] rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            {/* Center heart */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#8E4585] rounded-full p-3"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
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
        >
          <p className="text-[#8E4585] text-sm italic">"Two hearts, one love, one destiny"</p>
          <p className="text-[#8E4585]/70 text-xs mt-1">Traditional Nigerian Blessing</p>
        </motion.div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)

  const images = ["/couple-1.png", "/couple-3.png"]

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Alternate images
  useEffect(() => {
    if (loading) return

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0))
    }, 5000)

    return () => clearInterval(interval)
  }, [loading])

  // Calculate countdown to August 8th
  const weddingDate = new Date("2025-08-08T00:00:00")
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const difference = weddingDate.getTime() - now.getTime()

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-[#FAEEC8]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          {videoError ? (
            <Image src="/couple-1.png" alt="Wedding Background" fill className="object-cover" priority />
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

        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
                y: typeof window !== "undefined" ? window.innerHeight : 800,
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
              }}
            >
              <Heart className="text-[#FAEEC8]" size={12 + Math.random() * 8} fill="currentColor" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white pt-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center font-serif">Adeola & Abiola</h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="h-px bg-[#FAEEC8] w-16 mr-4" />
              <p className="text-xl md:text-2xl font-light">Are getting married</p>
              <div className="h-px bg-[#FAEEC8] w-16 ml-4" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex gap-4"
          >
            <Button asChild size="lg" className="bg-[#FAEEC8] hover:bg-[#F5E6B8] text-[#8E4585] font-medium">
              <Link href="/rsvp">RSVP Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
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
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
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
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
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
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
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
      <section className="py-20 bg-gradient-to-br from-[#E8C7C8] to-[#F5D5D6] text-[#8E4585]">
        <div className="container mx-auto text-center px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 font-serif"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-6xl font-bold">{item.value}</div>
                <div className="text-lg mt-2">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Love Story Section */}
      <section id="story" className="py-20 bg-[#FAEEC8]">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#8E4585] font-serif"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Love Story
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-[#8E4585] to-[#A855A7] p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
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
                  transition={{ duration: 0.6, delay: story.delay }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-2 text-[#8E4585]">{story.title}</h3>
                  <p>{story.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gradient-to-br from-[#8E4585] to-[#A855A7] text-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center font-serif"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Gallery
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["/couple-1.png", "/couple-3.png", "/couple-5.png", "/couple-6.png", "/bride-1.png", "/groom.png"].map(
              (src, index) => (
                <motion.div
                  key={src}
                  className="relative h-80 rounded-lg overflow-hidden shadow-lg group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={src || "/placeholder.svg"}
                    alt="Couple Photo"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-20 bg-gradient-to-br from-[#E8C7C8] to-[#F5D5D6] text-[#8E4585]">
        <div className="container mx-auto text-center px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 font-serif"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Join Our Celebration
          </motion.h2>
          <motion.p
            className="text-xl mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We would be honored to have you join us on our special day. Please let us know if you can attend.
          </motion.p>

          <motion.div
            className="max-w-md mx-auto bg-white/90 p-8 rounded-lg shadow-lg border border-[#8E4585]/10"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button asChild size="lg" className="w-full bg-[#8E4585] text-white hover:bg-[#7A3B75]">
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
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Gift Registry
          </motion.h2>
          <motion.p
            className="text-xl mb-12 max-w-2xl mx-auto text-[#8E4585]/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Your presence is our present. However, if you wish to honor us with a gift, here are some options.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: CreditCard,
                title: "Cash Gift",
                description: "Contribute to our new life together with a cash gift.",
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
                description: "Choose from our curated selection of items for our new home.",
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
                description: "Help us create unforgettable memories on our honeymoon.",
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
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-[#E8C7C8] rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <gift.icon size={40} className="text-[#8E4585]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#8E4585]">{gift.title}</h3>
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
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 font-serif">Adeola & Abiola</h2>
            <p className="mb-6">August 8th, 2025 • Lagos, Nigeria</p>

            <div className="flex justify-center gap-4 mb-6">
              <Button asChild variant="ghost" className="text-white hover:bg-white/20">
                <Link href="/admin">Admin Login</Link>
              </Button>
            </div>

            <p className="text-sm opacity-70">© {new Date().getFullYear()} Adeola & Abiola Wedding</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
