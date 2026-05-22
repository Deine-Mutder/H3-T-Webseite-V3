"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  FileText,
  Image as ImageIcon,
  LinkIcon,
  Loader2,
  Package,
  Trash2,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  MOD_BRANDS,
  MOD_KIND_LABELS,
  MOD_TYPES,
  type ModBrand,
  type ModItem,
  type ModKind,
  type ModType,
} from "@/lib/mods-data"

type ModFormState = {
  title: string
  description: string
  type: ModType
  brand: ModBrand
  images: File[]
  saveFile: File | null
  downloadLink: string
}

type FormStatus = {
  variant: "idle" | "success" | "error"
  message: string
}

const initialState: ModFormState = {
  title: "",
  description: "",
  type: "Truck",
  brand: "Scania",
  images: [],
  saveFile: null,
  downloadLink: "",
}

export function AdminModsUploadForms() {
  const [modsList, setModsList] = useState<ModItem[]>([])
  const [isLoadingMods, setIsLoadingMods] = useState(false)
  const [deletingModId, setDeletingModId] = useState<string | null>(null)

  const saveEdits = useMemo(() => modsList.filter((mod) => mod.kind === "save-edit"), [modsList])
  const localMods = useMemo(() => modsList.filter((mod) => mod.kind === "local-mod"), [modsList])

  useEffect(() => {
    fetchMods()
  }, [])

  const fetchMods = async () => {
    setIsLoadingMods(true)
    try {
      const response = await fetch("/api/mods")
      const data = (await response.json()) as { mods?: ModItem[] }
      setModsList(data.mods || [])
    } catch (error) {
      console.error("Error fetching mods:", error)
    } finally {
      setIsLoadingMods(false)
    }
  }

  const handleModCreated = (mod: ModItem) => {
    setModsList((current) => [mod, ...current])
  }

  const handleDeleteMod = async (mod: ModItem) => {
    if (!confirm(`${MOD_KIND_LABELS[mod.kind]}-Eintrag wirklich loeschen?`)) return

    setDeletingModId(mod.id)
    try {
      const storedAuth = sessionStorage.getItem("admin-auth")
      const response = await fetch("/api/mods", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: mod.id,
          downloadUrl: mod.downloadUrl,
          imageUrls: mod.imageUrls,
        }),
      })

      if (response.ok) {
        setModsList((current) => current.filter((item) => item.id !== mod.id))
      }
    } catch (error) {
      console.error("Error deleting mod:", error)
    } finally {
      setDeletingModId(null)
    }
  }

  return (
    <section className="mt-8 space-y-10">
      <div>
        <h2 className="text-2xl font-bold tracking-wide">Save Edits & Local Mods</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Uploads mit Typ, Marke, Bildern und Download-Ziel fuer die neue Mods-Seite.
        </p>
      </div>

      <ModManagementArea
        kind="save-edit"
        title="Save Edits"
        uploadDescription="Nur .txt-Dateien fuer Save-Edit Downloads."
        previewDescription="Verwalte bestehende Save-Edit Eintraege"
        emptyText="Noch keine Save Edits vorhanden"
        mods={saveEdits}
        isLoading={isLoadingMods}
        deletingId={deletingModId}
        onCreated={handleModCreated}
        onDelete={handleDeleteMod}
      />

      <ModManagementArea
        kind="local-mod"
        title="Local Mods"
        uploadDescription="Local Mods nutzen einen externen Download-Link statt lokaler ZIP-Uploads."
        previewDescription="Verwalte bestehende Local-Mod Eintraege"
        emptyText="Noch keine Local Mods vorhanden"
        mods={localMods}
        isLoading={isLoadingMods}
        deletingId={deletingModId}
        onCreated={handleModCreated}
        onDelete={handleDeleteMod}
      />
    </section>
  )
}

function ModManagementArea({
  kind,
  title,
  uploadDescription,
  previewDescription,
  emptyText,
  mods,
  isLoading,
  deletingId,
  onCreated,
  onDelete,
}: {
  kind: ModKind
  title: string
  uploadDescription: string
  previewDescription: string
  emptyText: string
  mods: ModItem[]
  isLoading: boolean
  deletingId: string | null
  onCreated: (mod: ModItem) => void
  onDelete: (mod: ModItem) => void
}) {
  const Icon = kind === "save-edit" ? FileText : Package

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-wide">{title}</h3>
          <p className="text-xs text-muted-foreground">Upload und Vorschau getrennt verwalten</p>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <ModUploadForm kind={kind} title={title} description={uploadDescription} onCreated={onCreated} />
        <ModPreviewPanel
          kind={kind}
          title={`Aktuelle ${title}`}
          description={previewDescription}
          emptyText={emptyText}
          mods={mods}
          isLoading={isLoading}
          deletingId={deletingId}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}

function ModUploadForm({
  kind,
  title,
  description,
  onCreated,
}: {
  kind: ModKind
  title: string
  description: string
  onCreated: (mod: ModItem) => void
}) {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [form, setForm] = useState<ModFormState>(initialState)
  const [previews, setPreviews] = useState<string[]>([])
  const [status, setStatus] = useState<FormStatus>({ variant: "idle", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [inputKey, setInputKey] = useState(0)
  const isSaveEdit = kind === "save-edit"
  const formId = `admin-${kind}`
  const Icon = isSaveEdit ? FileText : Package

  useEffect(() => {
    const nextPreviews = form.images.map((image) => URL.createObjectURL(image))
    setPreviews(nextPreviews)

    return () => {
      nextPreviews.forEach((preview) => URL.revokeObjectURL(preview))
    }
  }, [form.images])

  const updateField = <Key extends keyof ModFormState>(field: Key, value: ModFormState[Key]) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = Array.from(event.target.files || [])
    const limitedImages = selectedImages.slice(0, 3)
    updateField("images", limitedImages)

    if (selectedImages.length > 3) {
      setStatus({ variant: "error", message: "Es werden maximal 3 Bilder gespeichert." })
    } else {
      setStatus({ variant: "idle", message: "" })
    }
  }

  const handleSaveFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null

    if (file && !file.name.toLowerCase().endsWith(".txt")) {
      event.target.value = ""
      updateField("saveFile", null)
      setStatus({ variant: "error", message: "Save Edits duerfen nur .txt-Dateien sein." })
      return
    }

    updateField("saveFile", file)
    setStatus({ variant: "idle", message: "" })
  }

  const resetForm = () => {
    setForm(initialState)
    setStatus({ variant: "success", message: `${title} erfolgreich gespeichert.` })
    setInputKey((current) => current + 1)
    formRef.current?.reset()
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSaveEdit && !form.saveFile) {
      setStatus({ variant: "error", message: "Bitte eine .txt-Datei fuer den Save Edit auswaehlen." })
      return
    }

    if (!isSaveEdit && !form.downloadLink.trim()) {
      setStatus({ variant: "error", message: "Bitte einen Download-Link fuer den Local Mod eintragen." })
      return
    }

    setIsSubmitting(true)
    setStatus({ variant: "idle", message: "" })

    const formData = new FormData()
    formData.append("kind", kind)
    formData.append("title", form.title)
    formData.append("description", form.description)
    formData.append("type", form.type)
    formData.append("brand", form.brand)
    form.images.forEach((image) => formData.append("images", image))

    if (isSaveEdit && form.saveFile) {
      formData.append("saveFile", form.saveFile)
    }

    if (!isSaveEdit) {
      formData.append("downloadLink", form.downloadLink.trim())
    }

    try {
      const storedAuth = sessionStorage.getItem("admin-auth")
      const response = await fetch("/api/mods", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedAuth}`,
        },
        body: formData,
      })
      const data = (await response.json().catch(() => ({}))) as { error?: string; mod?: ModItem }

      if (!response.ok || !data.mod) {
        throw new Error(data.error || "Upload fehlgeschlagen")
      }

      resetForm()
      onCreated(data.mod)
    } catch (error) {
      setStatus({
        variant: "error",
        message: error instanceof Error ? error.message : "Upload fehlgeschlagen",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          {title} Upload
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor={`${formId}-title`}>Titel</Label>
            <Input
              id={`${formId}-title`}
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="Titel eingeben"
              className="border-border bg-background"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${formId}-description`}>Beschreibung</Label>
            <Textarea
              id={`${formId}-description`}
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              placeholder="Beschreibung eingeben..."
              className="min-h-28 border-border bg-background"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Typ</Label>
              <Select value={form.type} onValueChange={(value) => updateField("type", value as ModType)}>
                <SelectTrigger className="w-full border-border bg-background">
                  <SelectValue placeholder="Typ auswaehlen" />
                </SelectTrigger>
                <SelectContent>
                  {MOD_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Marke</Label>
              <Select value={form.brand} onValueChange={(value) => updateField("brand", value as ModBrand)}>
                <SelectTrigger className="w-full border-border bg-background">
                  <SelectValue placeholder="Marke auswaehlen" />
                </SelectTrigger>
                <SelectContent>
                  {MOD_BRANDS.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${formId}-images`}>Bilder (bis zu 3)</Label>
            <label
              htmlFor={`${formId}-images`}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border bg-background px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ImageIcon className="h-5 w-5" />
              {form.images.length > 0 ? `${form.images.length} Bild(er) ausgewaehlt` : "Bilder auswaehlen"}
            </label>
            <input
              key={`${inputKey}-images`}
              id={`${formId}-images`}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="hidden"
            />
            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {previews.map((preview, index) => (
                  <div key={preview} className="overflow-hidden rounded-lg border border-border bg-background">
                    <img src={preview} alt={`Preview ${index + 1}`} className="h-20 w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {isSaveEdit ? (
            <div className="space-y-2">
              <Label htmlFor={`${formId}-save-file`}>Save-Edit Datei (.txt)</Label>
              <label
                htmlFor={`${formId}-save-file`}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border bg-background px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Upload className="h-5 w-5" />
                {form.saveFile ? form.saveFile.name : ".txt-Datei auswaehlen"}
              </label>
              <input
                key={`${inputKey}-save-file`}
                id={`${formId}-save-file`}
                type="file"
                accept=".txt,text/plain"
                onChange={handleSaveFileChange}
                className="hidden"
                required={isSaveEdit}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor={`${formId}-download-link`}>Download-Link</Label>
              <div className="relative">
                <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id={`${formId}-download-link`}
                  type="url"
                  value={form.downloadLink}
                  onChange={(event) => updateField("downloadLink", event.target.value)}
                  placeholder="https://..."
                  className="border-border bg-background pl-9"
                  required={!isSaveEdit}
                />
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting || !form.title || !form.description}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Wird gespeichert...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                {title} speichern
              </>
            )}
          </Button>

          {status.message && (
            <p className={status.variant === "error" ? "text-sm text-destructive" : "text-sm text-green-500"}>
              {status.message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

function ModPreviewPanel({
  kind,
  title,
  description,
  emptyText,
  mods,
  isLoading,
  deletingId,
  onDelete,
}: {
  kind: ModKind
  title: string
  description: string
  emptyText: string
  mods: ModItem[]
  isLoading: boolean
  deletingId: string | null
  onDelete: (mod: ModItem) => void
}) {
  const Icon = kind === "save-edit" ? FileText : Package

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          {title} ({mods.length})
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : mods.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Icon className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">{emptyText}</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {mods.map((mod) => (
              <div
                key={mod.id}
                className="group relative overflow-hidden rounded-lg border border-border bg-background p-4 transition-all hover:border-primary/30"
              >
                <div className="flex gap-4">
                  {mod.imageUrls[0] && (
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <img src={mod.imageUrls[0]} alt={mod.title} className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{mod.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{mod.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-sm border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs text-primary">
                        {mod.type}
                      </span>
                      <span className="rounded-sm border border-border px-2 py-0.5 text-xs text-muted-foreground">
                        {mod.brand}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {new Date(mod.createdAt).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onDelete(mod)}
                    disabled={deletingId === mod.id}
                  >
                    {deletingId === mod.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
