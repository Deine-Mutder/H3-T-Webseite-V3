"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/context/language-context"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ParticleBackground } from "@/components/particle-background"
import { SplashScreen } from "./splash-screen"
import { TeamSection } from "@/components/team-section"

export function AppWrapper() {
  const { hasSelectedLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-2xl font-bold text-primary">H3°T</div>
      </div>
    )
  }

  if (!hasSelectedLanguage) {
    return <SplashScreen />
  }

  return (
    <div className="relative min-h-screen bg-background">
      <ParticleBackground />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
