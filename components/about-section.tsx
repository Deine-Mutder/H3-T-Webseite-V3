"use client"

import { Award, Clock, Heart, Shield } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { ScrollReveal } from "./scroll-reveal"

const valueIcons = [Shield, Heart, Award, Clock]

export function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" data-tutorial-id="about" className="relative overflow-hidden py-24 lg:py-32">
      {/* Hex pattern background */}
      <div className="hex-bg absolute inset-0 opacity-40" />

      {/* Side accent line */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-px"
        style={{ background: "linear-gradient(to bottom, transparent, var(--primary), transparent)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="section-label mb-4">{t.about.eyebrow}</div>
            <div className="flex items-end justify-between gap-8">
              <h2
                className="display-heading text-[clamp(2.5rem,6vw,5rem)] text-foreground"
                style={{ lineHeight: 0.9 }}
              >
                {t.about.title}
              </h2>
              <p className="hidden max-w-sm text-sm font-light leading-relaxed text-muted-foreground lg:block">
                {t.about.subtitle}
              </p>
            </div>
            {/* Divider */}
            <div
              className="mt-8 h-px w-full"
              style={{
                background: "linear-gradient(90deg, var(--primary), color-mix(in oklab, var(--primary) 20%, transparent) 60%, transparent)",
              }}
            />
            <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-muted-foreground lg:hidden">
              {t.about.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Horizontal Stripes */}
        <div className="space-y-px" style={{ background: "var(--border)" }}>
          {t.about.values.map((value, index) => {
            const Icon = valueIcons[index]
            const num = String(index + 1).padStart(2, "0")

            return (
              <ScrollReveal key={value.title} delay={index * 80}>
                <div className="feature-stripe group">
                  {/* Number */}
                  <span
                    className="hidden shrink-0 font-mono text-4xl font-bold leading-none text-primary/20 sm:block"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, minWidth: "3rem" }}
                  >
                    {num}
                  </span>

                  {/* Icon */}
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center transition-colors duration-300 group-hover:bg-[color-mix(in_oklab,var(--primary)_20%,transparent)]"
                    style={{
                      background: "color-mix(in oklab, var(--primary) 10%, transparent)",
                      border: "1px solid color-mix(in oklab, var(--primary) 25%, transparent)",
                    }}
                  >
                    <Icon
                      className="h-5 w-5 transition-colors duration-300 group-hover:text-primary"
                      style={{ color: "var(--primary)", opacity: 0.8 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3
                      className="display-heading mb-2 text-xl text-foreground transition-colors duration-300 group-hover:text-primary sm:text-2xl"
                    >
                      {value.title}
                    </h3>
                    <p className="text-sm font-light leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>

                  {/* Right arrow indicator */}
                  <div
                    className="hidden shrink-0 items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 sm:flex"
                    style={{ color: "var(--primary)" }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
