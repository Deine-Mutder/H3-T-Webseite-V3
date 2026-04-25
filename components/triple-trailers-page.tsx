"use client"

import { useMemo } from "react"
import { ArrowLeft, ArrowUpRight, Truck } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { createTripleTrailerCatalog, getTripleTrailerCopy } from "@/lib/triple-trailers-data"
import { ParticleBackground } from "./particle-background"
import { ScrollReveal } from "./scroll-reveal"

export function TripleTrailersPage() {
  const { language, t } = useLanguage()
  const copy = useMemo(() => getTripleTrailerCopy(language), [language])
  const catalog = useMemo(() => createTripleTrailerCatalog(copy), [copy])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <ParticleBackground />

      <main className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-10">
        <ScrollReveal>
          <div className="mb-12">
            <a
              href="/"
              className="btn-wipe inline-flex items-center gap-2 border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors hover:border-primary/60 hover:text-primary"
              style={{
                borderColor: "var(--border)",
                color: "var(--muted-foreground)",
                background: "transparent",
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {copy.homeButton}
            </a>

            <div className="mt-8">
              <div className="section-label mb-4">{t.features.items[0].title}</div>
              <h1
                className="display-heading text-[clamp(2.75rem,7vw,6rem)] text-foreground"
                style={{ lineHeight: 0.9 }}
              >
                {copy.pageTitle}
              </h1>
              <div
                className="mt-8 h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--primary), color-mix(in oklab, var(--primary) 20%, transparent) 60%, transparent)",
                }}
              />
              <p className="mt-6 max-w-3xl text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
                {copy.pageSubtitle}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="mb-6 flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">{copy.dlcLabel}</p>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{copy.overviewHint}</p>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {catalog.map((dlc, index) => (
            <ScrollReveal key={dlc.id} delay={index * 60}>
              <a
                href={`/triple-trailers/${dlc.id}`}
                className="clip-card group relative block overflow-hidden border p-5 text-left transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: "color-mix(in oklab, var(--primary) 18%, transparent)",
                  background: "var(--surface-2)",
                }}
              >
                <div className="mb-8 flex items-start justify-between gap-3">
                  <span
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em]"
                    style={{
                      borderColor: "color-mix(in oklab, var(--primary) 25%, transparent)",
                      color: "var(--primary)",
                      background: "color-mix(in oklab, var(--primary) 10%, transparent)",
                    }}
                  >
                    <Truck className="h-3.5 w-3.5" />
                    DLC
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    {copy.openDlcPage}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                <h2 className="display-heading text-3xl text-foreground transition-colors duration-300 group-hover:text-primary">
                  {dlc.label}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{dlc.description}</p>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </main>
    </div>
  )
}
