"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Target, Code, Brain } from "lucide-react"

export default function AboutSection() {
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

  const highlights = [
    {
      icon: Code,
      title: "Technical Expertise",
      description: "Python, MySQL, Java, C/C++, HTML, CSS",
      color: "from-primary-500 to-primary-600",
    },
    {
      icon: Brain,
      title: "Problem Solving",
      description: "Strong analytical and logical thinking skills",
      color: "from-accent-500 to-accent-600",
    },
    {
      icon: Target,
      title: "Data Science Focus",
      description: "Specialized in real-world data challenges",
      color: "from-secondary-500 to-secondary-600",
    },
    {
      icon: Sparkles,
      title: "Innovation Driven",
      description: "Committed to continuous learning",
      color: "from-primary-400 to-accent-500",
    },
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4 mr-2" />
                Profile Summary
              </div>

              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Motivated and proactive Computer Application student specializing in Data Science, with proficiency in
                  Python, MySQL, Java, C/C++, HTML, and CSS. Strong problem-solving and logical thinking skills,
                  passionate about applying data science techniques to real-world challenges.
                </p>
                <p>
                  Committed to continuous learning and innovation. Actively seeking internship roles in Python, Data
                  Science, and Data Analysis.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {["Data Science", "Python", "Machine Learning", "Problem Solving", "Innovation"].map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((highlight, index) => {
                const IconComponent = highlight.icon
                return (
                  <Card
                    key={index}
                    className={`p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white ${
                      isVisible ? "animate-fade-in" : ""
                    }`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <CardContent className="p-0 text-center">
                      <div
                        className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${highlight.color} flex items-center justify-center`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                      <p className="text-sm text-gray-600">{highlight.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
