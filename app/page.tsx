"use client"

import React from "react"
import { useEffect, useState, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/loader"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Gift, CreditCard, Home, Plane } from "lucide-react"
import * as THREE from "three"

// Wedding Rings Component
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

      {/* Heart */}
      <mesh position={[0, 1, 0]}>
        <extrudeGeometry
          args={[
            heartShape,
            {
              depth: 0.2,
              bevelEnabled: true,
              bevelThickness: 0.1,
              bevelSize: 0.1,
              bevelSegments: 3,
            },
          ]}
        />
        <meshStandardMaterial color="#8E4585" />
      </mesh>
    </group>
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
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white pt-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center font-serif">Adeola & Abiola</h1>
          <p className="text-xl md:text-2xl mb-8 font-light">Are getting married</p>
          <div className="flex gap-4">
            <Button asChild size="lg" className="bg-[#FAEEC8] hover:bg-[#F5E6B8] text-[#8E4585] font-medium">
              <Link href="/rsvp">RSVP Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
              <Link href="#story">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Date & Location Section */}
      <section className="py-16 bg-[#8E4585] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <Calendar className="mx-auto mb-4" size={40} />
              <h3 className="text-xl font-bold mb-2">The Date</h3>
              <p className="text-lg">August 8th, 2025</p>
              <p className="text-sm text-white/70">Friday, 2:00 PM</p>
            </div>

            <div className="text-center">
              <MapPin className="mx-auto mb-4" size={40} />
              <h3 className="text-xl font-bold mb-2">The Venue</h3>
              <p className="text-lg">Eko Hotels & Suites</p>
              <p className="text-sm text-white/70">Victoria Island, Lagos</p>
            </div>

            <div className="text-center">
              <Gift className="mx-auto mb-4" size={40} />
              <h3 className="text-xl font-bold mb-2">The Celebration</h3>
              <p className="text-lg">Traditional & White Wedding</p>
              <p className="text-sm text-white/70">Reception to follow</p>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 bg-[#E8C7C8] text-[#8E4585]">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 font-serif">Counting Down to Our Special Day</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/90 rounded-lg p-6 shadow-lg">
              <div className="text-4xl md:text-6xl font-bold">{countdown.days}</div>
              <div className="text-lg mt-2">Days</div>
            </div>
            <div className="bg-white/90 rounded-lg p-6 shadow-lg">
              <div className="text-4xl md:text-6xl font-bold">{countdown.hours}</div>
              <div className="text-lg mt-2">Hours</div>
            </div>
            <div className="bg-white/90 rounded-lg p-6 shadow-lg">
              <div className="text-4xl md:text-6xl font-bold">{countdown.minutes}</div>
              <div className="text-lg mt-2">Minutes</div>
            </div>
            <div className="bg-white/90 rounded-lg p-6 shadow-lg">
              <div className="text-4xl md:text-6xl font-bold">{countdown.seconds}</div>
              <div className="text-lg mt-2">Seconds</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Story Section */}
      <section id="story" className="py-20 bg-[#FAEEC8]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#8E4585] font-serif">Our Love Story</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl">
              <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <WeddingRings />
                <OrbitControls enableZoom={false} />
                <Environment preset="studio" />
              </Canvas>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#E8C7C8]">
                <h3 className="text-xl font-bold mb-2 text-[#8E4585]">How We Met</h3>
                <p>
                  Our paths crossed at a traditional Nigerian wedding ceremony in Lagos. Amidst the vibrant colors and
                  joyous celebration, our eyes met across the room.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#E8C7C8]">
                <h3 className="text-xl font-bold mb-2 text-[#8E4585]">Our First Date</h3>
                <p>
                  We shared our first meal together at a local restaurant, enjoying jollof rice and discussing our
                  shared love for Nigerian culture and traditions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#E8C7C8]">
                <h3 className="text-xl font-bold mb-2 text-[#8E4585]">The Proposal</h3>
                <p>
                  During a family gathering, surrounded by our loved ones, Abiola got down on one knee and asked Adeola
                  to spend forever together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-[#8E4585] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-serif">Our Gallery</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/couple-1.png"
                alt="Couple Photo"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/couple-3.png"
                alt="Couple Photo"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/couple-5.png"
                alt="Couple Photo"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/couple-6.png"
                alt="Couple Photo"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/bride-1.png"
                alt="Bride Photo"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/groom.png"
                alt="Groom Photo"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-20 bg-[#E8C7C8] text-[#8E4585]">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Join Our Celebration</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            We would be honored to have you join us on our special day. Please let us know if you can attend.
          </p>

          <div className="max-w-md mx-auto bg-white/90 p-8 rounded-lg shadow-lg">
            <Button asChild size="lg" className="w-full bg-[#8E4585] text-white hover:bg-[#7A3B75]">
              <Link href="/rsvp">RSVP Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gifting Section */}
      <section id="gifts" className="py-20 bg-[#FAEEC8]">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#8E4585] font-serif">Gift Registry</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-[#8E4585]/80">
            Your presence is our present. However, if you wish to honor us with a gift, here are some options.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <CreditCard className="mx-auto mb-4 text-[#E8C7C8]" size={40} />
              <h3 className="text-xl font-bold mb-2 text-[#8E4585]">Cash Gift</h3>
              <p className="mb-4 text-[#8E4585]/80">Contribute to our new life together with a cash gift.</p>

              <div className="bg-[#F5E6B8] p-4 rounded-md mb-4 text-left">
                <p className="font-medium mb-1">Bank Details:</p>
                <p className="text-sm mb-1">Bank: First Bank of Nigeria</p>
                <p className="text-sm mb-1">Account Name: Adeola & Abiola Wedding</p>
                <p className="text-sm mb-1">Account Number: 3104567890</p>
                <p className="text-sm">Swift Code: FBNINGLA</p>
              </div>

              <Button variant="outline" className="border-[#8E4585] text-[#8E4585] hover:bg-[#8E4585] hover:text-white">
                Copy Account Details
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <Home className="mx-auto mb-4 text-[#E8C7C8]" size={40} />
              <h3 className="text-xl font-bold mb-2 text-[#8E4585]">Gift Registry</h3>
              <p className="mb-4 text-[#8E4585]/80">Choose from our curated selection of items for our new home.</p>

              <div className="bg-[#F5E6B8] p-4 rounded-md mb-4 text-left">
                <p className="font-medium mb-1">Registry Information:</p>
                <p className="text-sm mb-1">Store: Mega Plaza Shopping Center</p>
                <p className="text-sm mb-1">Registry ID: AM-2025-08-08</p>
                <p className="text-sm mb-1">Delivery Address:</p>
                <p className="text-sm">15B Admiralty Way, Lekki Phase 1, Lagos</p>
              </div>

              <Button variant="outline" className="border-[#8E4585] text-[#8E4585] hover:bg-[#8E4585] hover:text-white">
                View Registry
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <Plane className="mx-auto mb-4 text-[#E8C7C8]" size={40} />
              <h3 className="text-xl font-bold mb-2 text-[#8E4585]">Honeymoon Fund</h3>
              <p className="mb-4 text-[#8E4585]/80">Help us create unforgettable memories on our honeymoon.</p>

              <div className="bg-[#F5E6B8] p-4 rounded-md mb-4 text-left">
                <p className="font-medium mb-1">Honeymoon Details:</p>
                <p className="text-sm mb-1">Destination: Seychelles</p>
                <p className="text-sm mb-1">Date: August 13-27, 2025</p>
                <p className="text-sm mb-1">PayPal: honeymoon@adeolaandabiola.com</p>
                <p className="text-sm">Mobile Money: +234 803 456 7890</p>
              </div>

              <Button variant="outline" className="border-[#8E4585] text-[#8E4585] hover:bg-[#8E4585] hover:text-white">
                Contribute
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-[#8E4585] text-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4 font-serif">Adeola & Abiola</h2>
          <p className="mb-6">August 8th, 2025 • Lagos, Nigeria</p>

          <div className="flex justify-center gap-4 mb-6">
            <Button asChild variant="ghost" className="text-white hover:bg-white/20">
              <Link href="/admin">Admin Login</Link>
            </Button>
          </div>

          <p className="text-sm opacity-70">© {new Date().getFullYear()} Adeola & Abiola Wedding</p>
        </div>
      </footer>
    </div>
  )
}
