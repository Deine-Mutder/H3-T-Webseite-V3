"use client"

import { useState } from "react"
import { ExternalLink, MessageCircle } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function ContactSection() {
  const { t } = useLanguage()
  const [showDiscordConfirm, setShowDiscordConfirm] = useState(false)

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
              <button
                type="button"
                onClick={() => setShowDiscordConfirm((c) => !c)}
                className="btn-wipe group relative flex flex-col items-center gap-4 p-10 text-center transition-all duration-300"
                style={{ background: "transparent" }}
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
              </button>

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

          {/* Discord Confirmation */}
          {showDiscordConfirm && (
            <div
              className="clip-card overflow-hidden text-left"
              style={{
                background: "var(--surface-2)",
                border: "1px solid color-mix(in oklab, #5865F2 30%, var(--border))",
                boxShadow: "0 0 40px color-mix(in oklab, #5865F2 8%, transparent)",
              }}
            >
              <div className="p-8">
                <p
                  className="section-label mb-3"
                  style={{ color: "#7289DA" }}
                >
                  {t.contact.discordConfirmTitle}
                </p>
                <p className="mb-8 text-sm font-light leading-relaxed text-muted-foreground">
                  {t.contact.discordConfirmText}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://discord.gg/q95veU4DQe"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-wipe clip-card-sm flex items-center justify-center gap-3 px-6 py-4 font-bold uppercase tracking-widest text-white transition-colors"
                    style={{
                      background: "#5865F2",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      letterSpacing: "0.15em",
                      fontSize: "0.8rem",
                      textDecoration: "none",
                    }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    {t.contact.discordConfirmOpen}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowDiscordConfirm(false)}
                    className="btn-wipe flex items-center justify-center border px-6 py-4 font-bold uppercase tracking-widest transition-all duration-300 hover:border-muted-foreground/50 hover:text-foreground"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--muted-foreground)",
                      background: "transparent",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      letterSpacing: "0.15em",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    {t.contact.discordConfirmCancel}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
