"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Database, Globe, Wrench, Lightbulb, CheckCircle } from "lucide-react"

export default function SkillsSection() {
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

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: ["Python", "Java", "C/C++"],
      color: "from-primary-500 to-primary-600",
    },
    {
      title: "Web Development",
      icon: Globe,
      skills: ["HTML", "CSS", "JavaScript"],
      color: "from-accent-500 to-accent-600",
    },
    {
      title: "Database",
      icon: Database,
      skills: ["MySQL"],
      color: "from-secondary-500 to-secondary-600",
    },
    {
      title: "Tools & Technologies",
      icon: Wrench,
      skills: ["VS Code", "GitHub", "Jupyter Notebooks", "PyCharm"],
      color: "from-primary-400 to-accent-500",
    },
    {
      title: "Core Skills",
      icon: Lightbulb,
      skills: ["Problem Solving", "Logical Thinking"],
      color: "from-accent-400 to-primary-500",
    },
  ]

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Skills & Technologies</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and core competencies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={index}
                  className={`group hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 shadow-lg bg-white ${
                    isVisible ? "animate-fade-in" : ""
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 bg-gradient-to-r ${category.color} rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                        {category.title}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 group/skill"
                        >
                          <CheckCircle className="h-5 w-5 text-primary-500 group-hover/skill:text-accent-500 transition-colors duration-300" />
                          <span className="text-gray-700 font-medium group-hover/skill:text-gray-900 transition-colors duration-300">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
