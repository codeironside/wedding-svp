"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // This would be replaced with an actual authentication API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll use a simple credential check
      if (formData.email === "admin@example.com" && formData.password === "password") {
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard",
        })

        router.push("/admin/dashboard")
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAEEC8] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#8E4585] text-white p-6 text-center">
          <h1 className="text-2xl font-bold">Admin Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-[#E8C7C8] focus-visible:ring-[#8E4585]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border-[#E8C7C8] focus-visible:ring-[#8E4585]"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full bg-[#8E4585] hover:bg-[#7A3B75] text-white">
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <div className="text-sm text-center text-gray-500">
              <p>For demo: email: admin@example.com, password: password</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
