"use client"

import { Header } from "@/components/header"

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-3 py-24 md:py-24 max-w-full">
          {/* About Hero Section */}
          <section className="mb-24 md:mb-32">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
              {/* Title Column */}
              <div>
                <h1 className="text-lg md:text-xl font-medium text-card">About me</h1>
              </div>

              {/* Photo Column */}
              <div className="flex justify-center">
                <img
                  src="/images/design-mode/Adnan.jpg"
                  alt="About me"
                  className="w-full max-w-2xl aspect-square object-cover rounded-lg"
                />
              </div>

              {/* Details Column */}
              <div className="space-y-4">
                <p className="text-lg md:text-xl text-card leading-relaxed">
  Hi, I’m Adnan Akif — a designer and brand creator helping businesses stand out. I craft logos, brand identities, packaging, and websites that are beautiful, strategic, and memorable. My work solves unclear, forgettable, or inconsistent branding, so your audience immediately understands your value.
</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
