"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-[#8E4585]/95 backdrop-blur-sm py-2 shadow-md" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white font-serif text-xl md:text-2xl font-bold">
            A&A
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="#story">Our Story</NavLink>
            <NavLink href="#gallery">Gallery</NavLink>
            <NavLink href="#rsvp">RSVP</NavLink>
            <NavLink href="#gifts">Gifts</NavLink>
            <Button asChild size="sm" className="bg-[#FAEEC8] hover:bg-[#F5E6B8] text-[#8E4585] font-medium">
              <Link href="/rsvp">RSVP Now</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-6 flex flex-col space-y-4 border-t border-white/10 mt-4">
            <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink href="#story" onClick={() => setIsMenuOpen(false)}>
              Our Story
            </MobileNavLink>
            <MobileNavLink href="#gallery" onClick={() => setIsMenuOpen(false)}>
              Gallery
            </MobileNavLink>
            <MobileNavLink href="#rsvp" onClick={() => setIsMenuOpen(false)}>
              RSVP
            </MobileNavLink>
            <MobileNavLink href="#gifts" onClick={() => setIsMenuOpen(false)}>
              Gifts
            </MobileNavLink>
            <Button asChild size="sm" className="bg-[#FAEEC8] hover:bg-[#F5E6B8] text-[#8E4585] font-medium w-full">
              <Link href="/rsvp">RSVP Now</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-white/90 hover:text-white font-medium transition-colors duration-200 hover:underline underline-offset-4"
    >
      {children}
    </Link>
  )
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="text-white/90 hover:text-white font-medium transition-colors duration-200 py-2 block"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
