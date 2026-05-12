"use client"

import { useState } from "react"
import { Download, Calendar, Tag, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import type { Mod } from "@/lib/mods"

interface ModCardProps {
  mod: Mod
  translations: {
    download: string
    downloadTxt: string
  }
}

export function ModCard({ mod, translations }: ModCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("de-DE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const downloadUrl = mod.category === "save-edit" ? mod.txtFileUrl : mod.downloadUrl
  const downloadLabel = mod.category === "save-edit" ? translations.downloadTxt : translations.download

  return (
    <>
      {/* Card */}
      <article
        onClick={() => setDialogOpen(true)}
        className="glow-card holo-card group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/50"
      >
        {/* Image */}
        {mod.images.length > 0 && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={mod.images[0]}
              alt={mod.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute left-3 top-3">
              <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                {mod.category === "save-edit" ? "Save Edit" : "Local Mod"}
              </Badge>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          {/* Type & Brand Badges */}
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge variant="outline" className="border-primary/30 text-primary">
              <Tag className="mr-1 h-3 w-3" />
              {mod.type}
            </Badge>
            {mod.brand && (
              <Badge variant="outline" className="border-accent/30 text-accent">
                <Truck className="mr-1 h-3 w-3" />
                {mod.brand}
              </Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="mb-2 text-lg font-bold tracking-wide text-foreground transition-colors group-hover:text-primary">
            {mod.title}
          </h3>

          {/* Description Preview */}
          <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {mod.description}
          </p>

          {/* Date */}
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span className="font-mono">{formatDate(mod.createdAt)}</span>
          </div>
        </div>

        {/* Decorative corner */}
        <div
          className="absolute right-0 top-0 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, transparent 50%, color-mix(in oklab, var(--primary) 20%, transparent) 50%)",
          }}
        />
      </article>

      {/* Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden border-border bg-card p-0">
          {/* Image Carousel */}
          {mod.images.length > 0 && (
            <div className="relative h-64 w-full overflow-hidden sm:h-80">
              <img
                src={mod.images[currentImageIndex]}
                alt={mod.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              
              {/* Image Navigation Dots */}
              {mod.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                  {mod.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageIndex(index)
                      }}
                      className={`h-2 w-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "w-6 bg-primary"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Category Badge */}
              <div className="absolute left-4 top-4">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                  {mod.category === "save-edit" ? "Save Edit" : "Local Mod"}
                </Badge>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            <DialogHeader className="mb-4">
              {/* Type & Brand Badges */}
              <div className="mb-3 flex flex-wrap gap-2">
                <Badge variant="outline" className="border-primary/30 text-primary">
                  <Tag className="mr-1 h-3 w-3" />
                  {mod.type}
                </Badge>
                {mod.brand && (
                  <Badge variant="outline" className="border-accent/30 text-accent">
                    <Truck className="mr-1 h-3 w-3" />
                    {mod.brand}
                  </Badge>
                )}
              </div>

              <DialogTitle className="text-2xl font-bold tracking-wide text-foreground">
                {mod.title}
              </DialogTitle>

              {/* Date */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span className="font-mono">{formatDate(mod.createdAt)}</span>
              </div>
            </DialogHeader>

            {/* Full Description */}
            <DialogDescription asChild>
              <div className="max-h-[30vh] overflow-y-auto pr-2 text-base leading-relaxed text-muted-foreground">
                {mod.description.split("\n").map((paragraph, i) => (
                  <p key={i} className={i > 0 ? "mt-4" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </DialogDescription>

            {/* Download Button */}
            {downloadUrl && downloadUrl !== "#" && (
              <div className="mt-6">
                <Button asChild className="w-full sm:w-auto">
                  <a href={downloadUrl} download target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    {downloadLabel}
                  </a>
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
