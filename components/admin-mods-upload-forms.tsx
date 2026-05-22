"use client"

import { useEffect, useRef, useState } from "react"
import { FileText, Image as ImageIcon, LinkIcon, Loader2, Package, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { MOD_BRANDS, MOD_TYPES, type ModBrand, type ModKind, type ModType } from "@/lib/mods-data"

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
  return (
    <section className="mt-8">
      <div className="mb-5">
        <h2 className="text-2xl font-bold tracking-wide">Save Edits & Local Mods</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Uploads mit Typ, Marke, Bildern und Download-Ziel fuer die neue Mods-Seite.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <ModUploadForm kind="save-edit" title="Save Edits" description="Nur .txt-Dateien fuer Save-Edit Downloads." />
        <ModUploadForm
          kind="local-mod"
          title="Local Mods"
          description="Local Mods nutzen einen externen Download-Link statt lokaler ZIP-Uploads."
        />
      </div>
    </section>
  )
}

function ModUploadForm({
  kind,
  title,
  description,
}: {
  kind: ModKind
  title: string
  description: string
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
      const data = (await response.json().catch(() => ({}))) as { error?: string }

      if (!response.ok) {
        throw new Error(data.error || "Upload fehlgeschlagen")
      }

      resetForm()
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
          {title}
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

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !form.title || !form.description}
          >
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
