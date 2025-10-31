"use client"

interface AnimatedHamburgerProps {
  isOpen: boolean
  onClick?: () => void
  className?: string
}

export function AnimatedHamburger({ isOpen, onClick, className = "" }: AnimatedHamburgerProps) {
  return (
    <button onClick={onClick} className={`flex flex-col justify-center items-center w-8 h-8 ${className}`}>
      {/* Top line */}
      <div
        className={`w-6 h-0.5 bg-card transition-all duration-300 ease-in-out ${
          isOpen ? "rotate-45 translate-y-1.5" : "rotate-0 translate-y-0"
        }`}
      />

      {/* Middle line */}
      <div
        className={`w-6 h-0.5 bg-card transition-all duration-300 ease-in-out my-1 ${
          isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
        }`}
      />

      {/* Bottom line */}
      <div
        className={`w-6 h-0.5 bg-card transition-all duration-300 ease-in-out ${
          isOpen ? "-rotate-45 -translate-y-1.5" : "rotate-0 translate-y-0"
        }`}
      />
    </button>
  )
}
