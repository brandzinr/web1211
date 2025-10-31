"use client"

import { useEffect, useRef, useState } from "react"

export function useLazyImage() {
  const ref = useRef<HTMLImageElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          const img = ref.current
          const src = img.dataset.src

          if (src) {
            img.src = src
            img.onload = () => setIsLoaded(true)
            observer.unobserve(img)
          }
        }
      },
      { rootMargin: "50px" },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return { ref, isLoaded }
}
