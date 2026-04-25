"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  ExternalLink,
  ImageIcon,
  Package,
} from "lucide-react"
import { useLanguage } from "@/context/language-context"
import {
  createTripleTrailerCatalog,
  getTripleTrailerCopy,
  type TrailerSlide,
  type TripleTrailerDlcId,
} from "@/lib/triple-trailers-data"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ParticleBackground } from "./particle-background"
import { ScrollReveal } from "./scroll-reveal"

function TrailerPreview({
  slide,
  title,
  badge,
  imagePending,
  previewHint,
  compact = false,
}: {
  slide: TrailerSlide
  title: string
  badge: string
  imagePending: string
  previewHint: string
  compact?: boolean
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/20 ${
        compact ? "aspect-[16/10]" : "min-h-[24rem] flex-1"
      }`}
      style={{
        background: `
          radial-gradient(circle at top left, ${slide.accent} 0%, transparent 42%),
          radial-gradient(circle at bottom right, rgba(255,255,255,0.08) 0%, transparent 30%),
          linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))
        `,
      }}
    >
      {slide.imageSrc ? (
        <Image
          src={slide.imageSrc}
          alt={title}
          fill
          sizes={compact ? "(max-width: 1200px) 100vw, 33vw" : "98vw"}
          className="object-cover"
        />
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: compact ? "36px 36px" : "48px 48px",
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <span
            className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em]"
            style={{
              borderColor: "color-mix(in oklab, var(--primary) 30%, transparent)",
              background: "color-mix(in oklab, var(--primary) 12%, transparent)",
              color: "var(--primary)",
            }}
          >
            <Package className="h-3.5 w-3.5" />
            {badge}
          </span>
          <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
            {imagePending}
          </span>
        </div>

        <div className="max-w-xl">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <ImageIcon className="h-4 w-4" />
            <span className="text-xs uppercase tracking-[0.25em]">{previewHint}</span>
          </div>
          <h4 className={`${compact ? "text-xl" : "text-3xl sm:text-4xl"} display-heading text-foreground`}>
            {title}
          </h4>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{slide.caption}</p>
        </div>
      </div>
    </div>
  )
}

export function TripleTrailerDlcPage({ dlcId }: { dlcId: TripleTrailerDlcId }) {
  const { language } = useLanguage()
  const [selectedTrailerId, setSelectedTrailerId] = useState<string | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const copy = useMemo(() => getTripleTrailerCopy(language), [language])
  const catalog = useMemo(() => createTripleTrailerCatalog(copy), [copy])
  const activeDlc = catalog.find((dlc) => dlc.id === dlcId) ?? null
  const selectedTrailer = activeDlc?.trailers.find((trailer) => trailer.id === selectedTrailerId) ?? null
  const activeSlide = selectedTrailer ? selectedTrailer.gallery[activeImageIndex] : null

  const openTrailerDetails = (trailerId: string) => {
    setSelectedTrailerId(trailerId)
    setActiveImageIndex(0)
  }

  const showPreviousSlide = () => {
    if (!selectedTrailer) return
    setActiveImageIndex((current) => (current - 1 + selectedTrailer.gallery.length) % selectedTrailer.gallery.length)
  }

  const showNextSlide = () => {
    if (!selectedTrailer) return
    setActiveImageIndex((current) => (current + 1) % selectedTrailer.gallery.length)
  }

  if (!activeDlc) {
    return null
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <ParticleBackground />

      <main className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-10">
        <ScrollReveal>
          <div className="mb-12">
            <div className="flex flex-wrap gap-3">
              <a
                href="/triple-trailers"
                className="btn-wipe inline-flex items-center gap-2 border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors hover:border-primary/60 hover:text-primary"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--muted-foreground)",
                  background: "transparent",
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {copy.backToDlcs}
              </a>

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
            </div>

            <div className="mt-8">
              <div className="section-label mb-4">{copy.trailerLabel}</div>
              <h1
                className="display-heading text-[clamp(2.75rem,7vw,6rem)] text-foreground"
                style={{ lineHeight: 0.9 }}
              >
                {activeDlc.label}
              </h1>
              <div
                className="mt-8 h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--primary), color-mix(in oklab, var(--primary) 20%, transparent) 60%, transparent)",
                }}
              />
              <p className="mt-6 max-w-3xl text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
                {activeDlc.description}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section
            className="clip-card overflow-hidden border p-5 sm:p-6"
            style={{
              borderColor: "color-mix(in oklab, var(--primary) 20%, transparent)",
              background:
                "radial-gradient(circle at top left, color-mix(in oklab, var(--primary) 16%, transparent), transparent 38%), var(--surface-2)",
            }}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.22em] text-primary">{copy.dlcLabel}</p>
                <h2 className="display-heading mt-3 text-3xl text-foreground sm:text-4xl">{activeDlc.label}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{activeDlc.hint}</p>
              </div>

              {activeDlc.link ? (
                <a
                  href={activeDlc.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 self-start rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors hover:border-primary/60 hover:text-primary"
                  style={{
                    borderColor: "color-mix(in oklab, var(--primary) 25%, transparent)",
                    background: "color-mix(in oklab, var(--primary) 10%, transparent)",
                  }}
                >
                  {copy.openSteam}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
              <div
                className="rounded-[1.2rem] border p-4"
                style={{
                  borderColor: "color-mix(in oklab, var(--primary) 18%, transparent)",
                  background: "color-mix(in oklab, var(--primary) 8%, transparent)",
                }}
              >
                <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary">
                  <CircleAlert className="h-3.5 w-3.5" />
                  {copy.noteLabel}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{activeDlc.note}</p>
              </div>

              <div className="rounded-[1.2rem] border border-white/10 bg-black/15 p-4">
                <p className="mb-2 text-xs uppercase tracking-[0.22em] text-primary">{copy.detailHintLabel}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{activeDlc.hint}</p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-10 space-y-6">
          {activeDlc.trailers.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {activeDlc.trailers.map((trailer, index) => (
                <ScrollReveal key={trailer.id} delay={index * 70}>
                  <div className="clip-card group overflow-hidden border border-border/80 bg-card/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                    <button
                      type="button"
                      onClick={() => openTrailerDetails(trailer.id)}
                      className="block w-full text-left"
                    >
                      <TrailerPreview
                        slide={trailer.gallery[0]}
                        title={trailer.name}
                        badge={trailer.category}
                        imagePending={copy.imagePending}
                        previewHint={copy.previewHint}
                        compact
                      />
                    </button>

                    <div className="pt-4">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <h3 className="display-heading text-2xl text-foreground">{trailer.name}</h3>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                          {activeDlc.label}
                        </span>
                      </div>

                      <p className="text-sm leading-relaxed text-muted-foreground">{trailer.summary}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {trailer.cargoFocus.map((cargo) => (
                          <span
                            key={cargo}
                            className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary"
                          >
                            {cargo}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => openTrailerDetails(trailer.id)}
                        className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
                      >
                        {copy.openDetails}
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal>
              <div
                className="clip-card border p-8 text-center"
                style={{
                  borderColor: "color-mix(in oklab, var(--primary) 18%, transparent)",
                  background:
                    "radial-gradient(circle at center, color-mix(in oklab, var(--primary) 10%, transparent), transparent 55%), var(--surface-2)",
                }}
              >
                <p className="display-heading text-2xl text-foreground">{copy.emptyTitle}</p>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {copy.emptyText}
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>

      <Dialog
        open={selectedTrailer !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedTrailerId(null)
        }}
      >
        <DialogContent className="top-4 h-[calc(100dvh-2rem)] max-h-[calc(100dvh-2rem)] w-[98vw] max-w-[98vw] translate-x-[-50%] translate-y-0 overflow-hidden border-border bg-card/95 p-0 shadow-2xl backdrop-blur-xl sm:w-[98vw] sm:max-w-[98vw]">
          {selectedTrailer && activeSlide ? (
            <div className="flex h-full flex-col overflow-hidden">
              <DialogHeader className="border-b border-border px-6 py-5">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="section-label">{activeDlc.label}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                    {selectedTrailer.category}
                  </span>
                </div>
                <DialogTitle className="display-heading text-3xl text-foreground sm:text-4xl">
                  {selectedTrailer.name}
                </DialogTitle>
                <DialogDescription className="mt-2 max-w-4xl text-sm leading-relaxed text-muted-foreground">
                  {selectedTrailer.summary}
                </DialogDescription>
              </DialogHeader>

              <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1fr)_22rem]">
                <div className="flex min-h-0 flex-col overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-primary">{copy.galleryLabel}</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {copy.slideCounter(activeImageIndex + 1, selectedTrailer.gallery.length)}
                      </p>
                    </div>

                    {selectedTrailer.gallery.length > 1 ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={showPreviousSlide}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-background/70 text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={showNextSlide}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-background/70 text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    ) : null}
                  </div>

                  <TrailerPreview
                    slide={activeSlide}
                    title={selectedTrailer.name}
                    badge={activeSlide.title}
                    imagePending={copy.imagePending}
                    previewHint={copy.previewHint}
                  />

                  {selectedTrailer.gallery.length > 1 ? (
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {selectedTrailer.gallery.map((slide, index) => (
                        <button
                          key={slide.id}
                          type="button"
                          onClick={() => setActiveImageIndex(index)}
                          className={`rounded-[1.2rem] border p-3 text-left transition-all ${
                            index === activeImageIndex
                              ? "border-primary/40 bg-primary/10"
                              : "border-border/70 bg-background/50 hover:border-primary/25"
                          }`}
                        >
                          <p className="text-xs uppercase tracking-[0.22em] text-primary">{slide.title}</p>
                          <p className="mt-2 text-sm text-muted-foreground">{slide.caption}</p>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>

                <aside className="min-h-0 overflow-y-auto border-t border-border/80 bg-background/55 px-4 py-4 lg:border-l lg:border-t-0 lg:px-5 lg:py-6">
                  <div className="space-y-5">
                    <div className="rounded-[1.2rem] border border-white/10 bg-black/15 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-primary">{copy.cargoFocusLabel}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedTrailer.cargoFocus.map((cargo) => (
                          <span
                            key={cargo}
                            className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary"
                          >
                            {cargo}
                          </span>
                        ))}
                      </div>
                    </div>

                    {activeDlc.availableCargoes.length ? (
                      <div className="rounded-[1.2rem] border border-white/10 bg-black/15 p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-primary">{copy.availableCargoesLabel}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {activeDlc.availableCargoes.map((cargo) => (
                            <span
                              key={cargo}
                              className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground"
                            >
                              {cargo}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <div className="rounded-[1.2rem] border border-white/10 bg-black/15 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-primary">{copy.trailerPositionsLabel}</p>
                      <div className="mt-3 space-y-3">
                        {selectedTrailer.trailerPositions.map((position, index) => (
                          <div key={`${selectedTrailer.id}-slot-${index}`} className="rounded-[1rem] border border-white/10 p-3">
                            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-primary">
                              {copy.slotLabels[index] ?? `Trailer ${index + 1}`}
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{position}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.2rem] border border-white/10 bg-black/15 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-primary">{copy.factsLabel}</p>
                      <div className="mt-3 space-y-2">
                        {selectedTrailer.facts.map((fact) => (
                          <p key={fact} className="text-sm leading-relaxed text-muted-foreground">
                            {fact}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.2rem] border border-white/10 bg-black/15 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-primary">{copy.setupLabel}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{selectedTrailer.detailHint}</p>
                    </div>

                    {activeDlc.link ? (
                      <div className="rounded-[1.2rem] border border-white/10 bg-black/15 p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-primary">{copy.directLinkLabel}</p>
                        <a
                          href={activeDlc.link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-primary"
                        >
                          {activeDlc.link.label}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{activeDlc.note}</p>
                      </div>
                    ) : null}
                  </div>
                </aside>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
