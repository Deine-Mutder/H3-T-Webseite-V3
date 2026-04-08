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
      if (contactSection) {
        animateScrollToElement(contactSection)
      }
      return
    }

    setShowUnavailableModal(true)
  }

  return (
    <>
      <section id="features" className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 text-center lg:mb-16">
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
                  <div className="group relative h-full rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                    <div className="absolute left-0 top-0 h-1 w-full rounded-t-2xl bg-primary/0 transition-colors group-hover:bg-primary" />
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all group-hover:scale-110 group-hover:bg-primary/20">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                      {feature.title}
                    </h3>
                    <p className="pr-14 text-muted-foreground">{feature.description}</p>

                    <button
                      type="button"
                      onClick={() => handleFeatureAction(index)}
                      aria-label={feature.title}
                      className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 transition-all hover:bg-primary/20 group-hover:scale-105"
                    >
                      <span className="text-lg text-primary">{"\u2192"}</span>
                    </button>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {showUnavailableModal ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-background/45 px-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl border border-border bg-card/95 p-8 text-center shadow-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              {t.features.unavailableTitle}
            </p>
            <p className="mb-6 text-base leading-7 text-muted-foreground">{t.features.unavailableText}</p>
            <button
              type="button"
              onClick={() => setShowUnavailableModal(false)}
              className="rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t.features.unavailableClose}
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
