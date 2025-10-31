"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { ChevronDown } from "lucide-react"
import { countries } from "@/lib/countries"

export default function ContactPage() {
  const [selectedCountry, setSelectedCountry] = useState({ flag: "🇺🇸", code: "+1", name: "United States" })
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [countrySearchQuery, setCountrySearchQuery] = useState("")
  const [budgetDropdownOpen, setBudgetDropdownOpen] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState("Select your budget")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [servicesError, setServicesError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timelineDropdownOpen, setTimelineDropdownOpen] = useState(false)
  const [selectedTimeline, setSelectedTimeline] = useState("Select timeline")
  const [hearAboutDropdownOpen, setHearAboutDropdownOpen] = useState(false)
  const [selectedHearAbout, setSelectedHearAbout] = useState("Select an option")

  const countryDropdownRef = useRef<HTMLDivElement>(null)
  const budgetDropdownRef = useRef<HTMLDivElement>(null)
  const timelineDropdownRef = useRef<HTMLDivElement>(null)
  const hearAboutDropdownRef = useRef<HTMLDivElement>(null)

  const timelineOptions = ["1-2 weeks", "2-4 weeks", "1-2 months", "2-3 months", "3+ months"]
  const hearAboutOptions = ["Google Search", "Social Media", "Referral", "Portfolio", "Other"]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false)
      }
      if (budgetDropdownRef.current && !budgetDropdownRef.current.contains(event.target as Node)) {
        setBudgetDropdownOpen(false)
      }
      if (timelineDropdownRef.current && !timelineDropdownRef.current.contains(event.target as Node)) {
        setTimelineDropdownOpen(false)
      }
      if (hearAboutDropdownRef.current && !hearAboutDropdownRef.current.contains(event.target as Node)) {
        setHearAboutDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
      country.code.includes(countrySearchQuery),
  )

  const budgetOptions = [
    "Logo Design Starting at $200 - $Custom Price",
    "Branding Design Starting at $1,000 - Custom Price",
    "Packaging Design Starting at $350 - $Cutom Price",
  ]

  const handleCountrySelect = (country: (typeof countries)[0]) => {
    setSelectedCountry(country)
    setIsCountryDropdownOpen(false)
    setCountrySearchQuery("")
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServicesError("")

    const formData = new FormData(e.target as HTMLFormElement)
    const selectedServices = formData.getAll("services")

    if (selectedServices.length === 0) {
      setServicesError("Please select at least one service")
      return
    }

    if (selectedBudget === "Select your budget") {
      setServicesError("Please select your budget")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("https://formspree.io/f/xjkoweql", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setShowSuccessMessage(true)
        ;(e.target as HTMLFormElement).reset()
        setSelectedBudget("Select your budget")

        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 5000)
      } else {
        throw new Error("Form submission failed")
      }
    } catch (error) {
      setServicesError("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-5xl md:text-9xl font-regular text-card mb-4 text-center animate-fade-in-up"
            style={{ animationDelay: "0ms" }}
          >
            Lets's Connect
          </h1>
          <p
            className="text-[14px] lg:text-xl text-card mb-12 text-center animate-fade-in-up"
            style={{ animationDelay: "150ms" }}
          >
            Whether you're ready to start a project or just exploring, <br />
            we'd love to hear from you.
          </p>

          {showSuccessMessage && (
            <div className="mb-8 p-4 bg-green-600 text-card rounded-lg border border-green-500 shadow-2xl">
              <h3 className="text-lg font-medium mb-2">Thank you for your message!</h3>
              <p>We'll get back to you within 24 hours.</p>
            </div>
          )}

          <div className="">
            <form
              action="https://formspree.io/f/xjkoweql"
              method="POST"
              onSubmit={handleFormSubmit}
              className={showSuccessMessage ? "hidden" : "space-y-6"}
            >
              {/* Name and Organization */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-4 bg-chart-1 rounded-lg placeholder-chart-2 border border-chart-1 focus:bg-transparent focus:border-primary focus:outline-none transition-colors duration-200 text-black focus:text-card"
                />
                <input
                  type="text"
                  name="Brand"
                  placeholder="Business / Brand Name"
                  required
                  className="w-full px-4 py-4 bg-chart-1 placeholder-chart-2 border border-chart-1 focus:bg-transparent focus:border-primary focus:outline-none rounded-lg transition-colors duration-200 text-black focus:text-card"
                />
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-4 bg-chart-1 placeholder-chart-2 border border-chart-1 focus:bg-transparent focus:border-primary focus:outline-none rounded-lg transition-colors duration-200 text-black focus:text-card"
                />
                <div className="relative" ref={countryDropdownRef}>
                  <div className="flex">
                    <div
                      className="flex items-center px-2 bg-chart-1 border-t border-l border-b border-chart-1 border-r-0 text-foreground placeholder-muted-foreground rounded-l-lg transition-colors duration-200 focus:ring-ring cursor-pointer"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                    >
                      <span className="text-black text-sm">{selectedCountry.flag}</span>
                      <span className="text-black text-sm ml-1">{selectedCountry.code}</span>
                      <ChevronDown
                        className={`h-3 w-3 text-black ml-1 transition-transform ${isCountryDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Number"
                      required
                      className="w-full px-4 py-4 bg-chart-1 placeholder-chart-2 border border-chart-1 focus:bg-transparent focus:border-primary focus:outline-none rounded-r-lg transition-colors duration-200 text-black focus:text-card"
                    />
                  </div>
                  <input type="hidden" name="country_code" value={`${selectedCountry.flag} ${selectedCountry.code}`} />
                  {isCountryDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-chart-1 border border-background rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                      <div className="p-2">
                        <input
                          type="text"
                          placeholder="Search countries..."
                          value={countrySearchQuery}
                          onChange={(e) => setCountrySearchQuery(e.target.value)}
                          className="w-full px-3 py-2 bg-chart-1 text-black placeholder-black rounded-full border border-black focus:bg-transparent focus:outline-none focus:ring-1 focus:ring-ring"
                        />
                      </div>
                      <div className="max-h-32 overflow-y-auto">
                        {filteredCountries.map((country) => (
                          <button
                            key={country.name}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className="w-full px-4 py-2 text-left text-black hover:bg-black hover:text-white flex items-center space-x-2"
                          >
                            <span>{country.flag}</span>
                            <span className="text-sm">{country.code}</span>
                            <span className="text-sm">{country.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Link and Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="url"
                  name="socialLink"
                  placeholder="Website / Social Link"
                  className="w-full px-4 py-4 bg-chart-1 placeholder-chart-2 border border-chart-1 focus:bg-transparent focus:border-primary focus:outline-none rounded-lg transition-colors duration-200 text-black focus:text-card"
                />

                <div className="relative" ref={budgetDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setBudgetDropdownOpen(!budgetDropdownOpen)}
                    className="w-full bg-chart-1 text-black px-4 py-4 rounded-lg border border-chart-1 focus:border-primary focus:bg-transparent focus:outline-none transition-all duration-200 flex items-center justify-between group"
                  >
                    <span
                      className={selectedBudget === "Select your budget" ? "text-chart-2" : "text-chart-2"}
                    >
                      {selectedBudget}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-chart-2 group-hover:text-chart-2 transition-all duration-300 ${
                        budgetDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  {budgetDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-chart-1 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                      {budgetOptions.map((option, index) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setSelectedBudget(option)
                            setBudgetDropdownOpen(false)
                          }}
                          className={
                            "w-full px-4 py-3 text-left text-black hover:bg-black hover:text-white transition-colors duration-200" +
                            (index === 0 ? "rounded-t-lg " : "") +
                            (index === budgetOptions.length - 1 ? "rounded-b-lg " : "") +
                            "border-b " +
                            (index === budgetOptions.length - 1 ? "border-b-0" : "border-[#777]")
                          }
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                  <input
                    type="hidden"
                    name="budget"
                    value={selectedBudget !== "Select your budget" ? selectedBudget : ""}
                  />
                </div>
              </div>

              

              {/* Project Description */}
              <textarea
                name="project_description"
                placeholder="Provide a brief description of the project / brand"
                rows={4}
                required
                className="w-full px-4 py-4 bg-chart-1 placeholder-chart-2 border border-chart-1 rounded-lg focus:bg-transparent focus:border-primary focus:outline-none transition-colors duration-200 resize-none text-black focus:text-card"
              ></textarea>

              {/* Project Deadline and Hear About - Side by side */}
              <div className="realative">
                <div className="relative" ref={hearAboutDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setHearAboutDropdownOpen(!hearAboutDropdownOpen)}
                    className="w-full bg-chart-1 text-foreground px-4 py-4 rounded-lg border border-chart-1 focus:border-primary focus:bg-transparent focus:outline-none transition-all duration-200 flex items-center justify-between group"
                  >
                    <span
                      className={selectedHearAbout === "Select an option" ? "text-chart-2" : "text-chart-2"}
                    >
                      {selectedHearAbout}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-chart-2 group-hover:text-chart-2 transition-all duration-300 ${
                        hearAboutDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  {hearAboutDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-chart-1 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                      {hearAboutOptions.map((option, index) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setSelectedHearAbout(option)
                            setHearAboutDropdownOpen(false)
                          }}
                          className={
                            "w-full px-4 py-3 text-left text-black hover:bg-black hover:text-white transition-colors duration-200 " +
                            (index === 0 ? "rounded-t-lg " : "") +
                            (index === hearAboutOptions.length - 1 ? "rounded-b-lg " : "") +
                            "border-b " +
                            (index === hearAboutOptions.length - 1 ? "border-b-0" : "border-chart-1")
                          }
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                  <input
                    type="hidden"
                    name="referral_source"
                    value={selectedHearAbout !== "Select an option" ? selectedHearAbout : ""}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg lg:text-[24px] font-regular text-card">
                  What services are you interested in? *
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="services"
                      value="logo-design"
                      className="w-7 h-7 text-white bg-[#1c1c1c] border border-[#777] rounded"
                    />
                    <span className="text-card lg:text-[14px] font-medium">Logo design</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="services"
                      value="brand-identity"
                      className="w-7 h-7 text-white bg-[#1c1c1c] border border-[#777] rounded"
                    />
                    <span className="text-card lg:text-[14px] font-medium">Brand Identity</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="services"
                      value="packaging"
                      className="w-7 h-7 text-white bg-[#1c1c1c] border border-[#777] rounded"
                    />
                    <span className="text-card lg:text-[14px] font-medium">Packaging</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="services"
                      value="web"
                      className="w-7 h-7 text-white bg-[#1c1c1c] border border-[#777] rounded"
                    />
                    <span className="text-card lg:text-[14px] font-medium">Web Development</span>
                  </label>
                </div>
                {servicesError && <p className="text-red-500 text-sm">{servicesError}</p>}
              </div>

              <div className="relative overflow-hidden group/submit">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#10B981] text-black lg:text-[18px] rounded-lg font-medium py-5 px-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg hover:shadow-xl"
                >
                  <div className="relative overflow-hidden">
                    <span className="block transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/submit:">
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
