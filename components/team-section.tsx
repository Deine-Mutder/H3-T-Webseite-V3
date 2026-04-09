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
  const { t, language } = useLanguage()
  const [showAllMembers, setShowAllMembers] = useState(false)
  const [selectedMember, setSelectedMember] = useState<(typeof t.team.members)[number] | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const firstGroupRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const offsetRef = useRef(0)
  const pausedRef = useRef(false)
  const truckersMpLinks: Record<string, string> = {
    "The real Plumz": "https://truckersmp.com/user/5814945",
    "eaglefire1231 (Riley)": "https://truckersmp.com/user/5555520",
    "Rollin Noodle": "https://truckersmp.com/user/5917509",
    Ruxery: "https://truckersmp.com/user/3718196",
    Longyin: "https://truckersmp.com/user/5814798",
    "Red Hornet4953": "https://truckersmp.com/user/5908755",
    "Emme [GCGS]": "https://truckersmp.com/user/4550080",
    VankataTruckerBG: "https://truckersmp.com/user/4780614",
    Itzz_mxx: "https://truckersmp.com/user/5540080",
    Sheldom_C: "https://truckersmp.com/user/5452054",
    Snotra: "https://truckersmp.com/user/1591428",
    _TBF_: "https://truckersmp.com/user/5936343",
    damiangamer19: "https://truckersmp.com/user/3464277",
  }
  const profileText =
    language === "de"
      ? {
          openProfile: "Profil öffnen",
          showTruckersMp: "TruckersMP Profil anzeigen",
          missingTruckersMp: "Link folgt später",
        }
      : language === "sl"
        ? {
            openProfile: "Odpri profil",
            showTruckersMp: "Prikazi TruckersMP profil",
            missingTruckersMp: "Povezava sledi pozneje",
          }
        : language === "fr"
          ? {
              openProfile: "Ouvrir le profil",
              showTruckersMp: "Afficher le profil TruckersMP",
              missingTruckersMp: "Lien a venir plus tard",
            }
          : language === "es"
            ? {
                openProfile: "Abrir perfil",
                showTruckersMp: "Mostrar perfil de TruckersMP",
                missingTruckersMp: "Enlace disponible mas tarde",
              }
            : language === "it"
              ? {
                  openProfile: "Apri profilo",
                  showTruckersMp: "Mostra profilo TruckersMP",
                  missingTruckersMp: "Link disponibile piu tardi",
                }
              : language === "pl"
                ? {
                    openProfile: "Otworz profil",
                    showTruckersMp: "Pokaz profil TruckersMP",
                    missingTruckersMp: "Link zostanie dodany pozniej",
                  }
                : language === "tr"
                  ? {
                      openProfile: "Profili ac",
                      showTruckersMp: "TruckersMP profilini goster",
                      missingTruckersMp: "Baglanti daha sonra eklenecek",
                    }
                  : language === "zh"
                    ? {
                        openProfile: "打开资料",
                        showTruckersMp: "查看 TruckersMP 资料",
                        missingTruckersMp: "链接稍后添加",
                      }
                    : language === "ru"
                      ? {
                          openProfile: "Открыть профиль",
                          showTruckersMp: "Открыть профиль TruckersMP",
                          missingTruckersMp: "Ссылка будет добавлена позже",
                        }
                      : {
                          openProfile: "Open profile",
                          showTruckersMp: "Show TruckersMP profile",
                          missingTruckersMp: "Link coming later",
                        }
  const selectedMemberLink = selectedMember ? truckersMpLinks[selectedMember.name] : undefined
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
        role="button"
        tabIndex={0}
        onClick={() => setSelectedMember(member)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            setSelectedMember(member)
          }
        }}
        className={`group relative rounded-3xl border p-7 text-center transition-transform duration-300 hover:-translate-y-1 ${styles.card} ${
          compact ? "min-h-[320px]" : "min-h-[360px]"
        } ${!compact ? "w-[300px] shrink-0 sm:min-h-[390px] sm:w-[340px]" : "sm:min-h-[360px]"} ${
          isFeaturedMember
            ? "border-primary/80 bg-[radial-gradient(circle_at_top,_rgba(255,215,90,0.24),_transparent_52%),linear-gradient(180deg,rgba(255,215,90,0.1),rgba(255,255,255,0.02))] shadow-[0_24px_90px_rgba(255,215,90,0.2)]"
            : ""
        } cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50`}
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
        <div className="mt-6 inline-flex rounded-full border border-border bg-background/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-foreground">
          {profileText.openProfile}
        </div>
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
    <section id="team" data-tutorial-id="team" className="bg-secondary/30 py-20 lg:py-24">
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
              {t.team.sliderLabel}
            </button>
            <button
              type="button"
              onClick={() => setShowAllMembers(true)}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.team.showAllLabel}
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
            <span>{"\u2192"}</span>
          </a>
        </div>
      </div>

      <Dialog open={showAllMembers} onOpenChange={setShowAllMembers}>
        <DialogContent className="max-h-[88vh] overflow-hidden border-border bg-card/92 p-0 shadow-2xl backdrop-blur-xl sm:max-w-6xl">
          <DialogHeader className="border-b border-border px-6 py-5">
            <DialogTitle>{t.team.title}</DialogTitle>
            <DialogDescription>{t.team.dialogDescription}</DialogDescription>
          </DialogHeader>

          <div className="max-h-[calc(88vh-5.5rem)] overflow-y-auto px-6 py-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {sortedMembers.map((member, index) => renderMemberCard(member, `modal-${member.name}-${member.role}-${index}`, true))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedMember !== null} onOpenChange={(open) => (!open ? setSelectedMember(null) : null)}>
        <DialogContent className="border-border bg-card/95 p-0 shadow-2xl backdrop-blur-xl sm:max-w-2xl">
          {selectedMember ? (
            <div className="overflow-hidden rounded-[1.75rem] border border-primary/20 bg-[radial-gradient(circle_at_top,_rgba(255,215,90,0.22),_transparent_44%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]">
              <div className="relative px-6 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8">
                <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(255,215,90,0.26),_transparent_65%)]" />

                <div className="relative mx-auto flex max-w-md flex-col items-center text-center">
                  <div className="mb-6 flex h-40 w-full items-center justify-center rounded-[2rem] border border-primary/25 bg-[linear-gradient(180deg,rgba(255,215,90,0.16),rgba(17,17,17,0.3))] shadow-[0_20px_60px_rgba(255,215,90,0.12)] sm:h-48">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border border-primary/35 bg-background/70 shadow-[0_0_35px_rgba(255,215,90,0.18)] sm:h-32 sm:w-32">
                      <Star className="h-12 w-12 text-primary sm:h-14 sm:w-14" />
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-foreground sm:text-4xl">{selectedMember.name}</h3>
                  <p className="mt-3 inline-flex rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {selectedMember.role}
                  </p>

                  <div className="mt-6 w-full rounded-3xl border border-border bg-background/60 p-5 text-left sm:p-6">
                    <p className="text-base leading-8 text-muted-foreground sm:text-lg">{selectedMember.description}</p>
                  </div>

                  <div className="mt-6 w-full border-t border-border/70 pt-6">
                    {selectedMemberLink ? (
                      <a
                        href={selectedMemberLink}
                        target="_blank"
                        rel="noreferrer"
                        className="block w-full rounded-2xl bg-primary px-6 py-4 text-center text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        {profileText.showTruckersMp}
                      </a>
                    ) : (
                      <>
                        <button
                          type="button"
                          disabled
                          className="w-full rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground opacity-70"
                        >
                          {profileText.showTruckersMp}
                        </button>
                        <p className="mt-3 text-sm text-muted-foreground">{profileText.missingTruckersMp}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}
