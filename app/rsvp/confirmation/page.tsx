"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import QRCode from "qrcode.react"
import { saveAs } from "file-saver"
import html2canvas from "html2canvas"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || "Guest"
  const [invitationUrl, setInvitationUrl] = useState("")

  useEffect(() => {
    // Set the invitation URL to the current page URL
    setInvitationUrl(window.location.origin + "/invitation/" + encodeURIComponent(name))
  }, [name])

  const downloadInvitation = async () => {
    const invitationElement = document.getElementById("invitation-card")
    if (!invitationElement) return

    try {
      const canvas = await html2canvas(invitationElement)
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `wedding_invitation_${name.replace(/\s+/g, "_")}.png`)
        }
      })
    } catch (error) {
      console.error("Error generating invitation:", error)
    }
  }

  const shareInvitation = () => {
    if (navigator.share) {
      navigator.share({
        title: "Wedding Invitation - Adeola & Abiola",
        text: `You're invited to Adeola & Abiola's wedding!`,
        url: invitationUrl,
      })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(invitationUrl)
      alert("Invitation link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-[#FAEEC8]">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <Link href="/" className="inline-flex items-center text-[#8E4585] hover:underline mb-8">
          <ArrowLeft className="mr-2" size={16} />
          Back to Home
        </Link>

        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#8E4585] font-serif">Thank You, {name}!</h1>
          <p className="text-xl mb-8">
            Your RSVP has been received. We're excited to celebrate our special day with you!
          </p>

          <div id="invitation-card" className="bg-white p-8 rounded-xl shadow-lg mb-8 mx-auto max-w-md">
            <div className="border-4 border-[#E8C7C8] p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-2 text-[#8E4585] font-serif">Wedding Invitation</h2>
              <p className="text-lg font-medium mb-4">Adeola & Abiola</p>

              <div className="mb-4">
                <p className="text-sm mb-1">Date: August 8th, 2025</p>
                <p className="text-sm mb-1">Time: 2:00 PM</p>
                <p className="text-sm mb-1">Venue: Eko Hotels & Suites, Lagos</p>
              </div>

              <p className="text-sm mb-4">Dear {name}, we are honored to have you join us on our special day.</p>

              <div className="flex justify-center mb-2">
                <QRCode value={invitationUrl} size={120} level="H" includeMargin={true} fgColor="#8E4585" />
              </div>
              <p className="text-xs text-[#8E4585]/70">Scan to view digital invitation</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={downloadInvitation} className="bg-[#8E4585] hover:bg-[#7A3B75] text-white">
              <Download className="mr-2" size={16} />
              Download Invitation
            </Button>
            <Button onClick={shareInvitation} variant="outline" className="border-[#8E4585] text-[#8E4585]">
              <Share2 className="mr-2" size={16} />
              Share Invitation
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
