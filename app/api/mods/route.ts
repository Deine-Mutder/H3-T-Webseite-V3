import { NextResponse } from 'next/server'
import { put, del } from '@vercel/blob'
import { getMods, addMod, deleteMod, type Mod, type SaveEdit, type LocalMod, type ModCategory } from '@/lib/mods'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') as ModCategory | null
    
    const mods = await getMods(category || undefined)
    return NextResponse.json({ mods })
  } catch (error) {
    console.error('Error fetching mods:', error)
    return NextResponse.json({ error: 'Failed to fetch mods' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Verify admin password
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const type = formData.get('type') as string
    const brand = formData.get('brand') as string | null
    const category = formData.get('category') as ModCategory
    
    // Handle multiple images
    const imageFiles = formData.getAll('images') as File[]
    
    // Handle file upload (txt for save-edit, zip for local-mod)
    const downloadFile = formData.get('downloadFile') as File | null
    const downloadLink = formData.get('downloadLink') as string | null

    if (!title || !description || !type || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Upload images
    const imageUrls: string[] = []
    for (const imageFile of imageFiles) {
      if (imageFile && imageFile.size > 0) {
        const blob = await put(`mods/${category}/${Date.now()}-${imageFile.name}`, imageFile, {
          access: 'public',
        })
        imageUrls.push(blob.url)
      }
    }

    // Upload download file or use link
    let fileUrl = ''
    if (category === 'save-edit') {
      if (downloadFile && downloadFile.size > 0) {
        const blob = await put(`mods/save-edits/${Date.now()}-${downloadFile.name}`, downloadFile, {
          access: 'public',
        })
        fileUrl = blob.url
      }
    } else {
      // local-mod can have either file or link
      if (downloadFile && downloadFile.size > 0) {
        const blob = await put(`mods/local-mods/${Date.now()}-${downloadFile.name}`, downloadFile, {
          access: 'public',
        })
        fileUrl = blob.url
      } else if (downloadLink) {
        fileUrl = downloadLink
      }
    }

    if (!fileUrl && category === 'save-edit') {
      return NextResponse.json({ error: 'Save Edit requires a txt file' }, { status: 400 })
    }

    const baseMod = {
      id: `${category}-${Date.now()}`,
      title,
      description,
      images: imageUrls,
      type: type as Mod['type'],
      brand: brand || null,
      createdAt: Date.now(),
    }

    let mod: Mod
    if (category === 'save-edit') {
      mod = {
        ...baseMod,
        category: 'save-edit',
        txtFileUrl: fileUrl,
      } as SaveEdit
    } else {
      mod = {
        ...baseMod,
        category: 'local-mod',
        downloadUrl: fileUrl,
      } as LocalMod
    }

    await addMod(mod)

    return NextResponse.json({ success: true, mod })
  } catch (error) {
    console.error('Error creating mod:', error)
    return NextResponse.json({ error: 'Failed to create mod' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    // Verify admin password
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, category, images, fileUrl } = await request.json()

    if (!id || !category) {
      return NextResponse.json({ error: 'Mod ID and category are required' }, { status: 400 })
    }

    // Delete images from blob storage
    if (images && Array.isArray(images)) {
      for (const imageUrl of images) {
        try {
          await del(imageUrl)
        } catch (e) {
          console.error('Error deleting image:', e)
        }
      }
    }

    // Delete download file from blob storage (if it's a blob URL)
    if (fileUrl && fileUrl.includes('blob.vercel-storage.com')) {
      try {
        await del(fileUrl)
      } catch (e) {
        console.error('Error deleting file:', e)
      }
    }

    await deleteMod(id, category as ModCategory)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting mod:', error)
    return NextResponse.json({ error: 'Failed to delete mod' }, { status: 500 })
  }
}
