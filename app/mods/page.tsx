import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ModsBrowser } from "./mods-browser"

export const metadata: Metadata = {
  title: "Save Edits & Local Mods | H3T",
  description: "Downloadbereich fuer H3T Save Edits und Local Mods.",
}

export default function ModsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="road-grid opacity-30" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--primary) 9%, transparent), transparent 35%, var(--background) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="btn-wipe inline-flex items-center gap-2 border border-border px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.2em" }}
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>

        <section className="py-14 lg:py-20">
          <div className="section-label mb-5">Downloads</div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1
                className="display-heading text-[clamp(3rem,8vw,7rem)] text-foreground"
                style={{ lineHeight: 0.88 }}
              >
                Save Edits
                <span className="block text-primary">& Local Mods</span>
              </h1>
              <p className="mt-6 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
                Kuratierte H3T Setups fuer Trucks, Trailer und Parts. Waehle den Bereich, filtere nach Typ
                und Marke, und lade direkt das passende Setup.
              </p>
            </div>

            <div className="hidden h-px flex-1 lg:block" style={{ background: "var(--border)" }} />
          </div>
        </section>

        <ModsBrowser />
      </div>
    </main>
  )
}
