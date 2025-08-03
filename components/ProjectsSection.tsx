"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Code, Database, Brain, Globe, BarChart3, Bot } from "lucide-react"

export default function ProjectsSection() {
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

  const projects = [
    {
      title: "BusinessPedia",
      description:
        "Python-MySQL business encyclopedia for comprehensive business data management and information retrieval.",
      icon: Database,
      github: "https://github.com/MihikaS12/Business_Pedia",
      tech: ["Python", "MySQL", "Data Management"],
      color: "from-primary-500 to-primary-600",
    },
    {
      title: "Nagrik Navigator",
      description: "IMC Asset Tracker Web App developed for efficient asset tracking and organizational management.",
      icon: Globe,
      github: "https://github.com/MihikaS12/Hack-N-Dore",
      tech: ["Web Development", "Asset Tracking", "Management"],
      color: "from-accent-500 to-accent-600",
    },
    {
      title: "Google Play Store Data Visualization",
      description:
        "Comprehensive dashboard analyzing app installs, revenue & ratings using Python, JavaScript, Pandas, Plotly, and SQL.",
      icon: BarChart3,
      github: "https://github.com/MihikaS12/Playstore-Data-Analysis",
      tech: ["Python", "JavaScript", "Pandas", "Plotly", "SQL"],
      color: "from-secondary-500 to-secondary-600",
    },
    {
      title: "LearnPath",
      description:
        "AI chatbot for personalized learning plans & resource recommendations using advanced machine learning.",
      icon: Bot,
      github: "https://github.com/MihikaS12/Learnpath-findorr",
      tech: ["AI", "Machine Learning", "Chatbot", "Personalization"],
      color: "from-primary-400 to-accent-500",
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio showcasing projects, skills, and professional experience with modern design.",
      icon: Code,
      github: "#",
      tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      color: "from-accent-400 to-primary-500",
    },
    {
      title: "Mini Projects Collection",
      description:
        "Various Python, Java, and C++ projects including Digital Clock, Tic-Tac-Toe, Café Management System, and more.",
      icon: Brain,
      github: "https://github.com/MihikaS12/Python",
      tech: ["Python", "Java", "C++", "Problem Solving"],
      color: "from-primary-500 to-accent-500",
    },
  ]

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-6 bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="container mx-auto max-w-7xl">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Featured Projects</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const IconComponent = project.icon
              return (
                <Card
                  key={index}
                  className={`bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-500 hover:scale-[1.05] group ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-3 bg-gradient-to-r ${project.color} rounded-full group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-700 leading-relaxed text-sm">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs hover:bg-gray-200 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 bg-transparent"
                        onClick={() => window.open(project.github, "_blank")}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 transition-all duration-300"
                        onClick={() => window.open(project.github, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
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
