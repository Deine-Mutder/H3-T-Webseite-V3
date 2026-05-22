"use client"

import { useEffect, useMemo, useState } from "react"
import { Download, FileText, ImageIcon, Package, RotateCcw, SlidersHorizontal } from "lucide-react"
import { MOD_BRANDS, MOD_TYPES, SAMPLE_MODS, type ModBrand, type ModItem, type ModKind, type ModType } from "@/lib/mods-data"
import { useLanguage } from "@/context/language-context"
import { getModsPageCopy } from "@/lib/localized-copy"
import { cn } from "@/lib/utils"

type TypeFilter = "All" | ModType
type BrandFilter = "All" | ModBrand

const MOD_KINDS: ModKind[] = ["save-edit", "local-mod"]

export function ModsBrowser() {
  const { language } = useLanguage()
  const copy = getModsPageCopy(language)
  const [mods, setMods] = useState<ModItem[]>(SAMPLE_MODS)
  const [activeKind, setActiveKind] = useState<ModKind>("save-edit")
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All")
  const [brandFilter, setBrandFilter] = useState<BrandFilter>("All")
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState("")

  useEffect(() => {
    let isMounted = true

    const loadMods = async () => {
      try {
        const response = await fetch("/api/mods", { cache: "no-store" })
        if (!response.ok) {
          throw new Error("mods-load-failed")
        }

        const data = (await response.json()) as { mods?: ModItem[] }
        if (isMounted && data.mods?.length) {
          setMods([...data.mods, ...SAMPLE_MODS])
        }
      } catch {
        if (isMounted) {
          setFetchError(getModsPageCopy(language).fetchError)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadMods()

    return () => {
      isMounted = false
    }
  }, [language])

  const kindCounts = useMemo(
    () =>
      MOD_KINDS.reduce<Record<ModKind, number>>(
        (counts, kind) => ({
          ...counts,
          [kind]: mods.filter((mod) => mod.kind === kind).length,
        }),
        { "save-edit": 0, "local-mod": 0 },
      ),
    [mods],
  )

  const filteredMods = useMemo(
    () =>
      mods.filter((mod) => {
        const matchesKind = mod.kind === activeKind
        const matchesType = typeFilter === "All" || mod.type === typeFilter
        const matchesBrand = brandFilter === "All" || mod.brand === brandFilter

        return matchesKind && matchesType && matchesBrand
      }),
    [activeKind, brandFilter, mods, typeFilter],
  )

  const resetFilters = () => {
    setTypeFilter("All")
    setBrandFilter("All")
  }

  return (
    <section className="pb-20">
      <div className="mb-8 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-2">
        {MOD_KINDS.map((kind) => {
          const isActive = activeKind === kind
          const Icon = kind === "save-edit" ? FileText : Package

          return (
            <button
              key={kind}
              type="button"
              onClick={() => setActiveKind(kind)}
              className={cn(
                "group relative flex min-h-32 items-center justify-between overflow-hidden bg-card p-6 text-left transition-all hover:bg-secondary",
                isActive && "bg-secondary",
              )}
              style={{
                boxShadow: isActive
                  ? "inset 0 0 0 1px color-mix(in oklab, var(--primary) 55%, transparent)"
                  : undefined,
              }}
            >
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center border"
                    style={{
                      borderColor: isActive
                        ? "color-mix(in oklab, var(--primary) 60%, transparent)"
                        : "var(--border)",
                      background: "color-mix(in oklab, var(--primary) 8%, transparent)",
                    }}
                  >
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
                    {kindCounts[kind]} {copy.items}
                  </span>
                </div>
                <h2 className="display-heading text-3xl text-foreground sm:text-4xl">{copy.kindLabels[kind]}</h2>
              </div>
              <span
                className={cn(
                  "h-3 w-3 rounded-full border transition-all",
                  isActive ? "scale-125 bg-primary shadow-[0_0_18px_var(--primary)]" : "bg-transparent",
                )}
              />
            </button>
          )
        })}
      </div>

      <div className="mb-8 grid gap-4 border border-border bg-card p-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <div className="space-y-2">
          <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            {copy.type}
          </label>
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value as TypeFilter)}
            className="h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
          >
            <option value="All">{copy.allTypes}</option>
            {MOD_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">{copy.brand}</label>
          <select
            value={brandFilter}
            onChange={(event) => setBrandFilter(event.target.value as BrandFilter)}
            className="h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
          >
            <option value="All">{copy.allBrands}</option>
            {MOD_BRANDS.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="btn-wipe flex h-11 items-center justify-center gap-2 border border-border px-4 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.2em" }}
        >
          <RotateCcw className="h-4 w-4" />
          {copy.reset}
        </button>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <p>
          {filteredMods.length} {filteredMods.length === 1 ? copy.oneEntry : copy.manyEntries} {copy.inLabel}{" "}
          <span className="text-primary">{copy.kindLabels[activeKind]}</span>
        </p>
        {isLoading && <p className="font-mono text-xs uppercase tracking-[0.18em]">{copy.loading}</p>}
        {fetchError && !isLoading && <p className="text-xs text-muted-foreground/80">{fetchError}</p>}
      </div>

      {filteredMods.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredMods.map((mod) => (
            <ModCard key={mod.id} mod={mod} copy={copy} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-72 flex-col items-center justify-center border border-border bg-card p-8 text-center">
          <Package className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="display-heading text-2xl text-foreground">{copy.noResultsTitle}</h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">{copy.noResultsText}</p>
        </div>
      )}
    </section>
  )
}

function ModCard({ mod, copy }: { mod: ModItem; copy: ReturnType<typeof getModsPageCopy> }) {
  const galleryImages = mod.imageUrls.slice(0, 3)
  const isExternalDownload = /^https?:\/\//.test(mod.downloadUrl)

  return (
    <article className="glow-card clip-card group flex min-h-full flex-col overflow-hidden">
      <div className="grid h-44 grid-cols-3 gap-px bg-border">
        {galleryImages.length > 0 ? (
          galleryImages.map((imageUrl, index) => (
            <div
              key={`${mod.id}-${imageUrl}`}
              className={cn("overflow-hidden bg-background", galleryImages.length === 1 && "col-span-3")}
            >
              <img
                src={imageUrl}
                alt={copy.imageAlt(mod.title, index + 1)}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))
        ) : (
          <div className="col-span-3 flex items-center justify-center bg-background">
            <ImageIcon className="h-10 w-10 text-muted-foreground/50" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="border border-primary/30 bg-primary/10 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary">
            {mod.type}
          </span>
          <span className="border border-border bg-background px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
            {mod.brand}
          </span>
        </div>

        <h3 className="display-heading text-2xl text-foreground transition-colors group-hover:text-primary">
          {mod.title}
        </h3>
        <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-muted-foreground">{mod.description}</p>

        <a
          href={mod.downloadUrl}
          target={isExternalDownload ? "_blank" : undefined}
          rel={isExternalDownload ? "noreferrer" : undefined}
          download={mod.kind === "save-edit" ? mod.fileName || "save-edit.txt" : undefined}
          className="btn-wipe mt-6 flex items-center justify-center gap-2 border border-border px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.2em" }}
        >
          <Download className="h-4 w-4" />
          {copy.download}
        </a>
      </div>
    </article>
  )
}
