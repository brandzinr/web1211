"use client"

import { Header } from "@/components/header"
import { useState, useRef, useEffect } from "react"

export default function PortfolioPage() {
  const [activeGallery, setActiveGallery] = useState<number | null>(null)
  const [visibleProjects, setVisibleProjects] = useState<boolean[]>([])
  const projectRefsArray = useRef<(HTMLDivElement | null)[]>([])

  const projects = [
    {
      title: "Casalola",
      category: "Brand Identity",
      image: "https://designmox.co/wp-content/uploads/2025/10/casaloal-03.jpg",
      slug: "casalola",
      gallery: [
        "https://designmox.co/wp-content/uploads/2025/10/casaloal-03.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/casaloal-04.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/casaloal-05.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/casaloal-06.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/casaloal-07.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/casaloal-08.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/casaloal-09.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/casaloal-10.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/Casaloal.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/Casalola-01.jpg",
      ],
    },
    {
      title: "DOMO",
      category: "Brand Design",
      image: "https://designmox.co/wp-content/uploads/2025/10/242325.jpg",
      slug: "domo",
      gallery: [
        "https://designmox.co/wp-content/uploads/2025/10/242325.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/546532.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/42325.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/6452525.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/546464.mp4",
        "https://designmox.co/wp-content/uploads/2025/10/252525.mp4",
        "https://designmox.co/wp-content/uploads/2025/10/54725.mp4",
        "https://designmox.co/wp-content/uploads/2025/10/31313.mp4",
      ],
    },
    {
      title: "Ajorra",
      category: "Packaging",
      image: "https://designmox.co/wp-content/uploads/2025/10/5858568.jpg",
      slug: "ajorra",
      gallery: [
        "https://designmox.co/wp-content/uploads/2025/10/5858568.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/786768.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/675657.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/363636.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/86868.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/57557.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/36457.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/33363.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/4t4366.jpg",
      ],
    },
    {
      title: "ARKO ART CENTER",
      category: "Brand Identity",
      image: "https://designmox.co/wp-content/uploads/2025/10/74343525.jpg",
      slug: "arko-art-center",
      gallery: [
        "https://designmox.co/wp-content/uploads/2025/10/74343525.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/4545636.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/4353436.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/656466.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/576452.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/423526.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/363636-1.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/35366.jpg",
      ],
    },
    {
      title: "El Relincho",
      category: "Brand Identity",
      image: "https://designmox.co/wp-content/uploads/2025/10/3533636.jpg",
      slug: "el-relincho",
      gallery: [
        "https://designmox.co/wp-content/uploads/2025/10/3533636.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/6455646.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/436564.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/365466.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/365466.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/53535.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/46466.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/46336.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/7336.jpg",
      ],
    },
    {
      title: "Cravers",
      category: "Brand Design",
      image: "https://designmox.co/wp-content/uploads/2025/10/423424.jpg",
      slug: "cravers",
      gallery: [
        "https://designmox.co/wp-content/uploads/2025/10/423424.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/634636.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/532525.mp4",
        "https://designmox.co/wp-content/uploads/2025/10/463436.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/423424.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/3636.mp4",
        "https://designmox.co/wp-content/uploads/2025/10/363737.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/347373.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/42424.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/34636.mp4",
        "https://designmox.co/wp-content/uploads/2025/10/33636.jpg",
      ],
    },
    {
      title: "Compani",
      category: "Logo Design",
      image: "https://designmox.co/wp-content/uploads/2025/10/567546346.jpg",
      slug: "compani",
      gallery: [
        "https://designmox.co/wp-content/uploads/2025/10/567546346.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/6574363.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/4646636.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/566464.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/523535.jpg",
        "https://designmox.co/wp-content/uploads/2025/10/4t4456.jpg",
      ],
    },
    {
      title: "Tokri",
      category: "Packaging Design",
      image: "https://designmox.co/wp-content/uploads/2025/10/02123c223098877.67f48cb5a4549.jpg",
      slug: "tokri",
      gallery: [
        "https://designmox.co/wp-content/uploads/2025/10/02123c223098877.67f48cb5a4549.jpg",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
    },
  ]

  useEffect(() => {
    setVisibleProjects(new Array(projects.length).fill(false))
  }, [projects.length])

  useEffect(() => {
    const animatedProjects = new Set<number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = projectRefsArray.current.indexOf(entry.target as HTMLDivElement)
          if (index !== -1 && entry.isIntersecting && !animatedProjects.has(index)) {
            animatedProjects.add(index)
            setVisibleProjects((prev) => {
              const updated = [...prev]
              updated[index] = true
              return updated
            })
            observer.unobserve(entry.target)
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-3">
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
      </main>

      {/* Gallery Modal */}
      {activeGallery !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveGallery(null)}
        >
          <div
            className="bg-white rounded-3xl w-[96%] h-[96vh] p-6 md:p-8 overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">{projects[activeGallery].title}</h2>
                <p className="text-muted-foreground text-base md:text-lg">{projects[activeGallery].category}</p>
              </div>
              <button
                onClick={() => setActiveGallery(null)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-black/90 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:gap-8">
              {projects[activeGallery].gallery.map((media, index) => {
                const isVideo = media.endsWith(".mp4")

                return isVideo ? (
                  <video key={index} src={media} autoPlay muted loop controls className="w-full rounded-2xl" />
                ) : (
                  <img
                    key={index}
                    src={media || "/placeholder.svg"}
                    alt={`${projects[activeGallery].title} ${index + 1}`}
                    loading="lazy"
                    className="w-full rounded-2xl"
                  />
                )
              })}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(100%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        :global(.animate-slide-up) {
          animation: slide-up 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  )
}
