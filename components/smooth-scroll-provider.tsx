"use client"

import { createContext, useContext, useEffect, type ReactNode } from "react"

type SmoothScrollContextType = {
  scrollToSection: (id: string) => void
}

const SmoothScrollContext = createContext<SmoothScrollContextType | undefined>(undefined)

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Apply smooth scrolling to the entire document
    document.documentElement.style.scrollBehavior = "smooth"

    return () => {
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Get the navbar height to offset the scroll position
      const navbar = document.querySelector("header")
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0

      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - navbarHeight - 20 // Extra 20px padding

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return <SmoothScrollContext.Provider value={{ scrollToSection }}>{children}</SmoothScrollContext.Provider>
}

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext)
  if (context === undefined) {
    throw new Error("useSmoothScroll must be used within a SmoothScrollProvider")
  }
  return context
}
