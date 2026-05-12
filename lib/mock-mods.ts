import type { SaveEdit, LocalMod, Mod } from './mods'

// Mock data for development and preview
export const mockSaveEdits: SaveEdit[] = [
  {
    id: 'se-1',
    category: 'save-edit',
    title: 'Scania R-Series Chrome Package',
    description: 'Premium chrome parts for Scania R-Series trucks. Includes bumper, mirrors, and exhaust stacks. Perfect for players who want their truck to stand out on the road.',
    images: ['/placeholder.svg?height=400&width=600'],
    type: 'Truck Part',
    brand: 'Scania',
    txtFileUrl: '#',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'se-2',
    category: 'save-edit',
    title: 'Volvo FH16 Full Tuning',
    description: 'Complete tuning package for Volvo FH16. Engine upgrade, custom interior, and exterior modifications. Tested and working with latest game version.',
    images: ['/placeholder.svg?height=400&width=600'],
    type: 'Full Truck',
    brand: 'Volvo',
    txtFileUrl: '#',
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: 'se-3',
    category: 'save-edit',
    title: 'Krone Profi Liner Skin Pack',
    description: 'Collection of realistic company skins for Krone Profi Liner trailer. Includes DHL, UPS, and custom designs.',
    images: ['/placeholder.svg?height=400&width=600'],
    type: 'Full Trailer',
    brand: 'Krone',
    txtFileUrl: '#',
    createdAt: Date.now() - 86400000 * 7,
  },
  {
    id: 'se-4',
    category: 'save-edit',
    title: 'Mercedes Actros MP5 Lights',
    description: 'Enhanced lighting configuration for Mercedes Actros MP5. LED bars, beacon lights, and custom headlight setup.',
    images: ['/placeholder.svg?height=400&width=600'],
    type: 'Truck Part',
    brand: 'Mercedes-Benz',
    txtFileUrl: '#',
    createdAt: Date.now() - 86400000 * 10,
  },
]

export const mockLocalMods: LocalMod[] = [
  {
    id: 'lm-1',
    category: 'local-mod',
    title: 'Realistic Physics Overhaul',
    description: 'Complete physics rework for more realistic truck handling. Improved suspension, braking, and steering response. Compatible with all truck brands.',
    images: ['/placeholder.svg?height=400&width=600'],
    type: 'Cargo',
    brand: null,
    downloadUrl: '#',
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'lm-2',
    category: 'local-mod',
    title: 'DAF XG+ Complete Truck',
    description: 'High-quality DAF XG+ model with custom interior, detailed dashboard, and multiple chassis options. Includes various accessories and customization options.',
    images: ['/placeholder.svg?height=400&width=600'],
    type: 'Full Truck',
    brand: 'DAF',
    downloadUrl: '#',
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'lm-3',
    category: 'local-mod',
    title: 'Schmitz Cargobull Reefer Pack',
    description: 'Refrigerated trailer pack with multiple configurations. Standalone version, no dependencies required. High-quality textures and realistic details.',
    images: ['/placeholder.svg?height=400&width=600'],
    type: 'Full Trailer',
    brand: 'Schmitz Cargobull',
    downloadUrl: '#',
    createdAt: Date.now() - 86400000 * 6,
  },
  {
    id: 'lm-4',
    category: 'local-mod',
    title: 'MAN TGX Euro 6 Accessories',
    description: 'Accessory pack for MAN TGX Euro 6. Includes sun visors, light bars, sideskirts, and various cabin accessories.',
    images: ['/placeholder.svg?height=400&width=600'],
    type: 'Truck Part',
    brand: 'MAN',
    downloadUrl: '#',
    createdAt: Date.now() - 86400000 * 8,
  },
]

export const mockMods: Mod[] = [...mockSaveEdits, ...mockLocalMods]

// Helper to get mock data by category
export function getMockMods(category?: 'save-edit' | 'local-mod'): Mod[] {
  if (category === 'save-edit') return mockSaveEdits
  if (category === 'local-mod') return mockLocalMods
  return mockMods
}
