"use client"

import { useState } from "react"
import { ExternalLink, MessageCircle } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function ContactSection() {
  const { t } = useLanguage()
  const [showDiscordConfirm, setShowDiscordConfirm] = useState(false)

  return (
    <section id="contact" data-tutorial-id="contact" className="py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="text-sm font-medium uppercase tracking-wider text-primary">{t.contact.eyebrow}</span>
        <h2 className="mt-2 mb-4 text-3xl font-bold text-foreground sm:text-4xl">{t.contact.title}</h2>
        <p className="mb-8 text-muted-foreground text-pretty">{t.contact.subtitle}</p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => setShowDiscordConfirm((current) => !current)}
            className="flex items-center justify-center gap-3 rounded-xl bg-[#5865F2] px-6 py-4 font-medium text-white transition-colors hover:bg-[#4752C4]"
          >
            <MessageCircle className="h-5 w-5" />
            {t.contact.discord}
            <ExternalLink className="h-4 w-4" />
          </button>

          <a
            href="https://truckersmp.com/vtc/83043"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl bg-[#D33A2C] px-6 py-4 font-medium text-white transition-colors hover:bg-[#B62D21]"
          >
            <ExternalLink className="h-5 w-5" />
            {t.contact.truckersmp}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {showDiscordConfirm ? (
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 text-left shadow-lg">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {t.contact.discordConfirmTitle}
            </p>
            <p className="mb-5 text-sm leading-6 text-muted-foreground sm:text-base">{t.contact.discordConfirmText}</p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://discord.gg/q95veU4DQe"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 rounded-xl bg-[#5865F2] px-6 py-4 font-medium text-white transition-colors hover:bg-[#4752C4]"
              >
                <MessageCircle className="h-5 w-5" />
                {t.contact.discordConfirmOpen}
                <ExternalLink className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => setShowDiscordConfirm(false)}
                className="rounded-xl border border-border bg-background px-6 py-4 font-medium text-foreground transition-colors hover:bg-muted"
              >
                {t.contact.discordConfirmCancel}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
