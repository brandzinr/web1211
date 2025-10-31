"use client"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "./theme-provider"
import { useEffect, useState } from "react"

export function FloatingThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-3 right-3 z-50 w-8 h-8 bg-chart-1 border border-chart-3 hover: text-chart-2 rounded-full flex items-center justify-center  hover: transition-all duration-300 ease-out"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="relative w-4 h-4">
        <Sun
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ease-out ${
            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        />
        <Moon
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ease-out ${
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
          fill="currentColor"
          strokeWidth={0}
        />
      </div>

      <div className="absolute inset-0 rounded-full bg-primary/20 scale-0 group-hover:scale-125 transition-transform duration-300 ease-out -z-10" />
    </button>
  )
}
