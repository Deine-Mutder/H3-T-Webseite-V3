"use client"

import { Award, Clock, Heart, Shield } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { ScrollReveal } from "./scroll-reveal"

const valueIcons = [Shield, Heart, Award, Clock]

export function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="relative overflow-hidden bg-secondary/30 py-20 lg:py-24">
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 opacity-5">
        <svg width="400" height="200" viewBox="0 0 400 200" className="fill-current text-foreground">
          <rect x="10" y="80" width="180" height="80" rx="8" />
          <rect x="190" y="50" width="120" height="110" rx="8" />
          <circle cx="70" cy="170" r="25" />
          <circle cx="150" cy="170" r="25" />
          <circle cx="280" cy="170" r="25" />
          <rect x="200" y="70" width="80" height="50" rx="4" className="fill-primary/30" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-12 text-center lg:mb-16">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">{t.about.eyebrow}</span>
            <h2 className="mt-2 mb-4 text-3xl font-bold text-foreground sm:text-4xl">{t.about.title}</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">{t.about.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.about.values.map((value, index) => {
            const Icon = valueIcons[index]

            return (
              <ScrollReveal key={value.title} delay={index * 100} direction={index % 2 === 0 ? "up" : "down"}>
                <div className="group h-full cursor-pointer rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-2 hover:border-primary/50">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:rotate-6 group-hover:bg-primary/20">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
