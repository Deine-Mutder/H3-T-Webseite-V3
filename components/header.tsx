"use client"

import { useCallback, useState } from "react"
import { ArrowRight, Menu, X } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { animateScrollToElement } from "@/lib/utils"
import { LiveClock } from "./live-clock"
import { ThemeSwitcher } from "./theme-switcher"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { resetLanguage, t } = useLanguage()

  const navLinks = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "features", label: t.nav.features },
    { id: "team", label: t.nav.team },
    { id: "contact", label: t.nav.contact },
  ]

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      animateScrollToElement(element)
    }
    setMobileMenuOpen(false)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button onClick={() => resetLanguage()} className="group flex items-center gap-3">
          <span className="header-led-text hidden items-center gap-2 lg:inline-flex">
            <span>{t.header.backToMenu}</span>
            <ArrowRight className="header-led-arrow h-4 w-4 shrink-0" />
          </span>

          <span className="header-logo-wrap">
            <span className="header-logo-snake" />
            <span className="relative z-10 flex items-center gap-2 rounded-full bg-background/95 px-3 py-1.5">
              <span className="text-2xl font-bold text-primary">
                H3{"\u00B0"}T
              </span>
              <span className="hidden text-sm text-muted-foreground sm:inline">VTC</span>
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <LiveClock />
          </div>
          <ThemeSwitcher />
          <Button className="hidden sm:inline-flex" size="sm" onClick={() => scrollToSection("contact")}>
            {t.header.cta}
          </Button>
          <button className="p-2 md:hidden" onClick={() => setMobileMenuOpen((open) => !open)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="border-t border-border py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
            <Button size="sm" className="mt-2 w-full" onClick={() => scrollToSection("contact")}>
              {t.header.cta}
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
