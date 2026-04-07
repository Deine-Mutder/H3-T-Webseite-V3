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
import { animateScrollToElement } from "@/lib/utils"
import { SplashScreen } from "./splash-screen"
import { TeamSection } from "@/components/team-section"

export function AppWrapper() {
  const { hasSelectedLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) {
        return
      }

      const anchor = target.closest('a[href^="#"]')
      if (!(anchor instanceof HTMLAnchorElement)) {
        return
      }

      const href = anchor.getAttribute("href")
      if (!href || href === "#") {
        return
      }

      const section = document.querySelector(href)
      if (!(section instanceof HTMLElement)) {
        return
      }

      event.preventDefault()
      animateScrollToElement(section)
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-2xl font-bold text-primary">H3{"\u00B0"}T</div>
      </div>
    )
  }

  if (!hasSelectedLanguage) {
    return <SplashScreen />
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
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
