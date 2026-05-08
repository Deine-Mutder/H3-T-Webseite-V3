"use client"

import { ExternalLink, MessageCircle } from "lucide-react"
import { useLanguage } from "@/context/language-context"

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
                  <MessageCircle className="h-6 w-6" style={{ color: "#5865F2" }} />
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
