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

export const SAMPLE_MODS: ModItem[] = []
