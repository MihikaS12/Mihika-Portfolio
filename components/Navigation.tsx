"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = ["about", "experience", "projects", "skills", "contact"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (current) {
        setActiveSection(current)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const navItems = [
    { id: "about", label: "About Me" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span
              className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}
            >
              Mihika Sharma
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={`relative px-4 py-2 transition-all duration-300 ${
                  activeSection === item.id
                    ? isScrolled
                      ? "text-primary-600 bg-primary-50"
                      : "text-white bg-white/10"
                    : isScrolled
                      ? "text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-current rounded-full" />
                )}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors duration-300 ${
                isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-primary-600 bg-primary-50"
                      : "text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  }`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
