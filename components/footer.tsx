"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export function Footer() {
  const router = useRouter()

  return (
    <footer className="py-12 md:py-16">
      <div className="mx-auto px-3 py-12 md:py-16 max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12 md:mb-16">
          {/* Left Column - Heading, CTA, and Contact */}
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl md:text-5xl lg:text-[48px] font-medium text-card leading-tight md:whitespace-nowrap">
              Design it once. Design it right
            </h2>

            {/* CTA Button */}
            <button
              onClick={() => router.push("/contact")}
              className="w-full px-8 py-4 bg-card text-background font-medium text-center"
            >
              Lets Talk →
            </button>

            {/* Contact Info */}
            <div className="flex flex-col gap-2 pt-4 md:pt-0">
              <p className="text-sm text-card">New Business :</p>
              <a href="mailto:adnanakif.co@gmail.com" className="text-card">
                adnanakif.co@gmail.com
              </a>
            </div>
          </div>

          <div className="hidden md:block"></div>

          {/* Right Column - Navigation and Social Links */}
          <div className="grid grid-cols-2 gap-4 pt-8 md:pt-0">
            {/* Navigation Links */}
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-card lg:text-[14px] font-medium">
                Home
              </Link>
              <Link href="/about" className="text-card lg:text-[14px] font-medium">
                About
              </Link>
              <Link href="/portfolio" className="text-card lg:text-[14px] font-medium">
                Portfolio
              </Link>
              <Link href="/contact" className="text-card lg:text-[14px] font-medium">
                Contact
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-2">
              <a
                href="https://www.facebook.com/brandzinr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-card lg:text-[14px] font-medium"
              >
                Facebook ↗
              </a>
              <a
                href="https://www.instagram.com/adnanakifdesign"
                target="_blank"
                rel="noopener noreferrer"
                className="text-card lg:text-[14px] font-medium"
              >
                Instagram ↗
              </a>
              <a
                href="https://www.youtube.com/@adnanakifdesign"
                target="_blank"
                rel="noopener noreferrer"
                className="text-card lg:text-[14px] font-medium"
              >
                YouTube ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
