"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/context/language-context"
import { AboutSection } from "@/components/about-section"
import { Button } from "@/components/ui/button"
import { ContactSection } from "@/components/contact-section"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ParticleBackground } from "@/components/particle-background"
import { animateScrollToElement } from "@/lib/utils"
import { SplashScreen } from "./splash-screen"
import { TeamSection } from "@/components/team-section"

function WebsiteTutorial({
  open,
  onOpenChange,
  language,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  language: string | null
}) {
  const [step, setStep] = useState(0)
  const isGerman = language === "de"

  const steps = isGerman
    ? [
        {
          title: "Willkommen bei H3°T",
          description: "Dieses kurze Tutorial zeigt dir die wichtigsten Bereiche der Webseite.",
        },
        {
          title: "Navigation",
          description: "Oben im Header findest du die Navigation, den Theme-Wechsel und den schnellen Kontakt-Button.",
        },
        {
          title: "Team und Kontakt",
          description: "Im Team-Bereich kannst du durch die Mitglieder scrollen oder alle anzeigen. Unten findest du Discord und TruckersMP.",
        },
      ]
    : [
        {
          title: "Welcome to H3°T",
          description: "This short tutorial shows you the most important parts of the website.",
        },
        {
          title: "Navigation",
          description: "At the top you will find the main navigation, the theme switcher, and a quick contact button.",
        },
        {
          title: "Team and Contact",
          description: "In the team section you can browse the members or open the full overview. Discord and TruckersMP are at the bottom.",
        },
      ]

  useEffect(() => {
    if (open) {
      setStep(0)
    }
  }, [open])

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      localStorage.removeItem("h3t-tutorial-pending")
    }
    onOpenChange(nextOpen)
  }

  const isLastStep = step === steps.length - 1

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="border-border bg-card/92 backdrop-blur-xl sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{steps[step].title}</DialogTitle>
          <DialogDescription>{steps[step].description}</DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl border border-border bg-background/70 p-4 text-sm text-muted-foreground">
          {isGerman ? `Schritt ${step + 1} von ${steps.length}` : `Step ${step + 1} of ${steps.length}`}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleClose(false)}>
            {isGerman ? "Überspringen" : "Skip"}
          </Button>
          {step > 0 ? (
            <Button variant="outline" onClick={() => setStep((current) => current - 1)}>
              {isGerman ? "Zurück" : "Back"}
            </Button>
          ) : null}
          <Button onClick={() => (isLastStep ? handleClose(false) : setStep((current) => current + 1))}>
            {isLastStep ? (isGerman ? "Fertig" : "Finish") : isGerman ? "Weiter" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function AppWrapper() {
  const { hasSelectedLanguage, language } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [tutorialOpen, setTutorialOpen] = useState(false)

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

  useEffect(() => {
    if (!mounted || !hasSelectedLanguage) {
      return
    }

    if (localStorage.getItem("h3t-tutorial-pending") === "true") {
      setTutorialOpen(true)
    }
  }, [mounted, hasSelectedLanguage])

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
      <WebsiteTutorial open={tutorialOpen} onOpenChange={setTutorialOpen} language={language} />
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
