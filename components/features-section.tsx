"use client"

import { MessageSquare, Truck, Wrench } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { ScrollReveal } from "./scroll-reveal"

const featureIcons = [Truck, MessageSquare, Wrench]

export function FeaturesSection() {
  const { t } = useLanguage()

  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">{t.features.eyebrow}</span>
            <h2 className="mt-2 mb-4 text-3xl font-bold text-foreground sm:text-4xl">{t.features.title}</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">{t.features.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((feature, index) => {
            const Icon = featureIcons[index]

            return (
              <ScrollReveal key={feature.title} delay={index * 100}>
                <div className="group relative h-full cursor-pointer rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  <div className="absolute left-0 top-0 h-1 w-full rounded-t-2xl bg-primary/0 transition-colors group-hover:bg-primary" />
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all group-hover:scale-110 group-hover:bg-primary/20">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>

                  <div className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-lg text-primary">→</span>
                    </div>
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
