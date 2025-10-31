"use client"

import type React from "react"

import { useEffect } from "react"

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Dynamically load Lenis script
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/gh/darkroomengineering/lenis@latest"
    script.async = true
    script.onload = () => {
      // Initialize Lenis with custom options
      if (window.Lenis) {
        const lenis = new window.Lenis({
          duration: 1.2, // Scroll duration (lower = faster)
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
          direction: "vertical", // vertical or horizontal
          gestureDirection: "vertical",
          smoothWheel: true,
          smoothTouch: false,
          syncTouch: false,
          touchMultiplier: 2,
        })

        function raf(time) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
      }
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup
      try {
        if (window.Lenis) {
          window.Lenis.destroy?.()
        }
      } catch (e) {
        // Silently fail
      }
    }
  }, [])

  return <>{children}</>
}

declare global {
  interface Window {
    Lenis?: any
  }
}
