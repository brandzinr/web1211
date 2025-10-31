"use client"

import * as React from "react"

export interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "dark",
  enableSystem = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState(defaultTheme)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.className = savedTheme
    } else {
      setTheme("dark")
      document.documentElement.className = "dark"
    }
  }, [])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (newTheme: string) => {
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
        document.documentElement.className = newTheme
      },
    }),
    [theme],
  )

  if (!mounted) {
    return <>{children}</>
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

const ThemeContext = React.createContext<{
  theme: string
  setTheme: (theme: string) => void
}>({
  theme: "dark",
  setTheme: () => {},
})

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
