"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ParticleBackground } from "@/components/particle-background"
import { TeamSection } from "@/components/team-section"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useLanguage } from "@/context/language-context"
import { animateScrollToElement } from "@/lib/utils"
import { SplashScreen } from "./splash-screen"

const TUTORIAL_PROMPT_STORAGE_KEY = "h3t-tutorial-prompt"
const TUTORIAL_TARGET_SELECTOR = "[data-tutorial-id]"

type TutorialStep = {
  id: string
  selector: string
  title: string
  description: string
  detail: string
  shouldScroll?: boolean
}

function TutorialPrompt({
  open,
  onOpenChange,
  onStart,
  language,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onStart: () => void
  language: string | null
}) {
  const isGerman = language === "de"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card/92 p-0 backdrop-blur-xl sm:max-w-xl">
        <div className="rounded-[1.75rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,212,94,0.14),transparent_52%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))] p-6 sm:p-8">
          <div className="mb-6 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            H3{"\u00B0"}T Tour
          </div>

          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl">
              {isGerman ? "M\u00f6chtest du das Tutorial starten?" : "Would you like to start the tutorial?"}
            </DialogTitle>
            <DialogDescription className="mt-2 text-base leading-7">
              {isGerman
                ? "Ich zeige dir die wichtigsten Bereiche der Website Schritt f\u00fcr Schritt. Dabei wird immer nur der gerade erkl\u00e4rte Bereich hervorgehoben."
                : "I can guide you through the most important parts of the website step by step, highlighting one area at a time."}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 rounded-2xl border border-border/80 bg-background/70 p-4 text-sm leading-6 text-muted-foreground">
            {isGerman
              ? "Der Hintergrund wird weich abgedunkelt, die Seite scrollt automatisch zum passenden Bereich und du kannst jederzeit abbrechen."
              : "The background softens and darkens, the page scrolls to each area automatically, and you can stop anytime."}
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {isGerman ? "Nein, danke" : "No thanks"}
            </Button>
            <Button onClick={onStart}>{isGerman ? "Ja, Tutorial starten" : "Yes, start tutorial"}</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function WebsiteTutorial({
  active,
  onClose,
  language,
}: {
  active: boolean
  onClose: () => void
  language: string | null
}) {
  const isGerman = language === "de"
  const [step, setStep] = useState(0)
  const [spotlightRect, setSpotlightRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null)

  const steps = useMemo<TutorialStep[]>(
    () =>
      isGerman
        ? [
            {
              id: "header",
              selector: '[data-tutorial-id="header"]',
              title: "Navigation und Schnellzugriff",
              description: "Hier oben findest du die wichtigsten Wege durch die Seite.",
              detail: "Navigation, Theme-Wechsel, Uhr und Kontakt-Button sitzen direkt im Header, damit du jederzeit schnell springen kannst.",
              shouldScroll: false,
            },
            {
              id: "home",
              selector: '#home[data-tutorial-id="home"]',
              title: "Hero-Bereich",
              description: "Der Einstieg zeigt dir sofort, wof\u00fcr H3\u00b0T steht.",
              detail: "Hier siehst du Status, Hauptbotschaft, Call-to-Actions und die wichtigsten Kennzahlen auf einen Blick.",
            },
            {
              id: "features",
              selector: '#features[data-tutorial-id="features"]',
              title: "Features",
              description: "In diesem Bereich werden die wichtigsten Angebote und Funktionen vorgestellt.",
              detail: "Die Karten reagieren direkt und f\u00fchren bei passenden Aktionen weiter, zum Beispiel zum Kontaktbereich.",
            },
            {
              id: "team",
              selector: '#team[data-tutorial-id="team"]',
              title: "Team",
              description: "Hier lernst du die Mitglieder und Rollen im VTC kennen.",
              detail: "Der Slider setzt das Team dynamisch in Szene, und \u00fcber die Vollansicht kannst du alle Mitglieder gesammelt ansehen.",
            },
            {
              id: "contact",
              selector: '#contact[data-tutorial-id="contact"]',
              title: "Kontakt",
              description: "Zum Schluss kommst du direkt zu Discord und TruckersMP.",
              detail: "Wenn du beitreten oder Fragen stellen willst, ist das dein schnellster Weg nach drau\u00dfen.",
            },
          ]
        : [
            {
              id: "header",
              selector: '[data-tutorial-id="header"]',
              title: "Navigation and quick access",
              description: "This top bar keeps the key actions close at hand.",
              detail: "You can jump through the site, switch theme, check the clock, or head straight to contact from here.",
              shouldScroll: false,
            },
            {
              id: "home",
              selector: '#home[data-tutorial-id="home"]',
              title: "Hero section",
              description: "The landing section introduces H3\u00b0T right away.",
              detail: "It combines status, the main message, primary actions, and the core stats in one clear first impression.",
            },
            {
              id: "features",
              selector: '#features[data-tutorial-id="features"]',
              title: "Features",
              description: "This area presents the most important offerings and interactions.",
              detail: "The cards react visually and can guide visitors to the next useful destination, including contact.",
            },
            {
              id: "team",
              selector: '#team[data-tutorial-id="team"]',
              title: "Team",
              description: "This section introduces the people behind the VTC.",
              detail: "The slider gives the team a stronger stage, while the overview lets visitors inspect everyone at once.",
            },
            {
              id: "contact",
              selector: '#contact[data-tutorial-id="contact"]',
              title: "Contact",
              description: "The final section takes visitors directly to Discord and TruckersMP.",
              detail: "It is the fastest place to join, ask questions, or move from browsing into action.",
            },
          ],
    [isGerman],
  )

  const activeStep = steps[step]
  const isLastStep = step === steps.length - 1

  const syncSpotlight = useCallback(() => {
    if (!active) {
      setSpotlightRect(null)
      return
    }

    const element = document.querySelector(activeStep.selector)
    if (!(element instanceof HTMLElement)) {
      setSpotlightRect(null)
      return
    }

    const rect = element.getBoundingClientRect()
    const padding = window.innerWidth < 640 ? 10 : 18

    setSpotlightRect({
      top: Math.max(rect.top - padding, 8),
      left: Math.max(rect.left - padding, 8),
      width: Math.min(rect.width + padding * 2, window.innerWidth - 16),
      height: Math.min(rect.height + padding * 2, window.innerHeight - 16),
    })
  }, [active, activeStep])

  useEffect(() => {
    if (active) {
      setStep(0)
    }
  }, [active])

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll(TUTORIAL_TARGET_SELECTOR))
    const activeElement = document.querySelector(activeStep?.selector ?? "")

    if (!active) {
      document.body.classList.remove("tutorial-mode")
      targets.forEach((target) => target.classList.remove("tutorial-dimmed", "tutorial-active-target"))
      setSpotlightRect(null)
      return
    }

    document.body.classList.add("tutorial-mode")
    targets.forEach((target) => {
      target.classList.add("tutorial-dimmed")
      target.classList.remove("tutorial-active-target")
    })

    if (activeElement instanceof HTMLElement) {
      activeElement.classList.remove("tutorial-dimmed")
      activeElement.classList.add("tutorial-active-target")

      if (activeStep.shouldScroll !== false) {
        animateScrollToElement(activeElement, 118, 900)
      }
    }

    const handleSync = () => syncSpotlight()
    const timeoutId = window.setTimeout(handleSync, 120)
    window.addEventListener("resize", handleSync)
    window.addEventListener("scroll", handleSync, { passive: true })

    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener("resize", handleSync)
      window.removeEventListener("scroll", handleSync)
      document.body.classList.remove("tutorial-mode")
      targets.forEach((target) => target.classList.remove("tutorial-dimmed", "tutorial-active-target"))
    }
  }, [active, activeStep, syncSpotlight])

  if (!active) {
    return null
  }

  return (
    <>
      <div className="fixed inset-0 z-[70] bg-background/62 backdrop-blur-md transition-opacity duration-500" />

      {spotlightRect ? (
        <div
          className="pointer-events-none fixed z-[96] rounded-[2rem] border border-primary/55 shadow-[0_0_0_9999px_rgba(3,6,18,0.42),0_0_0_1px_rgba(255,214,102,0.3),0_24px_80px_rgba(255,191,82,0.22)] transition-all duration-500 ease-out"
          style={{
            top: spotlightRect.top,
            left: spotlightRect.left,
            width: spotlightRect.width,
            height: spotlightRect.height,
          }}
        />
      ) : null}

      <div className="fixed inset-x-4 bottom-4 z-[100] flex justify-center sm:bottom-6">
        <div className="w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-border/80 bg-card/92 shadow-2xl backdrop-blur-2xl">
          <div className="bg-[linear-gradient(135deg,rgba(255,212,94,0.16),transparent_45%)] p-5 sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  {isGerman ? `Schritt ${step + 1} von ${steps.length}` : `Step ${step + 1} of ${steps.length}`}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">{activeStep.title}</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {isGerman ? "\u00dcberspringen" : "Skip"}
              </button>
            </div>

            <p className="text-base leading-7 text-foreground/92">{activeStep.description}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{activeStep.detail}</p>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-background/70">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep((current) => Math.max(current - 1, 0))} disabled={step === 0}>
                  {isGerman ? "Zur\u00fcck" : "Back"}
                </Button>
                <Button variant="outline" onClick={onClose}>
                  {isGerman ? "Beenden" : "End tutorial"}
                </Button>
              </div>
              <Button onClick={() => (isLastStep ? onClose() : setStep((current) => current + 1))}>
                {isLastStep ? (isGerman ? "Fertig" : "Finish") : isGerman ? "Weiter" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function AppWrapper() {
  const { hasSelectedLanguage, language } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [tutorialPromptOpen, setTutorialPromptOpen] = useState(false)
  const [tutorialActive, setTutorialActive] = useState(false)

  const closeTutorial = useCallback(() => {
    setTutorialActive(false)
    setTutorialPromptOpen(false)
  }, [])

  const startTutorial = useCallback(() => {
    setTutorialPromptOpen(false)
    setTutorialActive(true)
  }, [])

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

    if (localStorage.getItem(TUTORIAL_PROMPT_STORAGE_KEY) === "true") {
      localStorage.removeItem(TUTORIAL_PROMPT_STORAGE_KEY)
      setTutorialPromptOpen(true)
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
      <TutorialPrompt
        open={tutorialPromptOpen}
        onOpenChange={setTutorialPromptOpen}
        onStart={startTutorial}
        language={language}
      />
      <WebsiteTutorial active={tutorialActive} onClose={closeTutorial} language={language} />
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
