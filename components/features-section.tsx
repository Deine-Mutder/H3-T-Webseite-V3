"use client"

import { useState } from "react"
import { MessageSquare, Truck, Wrench } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { animateScrollToElement } from "@/lib/utils"
import { ScrollReveal } from "./scroll-reveal"

const featureIcons = [Truck, MessageSquare, Wrench]

export function FeaturesSection() {
  const { t } = useLanguage()
  const [showUnavailableModal, setShowUnavailableModal] = useState(false)

  const handleFeatureAction = (index: number) => {
    if (index === 1) {
      const contactSection = document.getElementById("contact")
      if (contactSection) animateScrollToElement(contactSection)
      return
    }
    setShowUnavailableModal(true)
  }

  return (
    <>
      <section id="features" data-tutorial-id="features" className="relative overflow-hidden py-24 lg:py-32">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute right-0 top-0 h-full w-px"
            style={{ background: "linear-gradient(to bottom, transparent, var(--primary), transparent)" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <ScrollReveal>
            <div className="mb-16">
              <div className="section-label mb-4">{t.features.eyebrow}</div>
              <h2
                className="display-heading text-[clamp(2.5rem,6vw,5rem)] text-foreground"
                style={{ lineHeight: 0.9 }}
              >
                {t.features.title}
              </h2>
              <div
                className="mt-8 h-px w-full"
                style={{
                  background: "linear-gradient(90deg, var(--primary), color-mix(in oklab, var(--primary) 20%, transparent) 60%, transparent)",
                }}
              />
              <p className="mt-6 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
                {t.features.subtitle}
              </p>
            </div>
          </ScrollReveal>

          {/* Feature Cards — numbered, clipped */}
          <div className="grid grid-cols-1 gap-0 gap-px lg:grid-cols-3" style={{ background: "var(--border)" }}>
            {t.features.items.map((feature, index) => {
              const Icon = featureIcons[index]
              const num = String(index + 1).padStart(2, "0")

              return (
                <ScrollReveal key={feature.title} delay={index * 120}>
                  <div
                    className="glow-card clip-card holo-card group relative flex flex-col overflow-hidden p-8 transition-all duration-300"
                    style={{ minHeight: "340px" }}
                  >
                    {/* Big background number */}
                    <div
                      className="pointer-events-none absolute -right-4 -top-6 select-none leading-none transition-all duration-500 group-hover:-top-4 group-hover:opacity-30"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 900,
                        fontSize: "10rem",
                        color: "transparent",
                        WebkitTextStroke: `1px color-mix(in oklab, var(--primary) 12%, transparent)`,
                        lineHeight: 1,
                        opacity: 0.18,
                      }}
                    >
                      {num}
                    </div>

                    {/* Top section — number label + icon */}
                    <div className="mb-6 flex items-center justify-between">
                      <span
                        className="font-mono text-xs tracking-widest"
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          color: "var(--primary)",
                          opacity: 0.7,
                          fontSize: "0.65rem",
                          letterSpacing: "0.3em",
                        }}
                      >
                        {num} / 03
                      </span>
                      <div
                        className="flex h-12 w-12 items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: "color-mix(in oklab, var(--primary) 12%, transparent)",
                          border: "1px solid color-mix(in oklab, var(--primary) 30%, transparent)",
                        }}
                      >
                        <Icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className="display-heading relative z-10 mb-4 text-2xl text-foreground transition-colors duration-300 group-hover:text-primary sm:text-3xl"
                    >
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="relative z-10 flex-1 text-sm font-light leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>

                    {/* Bottom action */}
                    <button
                      type="button"
                      onClick={() => handleFeatureAction(index)}
                      className="btn-wipe relative z-10 mt-6 flex items-center gap-2 self-start border px-4 py-2 text-xs uppercase tracking-widest transition-all duration-300 hover:border-primary/60 hover:text-primary"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        letterSpacing: "0.2em",
                        fontSize: "0.7rem",
                        borderColor: "var(--border)",
                        color: "var(--muted-foreground)",
                        background: "transparent",
                      }}
                    >
                      Explore
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>

                    {/* Bottom border accent */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                      style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }}
                    />
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Unavailable Modal */}
      {showUnavailableModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-background/60 px-4 backdrop-blur-xl">
          <div
            className="clip-card w-full max-w-md p-8 text-center"
            style={{
              background: "var(--surface-2)",
              border: "1px solid color-mix(in oklab, var(--primary) 30%, transparent)",
              boxShadow: "0 0 60px color-mix(in oklab, var(--primary) 10%, transparent)",
            }}
          >
            <div
              className="section-label mx-auto mb-4 w-fit"
              style={{ justifyContent: "center" }}
            >
              {t.features.unavailableTitle}
            </div>
            <p className="mb-8 text-sm font-light leading-relaxed text-muted-foreground">
              {t.features.unavailableText}
            </p>
            <button
              type="button"
              onClick={() => setShowUnavailableModal(false)}
              className="btn-wipe clip-card-sm px-8 py-3 text-sm font-bold uppercase tracking-widest"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: "0.2em",
                border: "none",
                cursor: "pointer",
              }}
            >
              {t.features.unavailableClose}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
