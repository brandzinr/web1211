"use client"

import { Header } from "@/components/header"
import React, { useState, useRef, useEffect } from "react"
import { countries } from "@/lib/countries"

export default function Home() {
  const [viewMode, setViewMode] = React.useState("grid")
  const [selectedCountry, setSelectedCountry] = useState({ flag: "🇺🇸", code: "+1", name: "United States" })
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [countrySearchQuery, setCountrySearchQuery] = useState("")
  const [visibleProjects, setVisibleProjects] = useState<boolean[]>([])
  const [loadingProjectIndex, setLoadingProjectIndex] = useState<number | null>(null)
  const [expandedServices, setExpandedServices] = useState<boolean[]>([false, false, false, false])
  const [visibleServices, setVisibleServices] = useState<boolean[]>([false, false, false, false])

  const countryDropdownRef = useRef<HTMLDivElement>(null)
  const projectRefsArray = useRef<(HTMLAnchorElement | null)[]>([])
  const animatedProjects = useRef<Set<number>>(new Set())
  const servicesRefsArray = useRef<(HTMLDivElement | null)[]>([])
  const animatedServices = useRef<Set<number>>(new Set())

  const projects = [
    {
      title: "Casalola",
      category: "Brand Identity",
      image: "https://designmox.co/wp-content/uploads/2025/10/casaloal-03.jpg",
      slug: "casalola",
    },
    {
      title: "DOMO",
      category: "Brand Design",
      image: "https://designmox.co/wp-content/uploads/2025/10/242325.jpg",
      slug: "domo",
    },
    {
      title: "Ajorra",
      category: "Packaging",
      image: "https://designmox.co/wp-content/uploads/2025/10/5858568.jpg",
      slug: "ajorra",
    },
    {
      title: "ARKO ART CENTER",
      category: "Brand Identity",
      image: "https://designmox.co/wp-content/uploads/2025/10/74343525.jpg",
      slug: "arko-art-center",
    },
    
  ]

  const services = [
    {
      title: "Logo Design",
      description:
        "Crafting logos that capture your brand’s essence and connect instantly with your audience. Each design combines strategy, clarity, and visual impact — so your brand is remembered for all the right reasons.",
      details:
        "",
    },
    {
      title: "Brand Identity",
      description: "Building cohesive brand systems — colors, typography, and visual language — that make your business professional, consistent, and instantly recognizable across all platforms.",
      details:
        " ",
    },
    {
      title: "Packaging Design",
      description:
        "Designing packaging that not only looks premium but sells. Each detail is crafted to capture attention, connect emotionally, and strengthen your brand on shelves and online.",
      details:
        "",
    },
    {
      title: "Web Design & Development",
      description:
        "Designing responsive websites that turn first impressions into trust. Clean, modern, and user-focused — each site showcases your brand and converts visitors into customers.",
      details:
        "",
    },
  ]

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
      country.code.includes(countrySearchQuery),
  )

  const handleCountrySelect = (country: (typeof countries)[0]) => {
    setSelectedCountry(country)
    setIsCountryDropdownOpen(false)
    setCountrySearchQuery("")
  }

  const handleProjectClick = (index: number) => {
    setLoadingProjectIndex(index)
  }

  const toggleService = (index: number) => {
    setExpandedServices((prev) => {
      const updated = [...prev]
      updated[index] = !updated[index]
      return updated
    })
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    setVisibleProjects(new Array(projects.length).fill(false))
  }, [projects.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = servicesRefsArray.current.indexOf(entry.target as HTMLDivElement)
          if (index !== -1 && entry.isIntersecting) {
            if (!animatedServices.current.has(index)) {
              animatedServices.current.add(index)
              setVisibleServices((prev) => {
                const updated = [...prev]
                updated[index] = true
                return updated
              })
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    servicesRefsArray.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      servicesRefsArray.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = projectRefsArray.current.indexOf(entry.target as HTMLAnchorElement)
          if (index !== -1 && entry.isIntersecting) {
            if (!animatedProjects.current.has(index)) {
              animatedProjects.current.add(index)
              setVisibleProjects((prev) => {
                const updated = [...prev]
                updated[index] = true
                return updated
              })
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    projectRefsArray.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      projectRefsArray.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-3 py-24 md:py-24 max-w-full">
        {/* Hero text section */}
        <section className="mb-24 md:mb-24 lg:mb-24 flex justify-center">
          <div className="max-w-2xl text-left">
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-light text-card font-medium leading-tight mb-6">
              Hello!
              <br />
              I'm Adnan.
            </h1>
            <p className="text-lg md:text-xl lg:text-[26px] text-card font-regular leading-relaxed">
              Strategic logo & packaging design for brands that want to stand out. I help startups and consumer brands build refined, timeless identities that connect emotionally and compete globally.
            </p>
          </div>
        </section>

        <section className="mb-8 md:mb-6 flex items-center justify-between px-0">
          <h2 className="text-lg md:text-xl font-medium text-card">Works</h2>
          <button className="text-card" aria-label="Add more works">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </section>

        {/* Projects Section */}
        <section className="mb-24 md:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:gap-3 gap-3 md:gap-3">
            {projects.map((project, index) => {
              const cardVisible = visibleProjects[index] || false

              return (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) projectRefsArray.current[index] = el
                  }}
                  className={`group bg-muted overflow-hidden transition-all duration-1000 transform flex flex-col cursor-pointer ${
                    cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => (window.location.href = `/gallery/${project.slug}`)}
                >
                  <div
                    className={`w-full aspect-[16/10] overflow-hidden relative bg-muted scale-96 transition-all duration-1000 transform ${
                      cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 150}ms` }}
                  >
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div
                    className={`bg-muted p-4 flex justify-between items-end transition-all duration-1000 transform ${
                      cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 300}ms` }}
                  >
                    <div>
                      <h3 className="text-card font-medium text-base">{project.title}</h3>
                      <p className="text-card text-sm">{project.category}</p>
                    </div>
                    <p className="text-card text-sm">by adnan akif</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-24 md:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Services Header */}
            <div>
              <h2 className="text-lg md:text-xl font-medium text-card">Services</h2>
            </div>

            {/* Services Content */}
            <div className="md:col-span-2">
              <div className="space-y-8">
                {services.map((service, index) => {
                  const serviceVisible = visibleServices[index] || false

                  return (
                    <div
                      key={index}
                      ref={(el) => {
                        if (el) servicesRefsArray.current[index] = el
                      }}
                      className="border-b border-card pb-8"
                    >
                      <div className="flex items-start gap-3 cursor-pointer" onClick={() => toggleService(index)}>
                        {/* Service Title and Description */}
                        <div className="flex-1">
                          <h3
                            className={`text-card font-medium text-base mb-3 transition-all duration-1000 transform ${
                              visibleServices[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                            }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                          >
                            {service.title}
                          </h3>
                          <p className="text-card text-base leading-relaxed">{service.description}</p>

                          {/* Expanded Details */}
                          {expandedServices[index] && (
                            <div className="mt-4 pt-4">
                              <p className="text-card text-base leading-relaxed">{service.details}</p>
                            </div>
                          )}
                        </div>

                        {/* Plus Icon */}
                        <button
                          className="mt-1 flex-shrink-0 text-card"
                          aria-label={expandedServices[index] ? "Collapse" : "Expand"}
                        >
                          <svg
                            className={`w-5 h-5 transition-transform duration-300 ${
                              expandedServices[index] ? "rotate-45" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
