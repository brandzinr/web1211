"use client"

import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-8 h-8 rounded-full bg-card border border-border shadow-lg transition-all duration-700 ease-in-out hover:scale-110 active:scale-95"
      aria-label="Toggle theme"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {/* Sun icon for dark mode */}
        <svg
          className={`absolute w-4 h-4 transition-all duration-700 ease-in-out ${
            isDark ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line
            x1="18.36"
            y1="18.36"
            x2="19.78"
            y2="19.78"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Moon icon for light mode */}
        <svg
          className={`absolute w-4 h-4 transition-all duration-700 ease-in-out ${
            isDark ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
    </button>
  )
}
