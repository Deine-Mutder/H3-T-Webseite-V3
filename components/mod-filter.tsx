"use client"

import { useCallback, useMemo, useState } from "react"
import { Filter, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ALL_MOD_TYPES,
  TRUCK_BRANDS,
  TRAILER_BRANDS,
  TRUCK_TYPES,
  TRAILER_TYPES,
  getBrandsForType,
  type ModType,
  type TruckBrand,
  type TrailerBrand,
} from "@/lib/mods"

interface ModFilterProps {
  onFilterChange: (filter: {
    type?: ModType
    brand?: TruckBrand | TrailerBrand
    search?: string
  }) => void
  translations: {
    allTypes: string
    allBrands: string
    searchPlaceholder: string
    clearFilters: string
    filterLabel: string
  }
}

export function ModFilter({ onFilterChange, translations }: ModFilterProps) {
  const [selectedType, setSelectedType] = useState<ModType | "">("")
  const [selectedBrand, setSelectedBrand] = useState<TruckBrand | TrailerBrand | "">("")
  const [searchQuery, setSearchQuery] = useState("")

  // Get available brands based on selected type
  const availableBrands = useMemo(() => {
    if (!selectedType) {
      // Show all brands when no type selected
      return [...TRUCK_BRANDS, ...TRAILER_BRANDS]
    }
    return getBrandsForType(selectedType)
  }, [selectedType])

  // Determine if brand selection should be disabled
  const isBrandDisabled = selectedType === "Cargo"

  const updateFilters = useCallback(
    (updates: {
      type?: ModType | ""
      brand?: TruckBrand | TrailerBrand | ""
      search?: string
    }) => {
      const newType = updates.type !== undefined ? updates.type : selectedType
      const newBrand = updates.brand !== undefined ? updates.brand : selectedBrand
      const newSearch = updates.search !== undefined ? updates.search : searchQuery

      onFilterChange({
        type: newType || undefined,
        brand: newBrand || undefined,
        search: newSearch || undefined,
      })
    },
    [selectedType, selectedBrand, searchQuery, onFilterChange]
  )

  const handleTypeChange = (value: string) => {
    const newType = value === "all" ? "" : (value as ModType)
    setSelectedType(newType)
    
    // Reset brand if the new type doesn't support the current brand
    let newBrand = selectedBrand
    if (newType === "Cargo" || (newType && !getBrandsForType(newType).includes(selectedBrand as never))) {
      newBrand = ""
      setSelectedBrand("")
    }
    
    updateFilters({ type: newType, brand: newBrand })
  }

  const handleBrandChange = (value: string) => {
    const newBrand = value === "all" ? "" : (value as TruckBrand | TrailerBrand)
    setSelectedBrand(newBrand)
    updateFilters({ brand: newBrand })
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    updateFilters({ search: value })
  }

  const clearFilters = () => {
    setSelectedType("")
    setSelectedBrand("")
    setSearchQuery("")
    onFilterChange({})
  }

  const hasActiveFilters = selectedType || selectedBrand || searchQuery

  return (
    <div className="mb-8 rounded-lg border border-border bg-card/50 p-4">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Filter className="h-4 w-4 text-primary" />
        {translations.filterLabel}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={translations.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Type Filter */}
        <Select value={selectedType || "all"} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={translations.allTypes} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{translations.allTypes}</SelectItem>
            {ALL_MOD_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Brand Filter */}
        <Select
          value={selectedBrand || "all"}
          onValueChange={handleBrandChange}
          disabled={isBrandDisabled}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={translations.allBrands} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{translations.allBrands}</SelectItem>
            {availableBrands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="shrink-0">
            <X className="mr-1 h-4 w-4" />
            {translations.clearFilters}
          </Button>
        )}
      </div>
    </div>
  )
}
