"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Calendar, Building } from "lucide-react"

export default function ExperienceSection() {
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

  const experiences = [
    {
      title: "AI/ML Developer Intern",
      company: "Stick & Dot Media",
      duration: "Jan 2025 – Apr 2025",
      description: "Developing AI/ML solutions and helping create innovative, real-life applicable projects.",
      technologies: ["Python", "Machine Learning", "AI Development"],
    },
    {
      title: "Data Analyst Intern",
      company: "NullClass",
      duration: "Oct 2024 – Jan 2025",
      description: "Conducted data analysis, optimized processes, and managed large datasets.",
      technologies: ["Python", "Data Analysis", "SQL"],
    },
    {
      title: "Computer Science Trainee",
      company: "Various Organizations",
      duration: "Previous Role",
      description: "Assisted in database management and problem-solving solutions.",
      technologies: ["Python", "MySQL", "GitHub"],
    },
    {
      title: "Study Mentor",
      company: "Independent",
      duration: "Previous Role",
      description: "Taught high school students, developed lesson plans, and provided tutoring support.",
    },
  ]

  return (
    <section id="experience" ref={sectionRef} className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Professional Experience</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className={`bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${exp.current ? "ring-2 ring-blue-400" : ""}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 rounded-full ${exp.current ? "bg-gradient-to-r from-green-500 to-blue-500" : "bg-gradient-to-r from-primary-500 to-primary-700"}`}
                      >
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-gray-800">{exp.title}</CardTitle>
                        <div className="flex items-center gap-1 text-primary-600 font-semibold">
                          <Building className="h-4 w-4" />
                          {exp.company}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 ml-12">
                    <Calendar className="h-4 w-4" />
                    {exp.duration}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>

                  {exp.technologies && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 text-sm">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs hover:bg-primary-200 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
