import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import "./globals.css"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Adnan Akif - Logo & Brand Designer",
    template: "%s | Adnan Akif",
  },
  description:
    "Professional logo and brand designer creating memorable visual identities for startups and established businesses. Specializing in modern, impactful design solutions.",
  keywords: ["logo design", "brand design", "adnan akif", "visual identity", "branding", "designer"],
  authors: [{ name: "Adnan Akif" }],
  creator: "Adnan Akif",
  publisher: "Adnan Akif",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://adnanakif.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Adnan Akif - Logo & Brand Designer",
    description:
      "Professional logo and brand designer creating memorable visual identities for startups and established businesses.",
    url: "https://adnanakif.com",
    siteName: "Adnan Akif",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Adnan Akif - Logo & Brand Designer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adnan Akif - Logo & Brand Designer",
    description: "Professional logo and brand designer creating memorable visual identities.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "https://designmox.co/wp-content/uploads/2025/10/AdnanPNG.png", sizes: "32x32", type: "image/png" },
      { url: "https://designmox.co/wp-content/uploads/2025/10/AdnanPNG.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "https://designmox.co/wp-content/uploads/2025/10/AdnanPNG.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "https://designmox.co/wp-content/uploads/2025/10/AdnanPNG.png", color: "#000000" },
    ],
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Adnan Akif",
              jobTitle: "Logo & Brand Designer",
              description:
                "Professional logo and brand designer creating memorable visual identities for startups and established businesses.",
              url: "https://adnanakif.com",
              sameAs: ["https://instagram.com/adnandzinr"],
              knowsAbout: ["Logo Design", "Brand Identity", "Packaging Design", "Visual Identity", "Graphic Design"],
              offers: {
                "@type": "Offer",
                itemOffered: [
                  {
                    "@type": "Service",
                    name: "Logo Design",
                    description: "Professional logo design starting at $200",
                    priceSpecification: {
                      "@type": "PriceSpecification",
                      price: "200",
                      priceCurrency: "USD",
                    },
                  },
                  {
                    "@type": "Service",
                    name: "Brand Identity",
                    description: "Complete brand identity package starting at $400",
                    priceSpecification: {
                      "@type": "PriceSpecification",
                      price: "400",
                      priceCurrency: "USD",
                    },
                  },
                  {
                    "@type": "Service",
                    name: "Packaging Design",
                    description: "Eye-catching packaging design starting at $300",
                    priceSpecification: {
                      "@type": "PriceSpecification",
                      price: "300",
                      priceCurrency: "USD",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body>
        <SmoothScrollProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <ThemeToggle />
            {children}
            <Footer />
          </ThemeProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
