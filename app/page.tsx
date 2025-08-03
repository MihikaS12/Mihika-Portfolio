import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import EducationSection from "@/components/EducationSection"
import ExperienceSection from "@/components/ExperienceSection"
import ProjectsSection from "@/components/ProjectsSection"
import SkillsSection from "@/components/SkillsSection"
import LeadershipSection from "@/components/LeadershipSection"
import ContactSection from "@/components/ContactSection"
import Navigation from "@/components/Navigation"

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <LeadershipSection />
        <ContactSection />
      </main>
    </>
  )
}
