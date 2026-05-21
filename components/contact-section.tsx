"use client"

import { ExternalLink } from "lucide-react"
import { useLanguage } from "@/context/language-context"

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.32 4.37a19.79 19.79 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.38-.44.86-.61 1.25a18.27 18.27 0 0 0-5.48 0 12.64 12.64 0 0 0-.62-1.25.08.08 0 0 0-.08-.04 19.74 19.74 0 0 0-4.88 1.52.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .09-.03c.46-.63.87-1.3 1.23-2a.08.08 0 0 0-.04-.1 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1-.01-.12c.13-.1.25-.2.37-.3a.07.07 0 0 1 .08-.01c3.93 1.79 8.18 1.79 12.06 0a.07.07 0 0 1 .08.01c.12.1.25.2.37.3a.08.08 0 0 1-.01.13 12.3 12.3 0 0 1-1.87.89.08.08 0 0 0-.04.11c.36.7.77 1.36 1.23 1.99a.08.08 0 0 0 .08.03 19.84 19.84 0 0 0 6-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.68-3.55-13.66a.06.06 0 0 0-.03-.04ZM8.02 15.33c-1.18 0-2.16-1.09-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.33-.96 2.42-2.16 2.42Zm7.98 0c-1.18 0-2.16-1.09-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.33-.95 2.42-2.16 2.42Z" />
    </svg>
  )
}

export function ContactSection() {
  const { t } = useLanguage()

  return (
    <section id="contact" data-tutorial-id="contact" className="relative overflow-hidden py-24 lg:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 65%)" }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Eyebrow */}
          <div className="section-label mx-auto mb-6 w-fit" style={{ justifyContent: "center" }}>
            {t.contact.eyebrow}
          </div>

          {/* Title */}
          <h2
            className="display-heading mb-6 text-[clamp(2.5rem,6vw,5.5rem)] text-foreground"
            style={{ lineHeight: 0.9 }}
          >
            {t.contact.title}
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mb-16 max-w-lg text-sm font-light leading-relaxed text-muted-foreground">
            {t.contact.subtitle}
          </p>

          {/* Big CTA Block */}
          <div
            className="clip-card mb-8 overflow-hidden"
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface-1)",
            }}
          >
            <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0" style={{ borderColor: "var(--border)" }}>
              {/* Discord */}
              <a
                href="https://discord.gg/q95veU4DQe"
                target="_blank"
                rel="noreferrer"
                className="btn-wipe group relative flex flex-col items-center gap-4 p-10 text-center transition-all duration-300"
                style={{ background: "transparent", textDecoration: "none" }}
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "color-mix(in oklab, #5865F2 8%, transparent)" }}
                />
                <div
                  className="relative z-10 flex h-14 w-14 items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "color-mix(in oklab, #5865F2 18%, transparent)",
                    border: "1px solid color-mix(in oklab, #5865F2 40%, transparent)",
                  }}
                >
                  <DiscordIcon className="h-6 w-6 text-[#5865F2]" />
                </div>
                <div className="relative z-10">
                  <div
                    className="display-heading text-xl text-foreground transition-colors group-hover:text-[#7289DA] sm:text-2xl"
                  >
                    {t.contact.discord}
                  </div>
                  <div
                    className="mt-1 flex items-center justify-center gap-1 text-xs uppercase tracking-widest text-muted-foreground"
                    style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem" }}
                  >
                    discord.gg <ExternalLink className="h-2.5 w-2.5" />
                  </div>
                </div>
              </a>

              {/* TruckersMP */}
              <a
                href="https://truckersmp.com/vtc/83043"
                target="_blank"
                rel="noreferrer"
                className="btn-wipe group relative flex flex-col items-center gap-4 p-10 text-center transition-all duration-300"
                style={{ background: "transparent", textDecoration: "none" }}
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "color-mix(in oklab, #D33A2C 8%, transparent)" }}
                />
                <div
                  className="relative z-10 flex h-14 w-14 items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "color-mix(in oklab, #D33A2C 18%, transparent)",
                    border: "1px solid color-mix(in oklab, #D33A2C 40%, transparent)",
                  }}
                >
                  <ExternalLink className="h-6 w-6" style={{ color: "#D33A2C" }} />
                </div>
                <div className="relative z-10">
                  <div
                    className="display-heading text-xl text-foreground transition-colors group-hover:text-[#D33A2C] sm:text-2xl"
                  >
                    {t.contact.truckersmp}
                  </div>
                  <div
                    className="mt-1 flex items-center justify-center gap-1 text-xs uppercase tracking-widest text-muted-foreground"
                    style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem" }}
                  >
                    truckersmp.com <ExternalLink className="h-2.5 w-2.5" />
                  </div>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
