"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { projectData } from "@/lib/projects"
import { useState, useEffect } from "react"

export default function GalleryPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        // Simulate async operation
        await new Promise((resolve) => setTimeout(resolve, 300))

        const foundProject = projectData.find((p) => p.name.toLowerCase().replace(/\s+/g, "-") === params.slug)

        if (!foundProject) {
          setError("Project not found")
          return
        }

        setProject(foundProject)
      } catch (err) {
        setError("Failed to load project")
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-foreground"></div>
          <p className="mt-4 text-foreground">Loading project...</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground mb-4">{error || "Project not found"}</p>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-foreground hover:opacity-70 transition-opacity"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="px-3 md:px-6 py-4 md:py-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-card hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      {/* Hero Image */}
      <div className="px-3 md:px-6 py-6 md:py-8">
        <div className="aspect-video overflow-hidden rounded-lg">
          <img
            src={project.heroImage || "/placeholder.svg"}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {project.galleryImages && project.galleryImages.length > 0 && (
        <div className="px-3 md:px-6 py-6 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {project.galleryImages.map((media: string, index: number) => {
              const isVideo = media.toLowerCase().endsWith(".mp4")

              return (
                <div key={index} className="aspect-auto overflow-hidden rounded-lg">
                  {isVideo ? (
                    <video src={media} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                  ) : (
                    <img
                      src={media || "/placeholder.svg"}
                      alt={`${project.title} - ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
