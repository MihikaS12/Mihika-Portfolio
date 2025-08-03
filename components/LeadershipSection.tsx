"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Trophy, Mic, BookOpen, Lightbulb } from "lucide-react"

export default function LeadershipSection() {
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

  const achievements = [
    {
      title: "Deputy Secretary",
      organization: "Placement & Industry Club",
      description:
        "Facilitated industry interactions and bridging the gap between students and corporate life through skill-building initiatives.",
      icon: Users,
      color: "from-primary-500 to-primary-600",
    },
    {
      title: "Paper Presentation Team Lead",
      organization: "Research Publications",
      description:
        "Led contributions to papers on 'Quantum Computing Advancements' and 'Synergizing Neuromorphic with Federated Approaches'.",
      icon: BookOpen,
      color: "from-secondary-500 to-secondary-600",
    },
    {
      title: "Hackathon Team Leader",
      organization: "IMC Hackathon",
      description:
        "Directed a team to reach Top 80 out of 1,700 teams through effective problem-solving and leadership.",
      icon: Trophy,
      color: "from-accent-500 to-accent-600",
    },
    {
      title: "Creative Writing & Public Speaking",
      organization: "Various Events",
      description: "Engaged in creative writing and public speaking events, exhibiting strong communication abilities.",
      icon: Mic,
      color: "from-primary-400 to-accent-500",
    },
    {
      title: "Tech Workshops Attendee",
      organization: "Industry Events",
      description:
        "Participated in various technology seminars and workshops to enhance industry knowledge and stay updated with trends.",
      icon: Lightbulb,
      color: "from-accent-400 to-primary-500",
    },
  ]

  return (
    <section id="leadership" ref={sectionRef} className="py-20 px-6 bg-gradient-to-r from-indigo-50 to-purple-50">
      <div className="container mx-auto max-w-6xl">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Leadership & Extracurriculars</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <Card
                  key={index}
                  className={`bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 bg-gradient-to-r ${achievement.color} rounded-full group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                          {achievement.title}
                        </CardTitle>
                        <p className="text-blue-600 font-semibold text-sm">{achievement.organization}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{achievement.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Achievement Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">Top 80</div>
              <div className="text-gray-600">out of 1,700 teams</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600 mb-2">2</div>
              <div className="text-gray-600">Research Papers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600 mb-2">5+</div>
              <div className="text-gray-600">Leadership Roles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-500 mb-2">10+</div>
              <div className="text-gray-600">Tech Workshops</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
