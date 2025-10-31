"use client"
import React from "react"
import { useState, useEffect, useRef } from "react"
import { AnimatedHamburger } from "./animated-hamburger"
import { countries } from "@/lib/countries"
import { projectData } from "@/lib/projects"

interface HeaderProps {
  onWorkClick?: () => void
  onScrollToSection?: (sectionId: string) => void
}

const productData = [
  {
    id: 1,
    name: "Logo Design Template",
    subtitle: "Professional logo collection",
    price: "$29",
    image: "/modern-logo-design-template.png",
  },
  {
    id: 2,
    name: "Brand Identity Kit",
    subtitle: "Complete branding package",
    price: "$89",
    image: "/brand-identity-kit.png",
  },
  {
    id: 3,
    name: "Business Card Set",
    subtitle: "Premium card designs",
    price: "$19",
    image: "Thumbnail.png",
  },
  {
    id: 4,
    name: "Social Media Pack",
    subtitle: "Instagram & Facebook templates",
    price: "$39",
    image: "/social-media-design-templates.png",
  },
  {
    id: 5,
    name: "Website Template",
    subtitle: "Modern web design",
    price: "$149",
    image: "/modern-website-template-design.png",
  },
  {
    id: 6,
    name: "Packaging Design",
    subtitle: "Product packaging templates",
    price: "$69",
    image: "/product-packaging-design-templates.png",
  },
  {
    id: 7,
    name: "Letterhead Design",
    subtitle: "Professional stationery",
    price: "$25",
    image: "/letterhead-design-templates.png",
  },
  {
    id: 8,
    name: "Brochure Template",
    subtitle: "Marketing materials",
    price: "$35",
    image: "/brochure-design-templates.png",
  },
  {
    id: 9,
    name: "Icon Set Bundle",
    subtitle: "500+ premium icons",
    price: "$49",
    image: "/premium-icon-set-bundle.png",
  },
]

const Header = React.forwardRef<any, HeaderProps>((props, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState({ flag: "🇺🇸", code: "+1", name: "United States" })
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    socialLink: "",
    budget: "",
    services: [] as string[],
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [isDark, setIsDark] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [countrySearchQuery, setCountrySearchQuery] = useState("")
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
      country.code.includes(countrySearchQuery),
  )

  const filteredProjects =
    selectedCategory === "ALL"
      ? projectData.slice(0, 24)
      : projectData.filter((project) => project.category === selectedCategory)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const resetHideTimeout = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
    }

    hideTimeoutRef.current = setTimeout(() => {
      console.log("[v0] Auto-hiding header after 5 seconds")
      setIsVisible(false)
    }, 5000)
  }

  useEffect(() => {
    resetHideTimeout()

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 10) {
        // At top of page - show header and reset timeout
        setIsVisible(true)
        resetHideTimeout()
      } else if (currentScrollY < lastScrollY && Math.abs(currentScrollY - lastScrollY) > 5) {
        // Scrolling up - show header and reset timeout
        console.log("[v0] Scrolling up - showing header")
        setIsVisible(true)
        resetHideTimeout()
      } else if (currentScrollY > lastScrollY && Math.abs(currentScrollY - lastScrollY) > 5) {
        // Scrolling down - hide header immediately
        console.log("[v0] Scrolling down - hiding header")
        setIsVisible(false)
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current)
        }
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", controlHeader)
    return () => {
      window.removeEventListener("scroll", controlHeader)
    }
  }, [lastScrollY])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full
           bg-background
           z-50
           transition-transform duration-300 ease-out
           ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
          {/* Mobile Layout - Profile on left */}
          <div className="lg:hidden flex items-center">
            <a
              href="adnanakif.com"
              className="w-8 h-8 rounded-full overflow-hidden border-2 border-black/10 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Go to homepage"
            >
              <img src="/images/design-mode/AdnanPNG.png" alt="Profile" className="w-full h-full object-cover" />
            </a>
          </div>

          {/* Desktop Layout - All items centered */}
          <div className="hidden lg:flex items-center gap-4 mx-auto">
            {/* Desktop Navigation Links */}
            <nav className="flex items-center gap-8 text-card">
              <a href="/" className="relative group cursor-pointer">
                <span className="block font-medium text-card text-sm">Home</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-card transition-all duration-500 ease-out group-hover:w-full"></span>
              </a>

              <a href="/about" className="relative group cursor-pointer">
                <span className="block font-medium text-card text-sm">About</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-card transition-all duration-500 ease-out group-hover:w-full"></span>
              </a>

              <a href="/portfolio" className="relative group cursor-pointer">
                <span className="block font-medium text-card text-sm">Portfolio</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-card transition-all duration-500 ease-out group-hover:w-full"></span>
              </a>

              <a href="/contact" className="relative group cursor-pointer">
                <span className="block font-medium text-card text-sm">Contact</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-card transition-all duration-500 ease-out group-hover:w-full"></span>
              </a>
            </nav>
          </div>

          {/* Mobile Right Side - Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <AnimatedHamburger isOpen={isMenuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 overflow-hidden transition-all duration-700 ease-in-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-background transform transition-transform duration-700 ease-out ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        />

        <div
          className={`relative h-full transform transition-all duration-500 ease-out ${
            isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{
            transitionDelay: isMenuOpen ? "1000ms" : "0ms",
          }}
        >
          <div className="h-full flex flex-col lg:flex-row">
            <div className="flex-1 relative px-4 pt-20 pb-20 sm:px-6 sm:pt-24 sm:pb-24 lg:px-8 lg:py-8">
              <div className="h-full flex items-center justify-center lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-start lg:px-8 lg:py-8">
                <nav className="space-y-4 sm:space-y-6 text-card lg:space-y-4 w-full">
                  {[
                    { name: "HOME", href: "/" },
                    { name: "ABOUT", href: "/about" },
                    { name: "PORTFOLIO", href: "/portfolio" },
                    { name: "CONTACT", href: "/contact" },
                  ].map((item, index) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`group cursor-pointer transform transition-all duration-500 ease-out block ${
                        isMenuOpen ? "translate-x-0 opacity-100 animate-bounce-in" : "-translate-x-8 opacity-0"
                      }`}
                      style={{
                        transitionDelay: isMenuOpen ? `${1200 + index * 100}ms` : "0s",
                        animationDelay: isMenuOpen ? `${1200 + index * 100}ms` : "0s",
                      }}
                    >
                      <div className="flex items-center justify-center pb-0">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="relative overflow-hidden">
                            <span
                              className="block font-normal tracking-tight transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-[120%] group-hover:text-chart-2 text-[50px] sm:text-[60px] md:text-[70px] lg:text-[80px]"
                              style={{ lineHeight: "0.85" }}
                            >
                              {item.name}
                            </span>
                            <span
                              className="absolute inset-0 flex items-center font-normal tracking-tight transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] translate-y-[120%] group-hover:translate-y-0 text-chart-2 text-[50px] sm:text-[60px] md:text-[70px] lg:text-[80px]"
                              style={{ lineHeight: "0.85" }}
                            >
                              {item.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(20px);
          }
          40% {
            opacity: 1;
            transform: scale(1.08) translateY(-10px);
          }
          60% {
            transform: scale(0.95) translateY(5px);
          }
          80% {
            transform: scale(1.02) translateY(-3px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        :global(.animate-bounce-in) {
          animation: bounce-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation-fill-mode: both;
        }
      `}</style>
    </>
  )
})

Header.displayName = "Header"

export { Header }
