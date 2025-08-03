"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Github, Linkedin, Download, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about")
    aboutSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-800">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Profile Picture */}
          <div className="mb-8 relative">
            <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-2xl backdrop-blur-sm">
              <Image
                src="/images/mihika-new-profile.jpg"
                alt="Mihika Sharma"
                width={256}
                height={256}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 opacity-20 blur-xl"></div>
          </div>

          {/* Name and Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">Mihika Sharma</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 font-light max-w-3xl mx-auto">
            Data Science Explorer | Python Programmer | Innovating with AI & Tech
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl group px-8 py-3"
              onClick={() => window.open("/resume/Mihika_Sharma_Resume.pdf", "_blank")}
            >
              <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Download Resume
            </Button>

            <div className="flex gap-4">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 transition-all duration-300 bg-transparent px-6"
                onClick={() => window.open("https://github.com/MihikaS12", "_blank")}
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 transition-all duration-300 bg-transparent px-6"
                onClick={() => window.open("https://linkedin.com/in/mihika-sharma-/", "_blank")}
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToNext}
            className="text-white/70 hover:text-white transition-colors duration-300 animate-bounce"
          >
            <ChevronDown className="h-8 w-8 mx-auto" />
          </button>
        </div>
      </div>
    </section>
  )
}
