import { NextResponse } from "next/server"
import { del, put } from "@vercel/blob"
import { addMod, deleteMod, getMods } from "@/lib/redis"
import { MOD_BRANDS, MOD_TYPES, type ModBrand, type ModItem, type ModKind, type ModType } from "@/lib/mods-data"

function isModKind(value: FormDataEntryValue | null): value is ModKind {
  return value === "save-edit" || value === "local-mod"
}

function isModType(value: FormDataEntryValue | null): value is ModType {
  return typeof value === "string" && (MOD_TYPES as readonly string[]).includes(value)
}

function isModBrand(value: FormDataEntryValue | null): value is ModBrand {
  return typeof value === "string" && (MOD_BRANDS as readonly string[]).includes(value)
}

function isFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0
}

function cleanFileName(fileName: string) {
  return fileName.replace(/[^a-z0-9._-]/gi, "-").toLowerCase()
}

export async function GET() {
  try {
    const mods = await getMods()
    return NextResponse.json({ mods })
  } catch (error) {
    console.error("Error fetching mods:", error)
    return NextResponse.json({ error: "Failed to fetch mods" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const kind = formData.get("kind")
    const title = String(formData.get("title") || "").trim()
    const description = String(formData.get("description") || "").trim()
    const type = formData.get("type")
    const brand = formData.get("brand")
    const imageFiles = formData
      .getAll("images")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0)

    if (!isModKind(kind) || !title || !description || !isModType(type) || !isModBrand(brand)) {
      return NextResponse.json({ error: "Missing or invalid mod fields" }, { status: 400 })
    }

    if (imageFiles.length > 3) {
      return NextResponse.json({ error: "A maximum of 3 images is allowed" }, { status: 400 })
    }

    const now = Date.now()
    const imageUrls = await Promise.all(
      imageFiles.map(async (image, index) => {
        const blob = await put(`mods/images/${now}-${index}-${cleanFileName(image.name)}`, image, {
          access: "public",
        })
        return blob.url
      }),
    )

    let downloadUrl = ""
    let fileName: string | undefined

    if (kind === "save-edit") {
      const saveFile = formData.get("saveFile")

      if (!isFile(saveFile) || !saveFile.name.toLowerCase().endsWith(".txt")) {
        return NextResponse.json({ error: "Save edits only accept .txt files" }, { status: 400 })
      }

      fileName = cleanFileName(saveFile.name)
      const blob = await put(`mods/save-edits/${now}-${fileName}`, saveFile, {
        access: "public",
      })
      downloadUrl = blob.url
    } else {
      downloadUrl = String(formData.get("downloadLink") || "").trim()

      if (!downloadUrl) {
        return NextResponse.json({ error: "Download link is required" }, { status: 400 })
      }
    }

    const modItem: ModItem = {
      id: `mod-${now}`,
      kind,
      title,
      description,
      type,
      brand,
      imageUrls,
      downloadUrl,
      fileName,
      createdAt: now,
    }

    await addMod(modItem)

    return NextResponse.json({ success: true, mod: modItem })
  } catch (error) {
    console.error("Error creating mod:", error)
    return NextResponse.json({ error: "Failed to create mod" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, downloadUrl, imageUrls } = (await request.json()) as {
      id?: string
      downloadUrl?: string
      imageUrls?: string[]
    }

    if (!id) {
      return NextResponse.json({ error: "Mod ID is required" }, { status: 400 })
    }

    const blobUrls = [...(imageUrls || [])]
    if (downloadUrl?.includes(".vercel-storage.com/")) {
      blobUrls.push(downloadUrl)
    }

    await Promise.all(
      blobUrls.map(async (url) => {
        try {
          await del(url)
        } catch (error) {
          console.error("Error deleting mod blob:", error)
        }
      }),
    )

    await deleteMod(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting mod:", error)
    return NextResponse.json({ error: "Failed to delete mod" }, { status: 500 })
  }
}
