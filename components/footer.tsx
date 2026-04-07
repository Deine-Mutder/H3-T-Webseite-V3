"use client"

import { Truck } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function Footer() {
  const { t } = useLanguage()

  const navigationLinks = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.features, href: "#features" },
    { label: t.nav.team, href: "#team" },
    { label: t.nav.contact, href: "#contact" },
  ]

  const socialLinks = [
    { label: "Discord", href: "#" },
    { label: "TruckersMP", href: "#" },
  ]

  return (
    <footer className="border-t border-border bg-secondary/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                H3{"\u00B0"}T
              </span>
              <span className="text-sm text-muted-foreground">VTC</span>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">{t.footer.description}</p>
            <p className="led-credit mt-3 text-sm">
              {t.footer.builtByPrefix} <span className="led-credit-name">The real Plumz</span>
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">{t.footer.navigation}</h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">{t.footer.social}</h4>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            {"\u00A9"} 2026 H3{"\u00B0"}T VTC. {t.footer.rights}
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="h-4 w-4" />
            <span>{t.footer.poweredBy}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
