"use client"

import { ExternalLink, ShieldCheck } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/context/language-context"
import { ScrollReveal } from "./scroll-reveal"

const partnerVtcs = [
  {
    name: "NorthStar Express",
    subName: "NSE",
    role: "Partner VTC",
    href: "https://truckersmp.com/vtc/86341",
    profileImage: "/partners/northstar-profile.png",
  },
  {
    name: "GALAXY CONVOY SERVICES",
    role: "Partner VTC",
    href: "https://truckersmp.com/vtc/82495",
    profileImage: "/partners/galaxy-profile.png",
  },
  {
    name: "RT LOGISTICS",
    role: "Partner VTC",
    href: "https://truckersmp.com/vtc/89274",
    profileImage: "/partners/rt-logistics-profile.png",
  },
]

export function PartnerSection() {
  const { t } = useLanguage()

  return (
    <section id="partner" data-tutorial-id="partner" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-14">
            <div className="section-label mb-4">{t.partner.eyebrow}</div>
            <h2 className="display-heading text-[clamp(2.5rem,6vw,5rem)] text-foreground" style={{ lineHeight: 0.9 }}>
              {t.partner.title}
            </h2>
            <div
              className="mt-8 h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, var(--primary), color-mix(in oklab, var(--primary) 20%, transparent) 60%, transparent)",
              }}
            />
            <p className="mt-6 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">{t.partner.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {partnerVtcs.map((partner, index) => (
            <ScrollReveal key={partner.name} delay={index * 80}>
              <a
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                className="glow-card group relative flex items-center justify-between gap-6 overflow-hidden border p-6 transition-all duration-300 hover:border-primary/50"
                style={{ borderColor: "var(--border)", background: "var(--surface-1)", textDecoration: "none" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "color-mix(in oklab, var(--primary) 10%, transparent)" }} />
                <div className="relative z-10 flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden"
                    style={{
                      background: "color-mix(in oklab, var(--primary) 14%, transparent)",
                      border: "1px solid color-mix(in oklab, var(--primary) 36%, transparent)",
                    }}
                  >
                    {partner.profileImage ? (
                      <Image
                        src={partner.profileImage}
                        alt={`${partner.name} logo`}
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain"
                      />
                    ) : (
                      <ShieldCheck className="h-5 w-5" style={{ color: "var(--primary)" }} />
                    )}
                  </div>
                  <div>
                    <h3 className="display-heading text-2xl text-foreground transition-colors duration-300 group-hover:text-primary">
                      {partner.name}
                    </h3>
                    {partner.subName ? (
                      <p className="display-heading mt-1 text-xl text-foreground transition-colors duration-300 group-hover:text-primary">
                        {partner.subName}
                      </p>
                    ) : null}
                    <p className="mt-1 text-sm font-light text-muted-foreground">{partner.role}</p>
                  </div>
                </div>
                <ExternalLink className="relative z-10 h-4 w-4 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
