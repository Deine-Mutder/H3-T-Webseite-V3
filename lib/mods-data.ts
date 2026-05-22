export const MOD_TYPES = ["Truck", "Trailer", "Truck Parts", "Trailer Parts"] as const

export type ModType = (typeof MOD_TYPES)[number]

export const MOD_BRANDS = [
  "Scania",
  "Volvo",
  "Mercedes-Benz",
  "MAN",
  "DAF",
  "Renault",
  "Iveco",
  "Krone",
  "Schmitz Cargobull",
  "Schwarzmuller",
  "H3T",
] as const

export type ModBrand = (typeof MOD_BRANDS)[number]

export type ModKind = "save-edit" | "local-mod"

export type ModItem = {
  id: string
  kind: ModKind
  title: string
  description: string
  type: ModType
  brand: ModBrand
  imageUrls: string[]
  downloadUrl: string
  fileName?: string
  createdAt: number
}

export const MOD_KIND_LABELS: Record<ModKind, string> = {
  "save-edit": "Save Edits",
  "local-mod": "Local Mods",
}

export const SAMPLE_MODS: ModItem[] = [
  {
    id: "sample-save-scania-triple",
    kind: "save-edit",
    title: "Scania Triple Save Setup",
    description:
      "Vorbereitetes Save-Edit-Setup fuer einen stabilen Scania Triple Trailer Aufbau mit sauber getaggten Trailer-Positionen.",
    type: "Truck",
    brand: "Scania",
    imageUrls: ["/scania-bg.png", "/triple-trailers/bobcat-overview.svg", "/placeholder.jpg"],
    downloadUrl: "/downloads/h3t-save-edit-example.txt",
    fileName: "h3t-scania-triple.txt",
    createdAt: 1716200000000,
  },
  {
    id: "sample-save-krone-cargo",
    kind: "save-edit",
    title: "Krone Cargo Trailer Edit",
    description:
      "Save Edit fuer Krone Trailer-Konfigurationen mit Fokus auf Cargo-Auswahl und DLC-unabhaengige Test-Setups.",
    type: "Trailer",
    brand: "Krone",
    imageUrls: ["/triple-trailers/botcat-dlc.png", "/placeholder.jpg"],
    downloadUrl: "/downloads/h3t-save-edit-example.txt",
    fileName: "h3t-krone-cargo.txt",
    createdAt: 1716100000000,
  },
  {
    id: "sample-local-volvo-lightbar",
    kind: "local-mod",
    title: "Volvo Lightbar Pack",
    description:
      "Lokales Mod-Paket fuer dezente Volvo-Anbauteile und eine klare VTC-Optik ohne ueberladene Fahrzeugfront.",
    type: "Truck Parts",
    brand: "Volvo",
    imageUrls: ["/placeholder.jpg", "/scania-bg.png"],
    downloadUrl: "/downloads/h3t-local-mod-link.txt",
    createdAt: 1716000000000,
  },
  {
    id: "sample-local-schmitz-trailer",
    kind: "local-mod",
    title: "Schmitz Trailer Details",
    description:
      "Local Mod fuer Trailer-Details, Seitenmarkierungen und passende Bauteile fuer schlichte H3T-Konvois.",
    type: "Trailer Parts",
    brand: "Schmitz Cargobull",
    imageUrls: ["/triple-trailers/bobcat-overview.svg", "/placeholder.jpg", "/triple-trailers/botcat-dlc.png"],
    downloadUrl: "/downloads/h3t-local-mod-link.txt",
    createdAt: 1715900000000,
  },
]
