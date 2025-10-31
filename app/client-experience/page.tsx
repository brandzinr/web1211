"use client"

import { Header } from "@/components/header"

export default function ClientExperiencePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-24 md:py-32">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Client Experience</h1>
        <p className="text-xl text-muted-foreground mb-12">How I work with clients to deliver exceptional results.</p>

        <div className="max-w-4xl mx-auto space-y-12">
          <div className="bg-white rounded-3xl border border-border p-8 md:p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Process</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I believe in a collaborative approach where your vision becomes reality through clear communication,
              regular updates, and iterative design refinement. Every project is unique, and I tailor my process to meet
              your specific needs and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your brand, goals, and target audience through detailed consultation.",
              },
              {
                step: "02",
                title: "Strategy",
                description: "Developing a comprehensive design strategy aligned with your business objectives.",
              },
              {
                step: "03",
                title: "Design",
                description: "Creating beautiful, functional designs with regular updates and your feedback.",
              },
              {
                step: "04",
                title: "Delivery",
                description: "Delivering final assets with all files, documentation, and ongoing support.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-3xl border border-border p-8">
                <div className="text-5xl font-bold text-muted-foreground mb-4">{item.step}</div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
