"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  ExternalLink,
  ImageIcon,
  Package,
  Truck,
} from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ParticleBackground } from "./particle-background"
import { ScrollReveal } from "./scroll-reveal"

type TripleTrailerPageCopy = {
  pageTitle: string
  pageSubtitle: string
  homeButton: string
  dlcLabel: string
  dlcHint: string
  expandLabel: string
  collapseLabel: string
  trailerLabel: string
  directLinkLabel: string
  openSteam: string
  noteLabel: string
  emptyTitle: string
  emptyText: string
  openDetails: string
  imagePending: string
  previewHint: string
  galleryLabel: string
  cargoFocusLabel: string
  availableCargoesLabel: string
  setupLabel: string
  setupHint: string
  trailerPositionsLabel: string
  factsLabel: string
  detailHintLabel: string
  slideCounter: (current: number, total: number) => string
  slotLabels: [string, string, string]
  slotFallback: string
  bobcatDescription: string
  bobcatNote: string
  bobcatHint: string
  trailerSummary: (category: string) => string
  upcomingDescription: (label: string) => string
  upcomingHint: string
  customBuildFact: string
  officialCargoFact: string
  imagePendingFact: string
  slideTitles: [string, string, string]
  slideCaptions: [string, string, string]
}

type TrailerSlide = {
  id: string
  title: string
  caption: string
  accent: string
  imageSrc?: string
}

type TripleTrailerOffer = {
  id: string
  name: string
  category: string
  summary: string
  cargoFocus: string[]
  trailerPositions: string[]
  facts: string[]
  detailHint: string
  gallery: TrailerSlide[]
}

type TripleTrailerDlc = {
  id: string
  label: string
  description: string
  note: string
  hint: string
  link?: {
    label: string
    href: string
  }
  availableCargoes: string[]
  trailers: TripleTrailerOffer[]
}

const bobcatCargoes = [
  { id: "telehandler", category: "Agricultural Telehandler", name: "Bobcat TL30.70" },
  { id: "compressor", category: "Compressor", name: "Bobcat PA12.7v" },
  { id: "excavator", category: "Excavator", name: "Bobcat E60" },
  { id: "forklift", category: "Forklift", name: "Bobcat D30" },
  { id: "mini-excavator", category: "Mini Excavator (Electric)", name: "Bobcat E10e" },
  { id: "skid-steer", category: "Skid-Steer Loader", name: "Bobcat S86" },
  { id: "wheel-loader", category: "Wheel Loader", name: "Bobcat L95" },
] as const

const previewAccents = [
  "rgba(255, 192, 93, 0.38)",
  "rgba(250, 163, 84, 0.34)",
  "rgba(255, 219, 117, 0.28)",
  "rgba(244, 153, 91, 0.34)",
  "rgba(241, 194, 50, 0.28)",
  "rgba(255, 173, 96, 0.34)",
  "rgba(255, 207, 107, 0.3)",
]

function getTripleTrailerCopy(language: string | null): TripleTrailerPageCopy {
  if (language === "de") {
    return {
      pageTitle: "Unsere Triple Trailer Angebote",
      pageSubtitle: "Wir stellen auf Wunsch auch persoenlich gestaltete Triple Trailer her.",
      homeButton: "Home",
      dlcLabel: "DLC Auswahl",
      dlcHint: "Beim Oeffnen dieser Seite siehst du zuerst nur die DLC-Container. Klicke auf ein DLC, um die dazugehoerigen Trailer darunter einzublenden.",
      expandLabel: "Oeffnen",
      collapseLabel: "Schliessen",
      trailerLabel: "Trailer im DLC",
      directLinkLabel: "Direkter DLC-Link",
      openSteam: "DLC auf Steam ansehen",
      noteLabel: "Hinweis",
      emptyTitle: "Dieser DLC-Bereich wird als Naechstes befuellt",
      emptyText: "Sobald Bilder, Cargo-Setups und finale Trailerdetails fertig sind, erscheint hier die komplette Uebersicht.",
      openDetails: "Details oeffnen",
      imagePending: "Bild folgt",
      previewHint: "Platz fuer deine finalen Trailerbilder",
      galleryLabel: "Galerie",
      cargoFocusLabel: "Cargo im Fokus",
      availableCargoesLabel: "Verfuegbare Cargoes im DLC",
      setupLabel: "Setup Hinweis",
      setupHint: "Die exakte Verteilung pro Trailer tragen wir mit deinen finalen Bildern und Wunsch-Setups ein.",
      trailerPositionsLabel: "Cargo-Positionen",
      factsLabel: "Kurzinfos",
      detailHintLabel: "Weitere Infos",
      slideCounter: (current, total) => `Bild ${current} / ${total}`,
      slotLabels: ["Vorne", "Mitte", "Hinten"],
      slotFallback: "Wird mit dem finalen Setup eingetragen",
      bobcatDescription:
        "Hier ist der Bobcat-Bereich schon vorbereitet. Nicht alle Cargoes muessen hier gezeigt werden - ueber den DLC-Link kannst du jederzeit die komplette Packliste nachsehen.",
      bobcatNote:
        "Nicht alle Cargoes werden hier gezeigt. Ueber den Steam-Link kannst du jederzeit nachsehen, was komplett im Bobcat DLC enthalten ist.",
      bobcatHint:
        "Bobcat ist jetzt als Vorlage aufgebaut. Die restlichen DLCs koennen wir danach nach genau demselben System befuellen.",
      trailerSummary: (category) =>
        `${category} als Ausgangspunkt fuer ein individuelles Triple Trailer Setup mit Bobcat Cargo.`,
      upcomingDescription: (label) =>
        `${label} wird als Naechstes vorbereitet. Die Struktur fuer Trailerkarten, Bilder und das Breitbild-Detailfenster steht bereits.`,
      upcomingHint: "Sobald du mir Bilder oder konkrete Trailerdaten gibst, fuellen wir diesen Bereich direkt nach.",
      customBuildFact: "Custom Triple Trailer Build auf Wunsch",
      officialCargoFact: "Cargo-Daten aus dem offiziellen DLC",
      imagePendingFact: "Bilder koennen spaeter direkt eingepflegt werden",
      slideTitles: ["Frontansicht", "Seitenansicht", "Detailansicht"],
      slideCaptions: [
        "Hier kommt spaeter dein Hero-Bild fuer dieses Trailer-Setup hinein.",
        "Diese Ansicht ist fuer eine seitliche oder komplette Zugansicht vorbereitet.",
        "Perfekt fuer Cargo-Details, Nahaufnahmen oder eine zweite Variante.",
      ],
    }
  }

  return {
    pageTitle: "Our Triple Trailer Offers",
    pageSubtitle: "We can also build custom triple trailers on request.",
    homeButton: "Home",
    dlcLabel: "DLC Selection",
    dlcHint: "When this page opens, only the headline and DLC containers are visible. Click a DLC to reveal the matching trailers below.",
    expandLabel: "Open",
    collapseLabel: "Close",
    trailerLabel: "Trailers in this DLC",
    directLinkLabel: "Direct DLC link",
    openSteam: "Open DLC on Steam",
    noteLabel: "Note",
    emptyTitle: "This DLC area will be filled next",
    emptyText: "As soon as images, cargo setups, and final trailer details are ready, the full overview will appear here.",
    openDetails: "Open details",
    imagePending: "Image coming soon",
    previewHint: "Space reserved for your final trailer images",
    galleryLabel: "Gallery",
    cargoFocusLabel: "Cargo focus",
    availableCargoesLabel: "Available cargoes in this DLC",
    setupLabel: "Setup note",
    setupHint: "We will add the exact cargo distribution per trailer once your final images and custom layouts are ready.",
    trailerPositionsLabel: "Trailer positions",
    factsLabel: "Quick facts",
    detailHintLabel: "More information",
    slideCounter: (current, total) => `Image ${current} / ${total}`,
    slotLabels: ["Front", "Middle", "Rear"],
    slotFallback: "Will be added with the final setup",
    bobcatDescription:
      "The Bobcat section is already prepared. Not every cargo has to be shown here - you can always use the DLC link to check the complete pack list.",
    bobcatNote:
      "Not every cargo is shown here. Use the Steam link anytime to review everything included in the Bobcat DLC.",
    bobcatHint:
      "Bobcat is now set up as the first template. The remaining DLCs can be filled with the exact same system afterward.",
    trailerSummary: (category) =>
      `${category} as the starting point for a custom triple trailer setup with Bobcat cargo.`,
    upcomingDescription: (label) =>
      `${label} will be prepared next. The structure for trailer cards, images, and the widescreen detail window is already in place.`,
    upcomingHint: "As soon as you send images or concrete trailer data, we can fill this area immediately.",
    customBuildFact: "Custom triple trailer build on request",
    officialCargoFact: "Cargo data based on the official DLC",
    imagePendingFact: "Images can be added directly later",
    slideTitles: ["Front view", "Side view", "Detail view"],
    slideCaptions: [
      "This slot is ready for your future hero image of the trailer setup.",
      "Use this slide for a full side angle or complete road train shot later.",
      "Ideal for cargo close-ups, alternate views, or a secondary setup.",
    ],
  }
}

function createTrailerSlides(copy: TripleTrailerPageCopy, accent: string): TrailerSlide[] {
  return copy.slideTitles.map((title, index) => ({
    id: `${title}-${index}`,
    title,
    caption: copy.slideCaptions[index],
    accent,
  }))
}

function createTripleTrailerCatalog(copy: TripleTrailerPageCopy): TripleTrailerDlc[] {
  const bobcatAvailableCargoes = bobcatCargoes.map((cargo) => `${cargo.category} - ${cargo.name}`)

  return [
    {
      id: "farm",
      label: "Farm DLC",
      description: copy.upcomingDescription("Farm DLC"),
      note: copy.emptyText,
      hint: copy.upcomingHint,
      availableCargoes: [],
      trailers: [],
    },
    {
      id: "jcb",
      label: "JCB DLC",
      description: copy.upcomingDescription("JCB DLC"),
      note: copy.emptyText,
      hint: copy.upcomingHint,
      availableCargoes: [],
      trailers: [],
    },
    {
      id: "volvo",
      label: "Volvo DLC",
      description: copy.upcomingDescription("Volvo DLC"),
      note: copy.emptyText,
      hint: copy.upcomingHint,
      availableCargoes: [],
      trailers: [],
    },
    {
      id: "heavy-cargo",
      label: "Heavy Cargo DLC",
      description: copy.upcomingDescription("Heavy Cargo DLC"),
      note: copy.emptyText,
      hint: copy.upcomingHint,
      availableCargoes: [],
      trailers: [],
    },
    {
      id: "high-power",
      label: "High Power DLC",
      description: copy.upcomingDescription("High Power DLC"),
      note: copy.emptyText,
      hint: copy.upcomingHint,
      availableCargoes: [],
      trailers: [],
    },
    {
      id: "krone",
      label: "Krone DLC",
      description: copy.upcomingDescription("Krone DLC"),
      note: copy.emptyText,
      hint: copy.upcomingHint,
      availableCargoes: [],
      trailers: [],
    },
    {
      id: "forest",
      label: "Forest DLC",
      description: copy.upcomingDescription("Forest DLC"),
      note: copy.emptyText,
      hint: copy.upcomingHint,
      availableCargoes: [],
      trailers: [],
    },
    {
      id: "bobcat",
      label: "BobCat DLC",
      description: copy.bobcatDescription,
      note: copy.bobcatNote,
      hint: copy.bobcatHint,
      link: {
        label: "Euro Truck Simulator 2 - Bobcat Cargo Pack",
        href: "https://store.steampowered.com/app/4348650/Euro_Truck_Simulator_2__Bobcat_Cargo_Pack/?curator_clanid=4419325",
      },
      availableCargoes: bobcatAvailableCargoes,
      trailers: bobcatCargoes.map((cargo, index) => ({
        id: cargo.id,
        name: `${cargo.name} Triple Trailer`,
        category: cargo.category,
        summary: copy.trailerSummary(cargo.category),
        cargoFocus: [`${cargo.category} - ${cargo.name}`],
        trailerPositions: [copy.slotFallback, copy.slotFallback, copy.slotFallback],
        facts: [copy.customBuildFact, copy.officialCargoFact, copy.imagePendingFact],
        detailHint: copy.setupHint,
        gallery: createTrailerSlides(copy, previewAccents[index % previewAccents.length]),
      })),
    },
  ]
}

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

export function TripleTrailersPage() {
  const { language, t } = useLanguage()
  const [activeDlcId, setActiveDlcId] = useState<string | null>(null)
  const [selectedTrailerId, setSelectedTrailerId] = useState<string | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const copy = useMemo(() => getTripleTrailerCopy(language), [language])
  const catalog = useMemo(() => createTripleTrailerCatalog(copy), [copy])
  const activeDlc = catalog.find((dlc) => dlc.id === activeDlcId) ?? null
  const selectedTrailer = activeDlc?.trailers.find((trailer) => trailer.id === selectedTrailerId) ?? null
  const activeSlide = selectedTrailer ? selectedTrailer.gallery[activeImageIndex] : null

  const toggleDlc = (dlcId: string) => {
    setActiveDlcId((current) => (current === dlcId ? null : dlcId))
    setSelectedTrailerId(null)
    setActiveImageIndex(0)
  }

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
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{copy.dlcHint}</p>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {catalog.map((dlc, index) => {
            const isActive = activeDlcId === dlc.id

            return (
              <ScrollReveal key={dlc.id} delay={index * 60}>
                <button
                  type="button"
                  onClick={() => toggleDlc(dlc.id)}
                  aria-expanded={isActive}
                  className="clip-card group relative overflow-hidden border p-5 text-left transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: isActive
                      ? "color-mix(in oklab, var(--primary) 40%, transparent)"
                      : "color-mix(in oklab, var(--primary) 18%, transparent)",
                    background: isActive
                      ? "radial-gradient(circle at top left, color-mix(in oklab, var(--primary) 14%, transparent), transparent 42%), var(--surface-2)"
                      : "var(--surface-2)",
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
                    <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      {isActive ? copy.collapseLabel : copy.expandLabel}
                    </span>
                  </div>

                  <h2 className="display-heading text-3xl text-foreground transition-colors duration-300 group-hover:text-primary">
                    {dlc.label}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{dlc.description}</p>
                </button>
              </ScrollReveal>
            )
          })}
        </div>

        {activeDlc ? (
          <div className="mt-10 space-y-6">
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
                    <p className="text-xs uppercase tracking-[0.22em] text-primary">{copy.trailerLabel}</p>
                    <h2 className="display-heading mt-3 text-3xl text-foreground sm:text-4xl">{activeDlc.label}</h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{activeDlc.description}</p>
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
                          <ArrowUpRight className="h-3.5 w-3.5" />
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
        ) : null}
      </main>

      <Dialog
        open={selectedTrailer !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedTrailerId(null)
        }}
      >
        <DialogContent className="top-4 max-h-[calc(100dvh-2rem)] h-[calc(100dvh-2rem)] w-[98vw] max-w-[98vw] translate-x-[-50%] translate-y-0 overflow-hidden border-border bg-card/95 p-0 shadow-2xl backdrop-blur-xl sm:w-[98vw] sm:max-w-[98vw]">
          {selectedTrailer && activeSlide ? (
            <div className="flex h-full flex-col overflow-hidden">
              <DialogHeader className="border-b border-border px-6 py-5">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="section-label">{activeDlc?.label}</span>
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

                    {activeDlc?.availableCargoes.length ? (
                      <div className="rounded-[1.2rem] border border-white/10 bg-black/15 p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-primary">
                          {copy.availableCargoesLabel}
                        </p>
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

                    {activeDlc?.link ? (
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
