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
    { label: "Discord", href: "#contact" },
    { label: "TruckersMP", href: "https://truckersmp.com/vtc/83043", external: true },
  ]

  return (
    <footer
      className="relative overflow-hidden border-t py-16"
      style={{ borderColor: "var(--border)", background: "var(--surface-1)" }}
    >
      {/* Top line */}
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span
                className="display-heading chrome-text text-3xl"
                style={{ letterSpacing: "0.04em" }}
              >
                H3°T
              </span>
              <span
                className="text-xs tracking-[0.4em] text-muted-foreground"
                style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem" }}
              >
                VTC
              </span>
            </div>
            <p className="mb-4 max-w-xs text-sm font-light leading-relaxed text-muted-foreground">
              {t.footer.description}
            </p>
            <p className="led-credit">
              {t.footer.builtByPrefix}{" "}
              <span className="led-credit-name">The real Plumz</span>
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="display-heading mb-6 text-sm text-foreground"
              style={{ letterSpacing: "0.2em", fontSize: "0.7rem" }}
            >
              {t.footer.navigation}
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-primary"
                  >
                    <span
                      className="h-px w-4 transition-all duration-200 group-hover:w-6"
                      style={{ background: "var(--primary)", opacity: 0.6 }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4
              className="display-heading mb-6 text-sm text-foreground"
              style={{ letterSpacing: "0.2em", fontSize: "0.7rem" }}
            >
              {t.footer.social}
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="group flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-primary"
                  >
                    <span
                      className="h-px w-4 transition-all duration-200 group-hover:w-6"
                      style={{ background: "var(--primary)", opacity: 0.6 }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
          style={{ borderColor: "var(--border)" }}
        >
          <p
            className="text-xs text-muted-foreground"
            style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem" }}
          >
            © 2026 H3°T VTC — {t.footer.rights}
          </p>
          <div
            className="flex items-center gap-2 text-xs text-muted-foreground"
            style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem" }}
          >
            <Truck className="h-3.5 w-3.5" style={{ color: "var(--primary)", opacity: 0.7 }} />
            {t.footer.poweredBy}
          </div>
        </div>
      </div>
    </footer>
  )
}
