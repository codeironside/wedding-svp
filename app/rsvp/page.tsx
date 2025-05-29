"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function RSVPPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    attending: "yes",
    guests: "0",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, attending: value }))
  }

  const handleGuestsChange = (value: string) => {
    setFormData((prev) => ({ ...prev, guests: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // This would be replaced with an actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "RSVP Submitted",
        description: "Thank you for your response. We look forward to celebrating with you!",
      })

      router.push("/rsvp/confirmation?name=" + encodeURIComponent(formData.name))
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your RSVP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
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

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#8E4585] text-white p-6 text-center">
            <h1 className="text-3xl font-bold font-serif">RSVP</h1>
            <p className="mt-2">Please respond by July 8th, 2025</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-[#E8C7C8] focus-visible:ring-[#8E4585]"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-[#E8C7C8] focus-visible:ring-[#8E4585]"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="border-[#E8C7C8] focus-visible:ring-[#8E4585]"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="grid gap-2">
                <Label>Will you be attending?</Label>
                <RadioGroup value={formData.attending} onValueChange={handleRadioChange} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="attending-yes" />
                    <Label htmlFor="attending-yes">Yes, I will attend</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="attending-no" />
                    <Label htmlFor="attending-no">No, I cannot attend</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.attending === "yes" && (
                <div className="grid gap-2">
                  <Label>Number of additional guests</Label>
                  <RadioGroup
                    value={formData.guests}
                    onValueChange={handleGuestsChange}
                    className="flex flex-wrap gap-4"
                  >
                    {["0", "1", "2", "3", "4"].map((num) => (
                      <div key={num} className="flex items-center space-x-2">
                        <RadioGroupItem value={num} id={`guests-${num}`} />
                        <Label htmlFor={`guests-${num}`}>{num}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="message">Message to the Couple (Optional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="border-[#E8C7C8] focus-visible:ring-[#8E4585]"
                  placeholder="Share your wishes or any special requirements"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#8E4585] hover:bg-[#7A3B75] text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit RSVP"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
