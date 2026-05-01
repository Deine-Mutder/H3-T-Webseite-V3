"use client"

import Image from "next/image"
import { useMemo } from "react"
import { ArrowLeft, ArrowUpRight, CircleAlert, Package, Palette, Truck } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { createTripleTrailerCatalog, getTripleTrailerCopy } from "@/lib/triple-trailers-data"
import { ParticleBackground } from "./particle-background"
import { ScrollReveal } from "./scroll-reveal"

const overviewFactIcons = [Truck, Package, Palette]

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
                className="clip-card group relative block overflow-hidden border text-left transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: "color-mix(in oklab, var(--primary) 18%, transparent)",
                  background: "var(--surface-2)",
                }}
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
                  {dlc.overviewImage ? (
                    <Image
                      src={dlc.overviewImage.src}
                      alt={dlc.overviewImage.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex flex-col justify-between p-4"
                      style={{
                        background:
                          "radial-gradient(circle at top left, color-mix(in oklab, var(--primary) 26%, transparent), transparent 45%), linear-gradient(150deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02)), var(--surface-2)",
                      }}
                    >
                      <span className="text-xs uppercase tracking-[0.24em] text-primary">{copy.imagePending}</span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{dlc.brand}</p>
                        <h2 className="display-heading mt-2 text-3xl text-foreground">{dlc.label}</h2>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                  <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
                    <span
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em]"
                      style={{
                        borderColor: "color-mix(in oklab, var(--primary) 25%, transparent)",
                        color: "var(--primary)",
                        background: "rgba(8, 8, 12, 0.72)",
                      }}
                    >
                      <Truck className="h-3.5 w-3.5" />
                      DLC
                    </span>
                    <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                      {dlc.brand}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-primary">{copy.tripleSetupBadge}</p>
                    <h2 className="display-heading mt-2 text-3xl text-white transition-colors duration-300 group-hover:text-primary">
                      {dlc.label}
                    </h2>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">{dlc.description}</p>

                  <div
                    className="mt-4 rounded-[1.15rem] border p-3"
                    style={{
                      borderColor: "color-mix(in oklab, var(--primary) 18%, transparent)",
                      background: "color-mix(in oklab, var(--primary) 8%, transparent)",
                    }}
                  >
                    <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-primary">
                      <CircleAlert className="h-3.5 w-3.5" />
                      {copy.noteLabel}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dlc.note}</p>
                  </div>

                  <div className="mt-4 space-y-2">
                    {dlc.overviewFacts.map((fact, factIndex) => {
                      const Icon = overviewFactIcons[factIndex] ?? Truck

                      return (
                        <div
                          key={`${dlc.id}-fact-${fact}`}
                          className="flex items-start gap-3 rounded-[1rem] border border-white/10 bg-black/10 px-3 py-2.5"
                        >
                          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-sm leading-relaxed text-muted-foreground">{fact}</span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors group-hover:text-primary">
                    {copy.openDlcPage}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </main>
    </div>
  )
}
