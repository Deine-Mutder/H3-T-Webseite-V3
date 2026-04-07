"use client"

import { MapPin, Truck, Users } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { animateScrollToElement } from "@/lib/utils"
import { AnimatedCounter } from "./animated-counter"
import { ScrollReveal } from "./scroll-reveal"
import { StatusIndicator } from "./status-indicator"

export function HeroSection() {
  const { t } = useLanguage()

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (!element) {
      return
    }

    animateScrollToElement(element)
  }

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 animate-pulse rounded-full bg-primary/10 blur-3xl" />

      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-20">
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="mx-8 h-2 w-16 animate-[moveRight_2s_linear_infinite] rounded-full bg-primary"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-10 text-center sm:px-6 lg:px-8 2xl:max-w-[1700px] 2xl:px-10">
        <ScrollReveal delay={0}>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-sm text-primary">TruckersMP VTC</span>
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-xs text-green-500">{t.hero.online}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance text-foreground sm:text-6xl lg:text-7xl 2xl:text-[5.5rem]">
            <span>{t.hero.title}</span>
            <br />
            <span className="relative text-primary">
              H3{"\u00B0"}T
              <span className="absolute -right-4 -top-2 rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground animate-bounce">
                {t.hero.badge}
              </span>
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground text-pretty sm:text-xl 2xl:max-w-4xl 2xl:text-2xl">
            {t.hero.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="group w-full sm:w-auto" onClick={scrollToContact}>
              <span>{t.hero.joinBtn}</span>
              <Truck className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={scrollToContact}>
              {t.hero.learnMore}
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={350}>
          <div className="mb-16">
            <StatusIndicator />
          </div>
        </ScrollReveal>

        <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3 2xl:max-w-5xl 2xl:gap-8">
          <ScrollReveal delay={400}>
            <div className="group flex flex-col items-center rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50 2xl:p-8">
              <Truck className="mb-3 h-8 w-8 text-primary transition-transform group-hover:scale-110 2xl:h-10 2xl:w-10" />
              <span className="text-3xl font-bold text-foreground 2xl:text-4xl">
                <AnimatedCounter end={500} suffix="+" />
              </span>
              <span className="text-sm text-muted-foreground 2xl:text-base">{t.hero.tours}</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={500}>
            <div className="group flex flex-col items-center rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50 2xl:p-8">
              <Users className="mb-3 h-8 w-8 text-primary transition-transform group-hover:scale-110 2xl:h-10 2xl:w-10" />
              <span className="text-3xl font-bold text-foreground 2xl:text-4xl">
                <AnimatedCounter end={8} />
              </span>
              <span className="text-sm text-muted-foreground 2xl:text-base">{t.hero.drivers}</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={600}>
            <div className="group flex flex-col items-center rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50 2xl:p-8">
              <MapPin className="mb-3 h-8 w-8 text-primary transition-transform group-hover:scale-110 2xl:h-10 2xl:w-10" />
              <span className="text-3xl font-bold text-foreground 2xl:text-4xl">
                <AnimatedCounter end={100} suffix="k+" />
              </span>
              <span className="text-sm text-muted-foreground 2xl:text-base">{t.hero.kilometers}</span>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 lg:mt-16">
          <span className="text-xs text-muted-foreground">{t.hero.scroll}</span>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-2">
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </section>
  )
}
