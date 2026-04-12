"use client"

import { useCallback, useState } from "react"
import { ArrowRight, Menu, X } from "lucide-react"
import { useLanguage } from "@/context/language-context"
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
    if (element) animateScrollToElement(element)
    setMobileMenuOpen(false)
  }, [])

  return (
    <header
      data-tutorial-id="header"
      className="fixed left-0 right-0 top-0 z-50"
      style={{
        background: "color-mix(in oklab, var(--background) 85%, transparent)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }}
      />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => resetLanguage()}
          className="group flex items-center gap-3"
        >
          <span className="header-led-text hidden items-center gap-2 lg:inline-flex">
            <span>{t.header.backToMenu}</span>
            <ArrowRight className="header-led-arrow h-3.5 w-3.5 shrink-0" />
          </span>

          <span className="header-logo-wrap">
            <span className="header-logo-snake" />
            <span
              className="relative z-10 flex items-center gap-2 px-3 py-1.5"
              style={{ background: "var(--background)", borderRadius: "3px" }}
            >
              <span
                className="display-heading text-2xl chrome-text"
                style={{ letterSpacing: "0.04em" }}
              >
                H3°T
              </span>
              <span
                className="hidden text-xs tracking-[0.3em] text-muted-foreground sm:inline"
                style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem" }}
              >
                VTC
              </span>
            </span>
          </span>
        </button>

        {/* Nav links */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="group relative text-xs uppercase tracking-widest text-muted-foreground transition-colors duration-200 hover:text-primary"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.2em",
                fontSize: "0.72rem",
              }}
            >
              {link.label}
              <span
                className="absolute -bottom-0.5 left-0 right-0 h-px scale-x-0 transition-transform duration-200 group-hover:scale-x-100"
                style={{
                  background: "var(--primary)",
                  transformOrigin: "left",
                }}
              />
            </button>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <LiveClock />
          </div>
          <ThemeSwitcher />
          <button
            className="btn-wipe hidden items-center gap-2 border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:border-primary hover:text-primary sm:flex"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              letterSpacing: "0.2em",
              fontSize: "0.72rem",
              borderColor: "var(--border)",
              color: "var(--muted-foreground)",
              background: "transparent",
              cursor: "pointer",
            }}
            onClick={() => scrollToSection("contact")}
          >
            {t.header.cta}
          </button>
          <button
            className="p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
            onClick={() => setMobileMenuOpen((o) => !o)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <nav
          className="border-t py-4 md:hidden"
          style={{ borderColor: "var(--border)", background: "var(--background)" }}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  fontSize: "0.75rem",
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              className="btn-wipe mt-2 border py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:border-primary hover:text-primary"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: "0.2em",
                fontSize: "0.72rem",
                borderColor: "var(--border)",
                color: "var(--muted-foreground)",
                background: "transparent",
                cursor: "pointer",
              }}
              onClick={() => scrollToSection("contact")}
            >
              {t.header.cta}
            </button>
          </div>
        </nav>
      )}
    </header>
  )
}
