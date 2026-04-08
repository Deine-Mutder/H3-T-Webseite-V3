"use client"

import { useEffect, useRef, useState } from "react"
import { Crown, Shield, Star, User } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

function getRoleStyles(role: string) {
  if (role === "Owner") {
    return {
      card:
        "border-primary/60 bg-[radial-gradient(circle_at_top,_rgba(255,215,90,0.2),_transparent_55%),linear-gradient(180deg,rgba(255,215,90,0.08),rgba(255,255,255,0))] shadow-[0_20px_70px_rgba(255,215,90,0.16)]",
      badge: "bg-primary text-primary-foreground",
      iconWrap: "bg-primary/15 text-primary",
      icon: Crown,
    }
  }

  if (role === "Co-Owner") {
    return {
      card:
        "border-sky-400/45 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),linear-gradient(180deg,rgba(56,189,248,0.07),rgba(255,255,255,0))] shadow-[0_20px_70px_rgba(56,189,248,0.14)]",
      badge: "bg-sky-400/15 text-sky-300 ring-1 ring-sky-400/30",
      iconWrap: "bg-sky-400/15 text-sky-300",
      icon: Shield,
    }
  }

  return {
    card:
      "border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))] shadow-[0_18px_60px_rgba(0,0,0,0.12)]",
    badge: "bg-muted text-muted-foreground ring-1 ring-border",
    iconWrap: "bg-primary/10 text-primary",
    icon: User,
  }
}

export function TeamSection() {
  const { t } = useLanguage()
  const [showAllMembers, setShowAllMembers] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const firstGroupRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const offsetRef = useRef(0)
  const pausedRef = useRef(false)
  const sortedMembers = [...t.team.members].sort((a, b) => {
    const order = { Owner: 0, "Co-Owner": 1, "Trusted Member": 2 }
    const roleA = order[a.role as keyof typeof order] ?? 99
    const roleB = order[b.role as keyof typeof order] ?? 99

    if (roleA !== roleB) {
      return roleA - roleB
    }

    return a.name.localeCompare(b.name)
  })

  const renderMemberCard = (
    member: (typeof t.team.members)[number],
    key: string,
    compact = false,
  ) => {
    const styles = getRoleStyles(member.role)
    const RoleIcon = styles.icon
    const isFeaturedMember = member.name === "Rollin Noodle"

    return (
      <div
        key={key}
        className={`group relative rounded-3xl border p-7 text-center transition-transform duration-300 hover:-translate-y-1 ${styles.card} ${
          compact ? "min-h-[320px]" : "min-h-[360px]"
        } ${!compact ? "w-[300px] shrink-0 sm:min-h-[390px] sm:w-[340px]" : "sm:min-h-[360px]"} ${
          isFeaturedMember
            ? "border-primary/80 bg-[radial-gradient(circle_at_top,_rgba(255,215,90,0.24),_transparent_52%),linear-gradient(180deg,rgba(255,215,90,0.1),rgba(255,255,255,0.02))] shadow-[0_24px_90px_rgba(255,215,90,0.2)]"
            : ""
        }`}
      >
        {isFeaturedMember ? (
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        ) : null}
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${styles.badge}`}>
            {member.role}
          </span>
          {isFeaturedMember ? (
            <div className="rounded-full bg-primary/15 p-2 text-primary ring-1 ring-primary/30">
              <Star className="h-4 w-4 fill-current" />
            </div>
          ) : (
            <div className={`rounded-full p-2 ${styles.iconWrap}`}>
              <RoleIcon className="h-4 w-4" />
            </div>
          )}
        </div>

        <div
          className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full ${styles.iconWrap} ${
            isFeaturedMember ? "ring-4 ring-primary/20 shadow-[0_0_40px_rgba(255,215,90,0.18)]" : ""
          }`}
        >
          {isFeaturedMember ? <Star className="h-11 w-11 fill-current" /> : <RoleIcon className="h-11 w-11" />}
        </div>

        <h3 className={`mb-2 text-xl font-semibold ${isFeaturedMember ? "text-primary" : "text-foreground"}`}>{member.name}</h3>
        <p className="text-sm leading-7 text-muted-foreground sm:text-base">{member.description}</p>
      </div>
    )
  }

  useEffect(() => {
    const track = trackRef.current
    const firstGroup = firstGroupRef.current

    if (showAllMembers || !track || !firstGroup) return

    let lastTimestamp = 0
    let groupWidth = firstGroup.getBoundingClientRect().width
    const speed = 62

    const updateWidth = () => {
      groupWidth = firstGroup.getBoundingClientRect().width
    }

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp
      const delta = (timestamp - lastTimestamp) / 1000
      lastTimestamp = timestamp

      if (!pausedRef.current && groupWidth > 0) {
        offsetRef.current -= speed * delta
        if (Math.abs(offsetRef.current) >= groupWidth) {
          offsetRef.current += groupWidth
        }
        track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
      }

      frameRef.current = window.requestAnimationFrame(animate)
    }

    updateWidth()
    offsetRef.current = 0
    track.style.transform = "translate3d(0, 0, 0)"

    const resizeObserver = new ResizeObserver(updateWidth)
    resizeObserver.observe(firstGroup)

    frameRef.current = window.requestAnimationFrame(animate)

    return () => {
      resizeObserver.disconnect()
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [showAllMembers, t.team.members])

  return (
    <section id="team" className="bg-secondary/30 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center lg:mb-16">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">{t.team.eyebrow}</span>
          <h2 className="mt-2 mb-4 text-3xl font-bold text-foreground sm:text-4xl">{t.team.title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">{t.team.subtitle}</p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-card/80 p-1 shadow-sm backdrop-blur">
            <button
              type="button"
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Slider
            </button>
            <button
              type="button"
              onClick={() => setShowAllMembers(true)}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Alle anzeigen
            </button>
          </div>
        </div>
      </div>

      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-secondary/95 to-transparent sm:w-28 lg:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-secondary/95 to-transparent sm:w-28 lg:w-40" />

        <div
          ref={trackRef}
          className="flex w-max gap-6 px-4 will-change-transform sm:px-6 lg:px-8"
          onMouseEnter={() => {
            pausedRef.current = true
          }}
          onMouseLeave={() => {
            pausedRef.current = false
          }}
        >
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              ref={groupIndex === 0 ? firstGroupRef : undefined}
              className="flex flex-none gap-6 pr-6"
            >
              {sortedMembers.map((member, index) => renderMemberCard(member, `${groupIndex}-${member.name}-${member.role}-${index}`))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">{t.team.interest}</p>
          <a href="#contact" className="inline-flex items-center gap-2 text-primary hover:underline">
            {t.team.contactLink}
            <span>→</span>
          </a>
        </div>
      </div>

      <Dialog open={showAllMembers} onOpenChange={setShowAllMembers}>
        <DialogContent className="max-h-[88vh] overflow-hidden border-border bg-card/92 p-0 shadow-2xl backdrop-blur-xl sm:max-w-6xl">
          <DialogHeader className="border-b border-border px-6 py-5">
            <DialogTitle>{t.team.title}</DialogTitle>
            <DialogDescription>
              Alle Team-Mitglieder auf einen Blick.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[calc(88vh-5.5rem)] overflow-y-auto px-6 py-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {sortedMembers.map((member, index) => renderMemberCard(member, `modal-${member.name}-${member.role}-${index}`, true))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
