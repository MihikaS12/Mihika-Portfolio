"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Calendar, MapPin } from "lucide-react"

export default function EducationSection() {
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

  const education = [
    {
      institution: "Jagran Lakecity University",
      degree: "Bachelor of Computer Applications (BCA)",
      specialization: "Honors in Data Science",
      cgpa: "9.3",
      duration: "July 2023 - July 2026",
      location: "Bhopal, MP",
      coursework: [
        "Data Structures and Algorithms",
        "Data Science",
        "Database Management",
        "Object Oriented Programming",
        "Computer Organization and Networking",
      ],
    },
    {
      institution: "Carmel Convent School",
      degree: "Secondary & Senior Secondary Education",
      specialization: "",
      cgpa: "Class 10th: 89% | Class 12th: 84%",
      duration: "2011 - 2023",
      location: "Bhopal, MP",
      coursework: [],
    },
  ]

  return (
    <section id="education" ref={sectionRef} className="py-20 px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto max-w-6xl">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Education</h2>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <Card
                key={index}
                className={`bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : index % 2 === 0
                      ? "opacity-0 -translate-x-10"
                      : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-800">{edu.institution}</CardTitle>
                        <p className="text-blue-600 font-semibold">{edu.degree}</p>
                        {edu.specialization && <p className="text-purple-600 font-medium">{edu.specialization}</p>}
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="h-4 w-4" />
                        {edu.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {edu.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="mb-4">
                    <span className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {edu.cgpa}
                    </span>
                  </div>

                  {edu.coursework.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Relevant Coursework:</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course, courseIndex) => (
                          <span
                            key={courseIndex}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors duration-300"
                          >
                            {course}
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
