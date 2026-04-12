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
    if (!element) return
    animateScrollToElement(element)
  }

  return (
    <section
      id="home"
      data-tutorial-id="home"
      className="relative flex min-h-[max(100svh,44rem)] items-center overflow-hidden pt-16"
    >
      {/* Road grid perspective background */}
      <div className="road-grid" />

      {/* Scanlines overlay */}
      <div className="scanlines" />

      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/3 h-[400px] w-[400px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Speed lines */}
      <div className="speed-lines">
        {[12, 28, 45, 62, 75].map((top, i) => (
          <div
            key={i}
            className="speed-line"
            style={{
              top: `${top}%`,
              width: `${60 + i * 15}px`,
              animationDuration: `${1.8 + i * 0.4}s`,
              animationDelay: `${i * 0.6}s`,
              left: "0",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* ASYMMETRIC LAYOUT */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">

          {/* LEFT — Content */}
          <div className="flex flex-col items-start">
            {/* Eyebrow */}
            <ScrollReveal delay={0}>
              <div className="section-label mb-6">
                TruckersMP VTC
                <span
                  className="radar-ping inline-flex h-2.5 w-2.5 rounded-full text-green-500"
                  style={{ color: "rgb(34 197 94)" }}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <span
                  className="font-mono text-xs text-green-500"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {t.hero.online}
                </span>
              </div>
            </ScrollReveal>

            {/* Main title */}
            <ScrollReveal delay={80}>
              <h1 className="display-heading mb-6 text-[clamp(2.8rem,7vw,5.5rem)] text-foreground">
                {t.hero.title}
                <br />
                <span className="chrome-text emblem-pulse">H3°T</span>
                <span
                  className="ml-3 inline-block -translate-y-2 rounded px-2 py-0.5 text-xs font-bold tracking-widest"
                  style={{
                    background: "color-mix(in oklab, var(--primary) 15%, transparent)",
                    border: "1px solid color-mix(in oklab, var(--primary) 40%, transparent)",
                    color: "var(--primary)",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.3em",
                  }}
                >
                  {t.hero.badge}
                </span>
              </h1>
            </ScrollReveal>

            {/* Subtitle */}
            <ScrollReveal delay={160}>
              <p className="mb-10 max-w-lg text-base font-light leading-relaxed text-muted-foreground">
                {t.hero.subtitle}
              </p>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal delay={240}>
              <div className="mb-12 flex flex-wrap gap-4">
                <button
                  onClick={scrollToContact}
                  className="btn-wipe clip-card-sm group flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300"
                  style={{
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    letterSpacing: "0.2em",
                    fontSize: "0.85rem",
                  }}
                >
                  <Truck className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  {t.hero.joinBtn}
                </button>
                <button
                  onClick={scrollToContact}
                  className="btn-wipe flex items-center gap-3 border px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:border-primary/60 hover:text-primary"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--muted-foreground)",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    letterSpacing: "0.2em",
                    fontSize: "0.85rem",
                    background: "transparent",
                  }}
                >
                  {t.hero.learnMore}
                </button>
              </div>
            </ScrollReveal>

            {/* Status Indicator */}
            <ScrollReveal delay={300}>
              <StatusIndicator />
            </ScrollReveal>
          </div>

          {/* RIGHT — Giant Emblem */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <ScrollReveal delay={120}>
              <div className="relative select-none">
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 -m-8 rounded-full opacity-20"
                  style={{
                    background: "radial-gradient(circle, var(--primary) 0%, transparent 65%)",
                    animation: "emblemPulse 3s ease-in-out infinite",
                  }}
                />

                {/* Giant H3°T */}
                <div
                  className="emblem-pulse display-heading relative z-10 text-center leading-none"
                  style={{
                    fontSize: "clamp(7rem, 18vw, 16rem)",
                    letterSpacing: "-0.02em",
                    background:
                      "linear-gradient(135deg, var(--chrome) 0%, var(--primary) 25%, var(--chrome) 45%, var(--gold-dim) 65%, var(--chrome) 85%, var(--primary) 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "300% 100%",
                    animation: "holoShift 6s ease infinite, emblemPulse 3s ease-in-out infinite",
                  }}
                >
                  H3°T
                </div>

                {/* VTC tag below */}
                <div
                  className="mt-2 text-center font-mono tracking-[0.6em] text-muted-foreground"
                  style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.85rem" }}
                >
                  VTC
                </div>

                {/* Decorative corner brackets */}
                {[
                  "top-0 left-0 border-t-2 border-l-2 w-6 h-6",
                  "top-0 right-0 border-t-2 border-r-2 w-6 h-6",
                  "bottom-0 left-0 border-b-2 border-l-2 w-6 h-6",
                  "bottom-0 right-0 border-b-2 border-r-2 w-6 h-6",
                ].map((cls, i) => (
                  <div
                    key={i}
                    className={`absolute ${cls} -m-3 opacity-40`}
                    style={{ borderColor: "var(--primary)" }}
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* STATS DASHBOARD STRIP */}
        <div className="mt-16 grid grid-cols-1 gap-px border border-border sm:grid-cols-3" style={{ background: "var(--border)" }}>
          {[
            { icon: Truck, end: 500, suffix: "+", label: t.hero.tours },
            { icon: Users, end: 8, suffix: "", label: t.hero.drivers },
            { icon: MapPin, end: 100, suffix: "k+", label: t.hero.kilometers },
          ].map(({ icon: Icon, end, suffix, label }, i) => (
            <ScrollReveal key={label} delay={400 + i * 100}>
              <div className="stat-card group cursor-default transition-all duration-300 hover:bg-[var(--surface-2)]">
                <Icon
                  className="mb-1 h-5 w-5 transition-colors group-hover:text-primary"
                  style={{ color: "var(--primary)", opacity: 0.7 }}
                />
                <span
                  className="display-heading text-3xl text-foreground lg:text-4xl"
                  style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
                >
                  <AnimatedCounter end={end} suffix={suffix} />
                </span>
                <span
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.2em" }}
                >
                  {label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <span
            className="text-xs uppercase tracking-widest text-muted-foreground"
            style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem" }}
          >
            {t.hero.scroll}
          </span>
          <div
            className="flex h-10 w-5 items-start justify-center rounded-full border p-1.5"
            style={{ borderColor: "color-mix(in oklab, var(--muted-foreground) 40%, transparent)" }}
          >
            <div
              className="h-1.5 w-1 animate-bounce rounded-full"
              style={{ background: "var(--primary)" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
