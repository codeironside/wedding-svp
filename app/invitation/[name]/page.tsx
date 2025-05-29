"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, Calendar, MapPin } from "lucide-react"
import Image from "next/image"

export default function InvitationPage() {
  const params = useParams()
  const name = decodeURIComponent(params.name as string)

  return (
    <div className="min-h-screen bg-[#FAEEC8]">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <Link href="/" className="inline-flex items-center text-[#8E4585] hover:underline mb-8">
          <ArrowLeft className="mr-2" size={16} />
          Back to Home
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-64 md:h-80">
              <Image src="/couple-1.png" alt="Wedding Banner" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h1 className="text-3xl md:text-4xl font-bold font-serif">Adeola & Abiola</h1>
                  <p className="text-lg">Request the pleasure of your company</p>
                </div>
              </div>
            </div>

            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-6 text-[#8E4585] font-serif">Dear {name},</h2>

              <p className="text-lg mb-8">
                We are delighted to invite you to celebrate our wedding day. Your presence will make our special day
                even more memorable.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#F5E6B8] p-6 rounded-lg">
                  <Calendar className="mx-auto mb-4 text-[#E8C7C8]" size={32} />
                  <h3 className="text-xl font-bold mb-2 text-[#8E4585]">When</h3>
                  <p className="text-[#8E4585]/80">Friday, August 8th, 2025</p>
                  <p className="text-[#8E4585]/80">2:00 PM</p>
                </div>

                <div className="bg-[#F5E6B8] p-6 rounded-lg">
                  <MapPin className="mx-auto mb-4 text-[#E8C7C8]" size={32} />
                  <h3 className="text-xl font-bold mb-2 text-[#8E4585]">Where</h3>
                  <p className="text-[#8E4585]/80">Eko Hotels & Suites</p>
                  <p className="text-[#8E4585]/80">Victoria Island, Lagos</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-[#8E4585]">Dress Code</h3>
                <div className="flex justify-center gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[#8E4585] mx-auto mb-2"></div>
                    <p className="text-sm">Traditional</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-white border-2 border-[#8E4585] mx-auto mb-2"></div>
                    <p className="text-sm">White Wedding</p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="bg-[#8E4585] hover:bg-[#7A3B75] text-white">
                <Link href="/rsvp">RSVP Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
