"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"
import ContactForm from "./ContactForm"

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "sharmamihika76@gmail.com",
      href: "mailto:sharmamihika76@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9516091954",
      href: "tel:+919516091954",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bhopal, MP, India",
      href: "#",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/MihikaS12",
      color: "hover:text-gray-800",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/mihika-sharma-/",
      color: "hover:text-primary-300",
    },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-800 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Let's Work Together</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-white to-accent-400 mx-auto rounded-full"></div>
            <p className="text-white/80 mt-4 max-w-2xl mx-auto text-lg">
              Ready to bring your ideas to life? Let's discuss how we can collaborate on your next project.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="text-white">
                <h3 className="text-2xl font-semibold mb-4">Get In Touch</h3>
                <p className="text-white/80 leading-relaxed mb-8">
                  I'm always excited to discuss new opportunities, collaborate on interesting projects, or simply
                  connect with fellow tech enthusiasts. Feel free to reach out!
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 ${
                        isVisible ? "animate-slide-in-left" : ""
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="p-3 bg-white/20 rounded-full">
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white/70 text-sm">{info.label}</div>
                        <a
                          href={info.href}
                          className="text-white font-semibold hover:text-accent-300 transition-colors duration-300"
                        >
                          {info.value}
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="lg"
                      className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 bg-transparent px-6"
                      onClick={() => window.open(social.href, "_blank")}
                    >
                      <IconComponent className="h-5 w-5" />
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-white/20 text-center text-white/70 relative z-10">
        <p>&copy; 2025 Mihika Sharma. All rights reserved.</p>
        <p className="mt-2">Built with passion for technology and innovation.</p>
      </div>
    </section>
  )
}
