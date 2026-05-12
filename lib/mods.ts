import { redis } from './redis'

// Mod Types
export type ModType = 'Full Truck' | 'Full Trailer' | 'Truck Part' | 'Trailer Part' | 'Cargo'

export type TruckBrand = 'DAF' | 'Iveco' | 'MAN' | 'Mercedes-Benz' | 'Renault' | 'Scania' | 'Volvo'

export type TrailerBrand = 
  | 'Kögel' 
  | 'Krone' 
  | 'Schmitz Cargobull' 
  | 'Schwarzmüller' 
  | 'Tirsan' 
  | 'Wielton' 
  | 'Feldbinder' 
  | 'Kässbohrer'

export type ModCategory = 'save-edit' | 'local-mod'

export interface BaseMod {
  id: string
  title: string
  description: string
  images: string[]
  type: ModType
  brand: TruckBrand | TrailerBrand | null
  createdAt: number
}

export interface SaveEdit extends BaseMod {
  category: 'save-edit'
  txtFileUrl: string
}

export interface LocalMod extends BaseMod {
  category: 'local-mod'
  downloadUrl: string
}

export type Mod = SaveEdit | LocalMod

// Brand mapping based on mod type
export const TRUCK_TYPES: ModType[] = ['Full Truck', 'Truck Part']
export const TRAILER_TYPES: ModType[] = ['Full Trailer', 'Trailer Part']

export const TRUCK_BRANDS: TruckBrand[] = [
  'DAF',
  'Iveco',
  'MAN',
  'Mercedes-Benz',
  'Renault',
  'Scania',
  'Volvo',
]

export const TRAILER_BRANDS: TrailerBrand[] = [
  'Kögel',
  'Krone',
  'Schmitz Cargobull',
  'Schwarzmüller',
  'Tirsan',
  'Wielton',
  'Feldbinder',
  'Kässbohrer',
]

export const ALL_MOD_TYPES: ModType[] = [
  'Full Truck',
  'Full Trailer',
  'Truck Part',
  'Trailer Part',
  'Cargo',
]

// Helper to get applicable brands for a mod type
export function getBrandsForType(type: ModType): (TruckBrand | TrailerBrand)[] {
  if (TRUCK_TYPES.includes(type)) {
    return TRUCK_BRANDS
  }
  if (TRAILER_TYPES.includes(type)) {
    return TRAILER_BRANDS
  }
  // Cargo has no specific brand
  return []
}

// Redis keys
const SAVE_EDITS_KEY = 'mods:save-edits'
const LOCAL_MODS_KEY = 'mods:local-mods'

function getKeyForCategory(category: ModCategory): string {
  return category === 'save-edit' ? SAVE_EDITS_KEY : LOCAL_MODS_KEY
}

// CRUD Operations
export async function getMods(category?: ModCategory): Promise<Mod[]> {
  if (category) {
    const key = getKeyForCategory(category)
    const mods = await redis.lrange<Mod>(key, 0, -1)
    return mods || []
  }
  
  // Get all mods from both categories
  const [saveEdits, localMods] = await Promise.all([
    redis.lrange<SaveEdit>(SAVE_EDITS_KEY, 0, -1),
    redis.lrange<LocalMod>(LOCAL_MODS_KEY, 0, -1),
  ])
  
  return [...(saveEdits || []), ...(localMods || [])]
}

export async function addMod(mod: Mod): Promise<void> {
  const key = getKeyForCategory(mod.category)
  await redis.lpush(key, mod)
}

export async function deleteMod(id: string, category: ModCategory): Promise<void> {
  const key = getKeyForCategory(category)
  const mods = await redis.lrange<Mod>(key, 0, -1)
  const filtered = (mods || []).filter((mod) => mod.id !== id)
  await redis.del(key)
  for (const mod of filtered.reverse()) {
    await redis.lpush(key, mod)
  }
}

// Filter helpers
export interface ModFilter {
  category?: ModCategory
  type?: ModType
  brand?: TruckBrand | TrailerBrand
  search?: string
}

export function filterMods(mods: Mod[], filter: ModFilter): Mod[] {
  return mods.filter((mod) => {
    if (filter.category && mod.category !== filter.category) return false
    if (filter.type && mod.type !== filter.type) return false
    if (filter.brand && mod.brand !== filter.brand) return false
    if (filter.search) {
      const searchLower = filter.search.toLowerCase()
      const titleMatch = mod.title.toLowerCase().includes(searchLower)
      const descMatch = mod.description.toLowerCase().includes(searchLower)
      if (!titleMatch && !descMatch) return false
    }
    return true
  })
}
