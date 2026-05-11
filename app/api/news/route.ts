import { NextResponse } from 'next/server'
import { put, del } from '@vercel/blob'
import { getNews, addNews, deleteNews, type NewsItem } from '@/lib/redis'

export async function GET() {
  try {
    const news = await getNews()
    return NextResponse.json({ news })
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
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
    const message = formData.get('message') as string
    const image = formData.get('image') as File | null

    if (!title || !message) {
      return NextResponse.json({ error: 'Title and message are required' }, { status: 400 })
    }

    let imageUrl: string | null = null

    if (image && image.size > 0) {
      const blob = await put(`news/${Date.now()}-${image.name}`, image, {
        access: 'public',
      })
      imageUrl = blob.url
    }

    const newsItem: NewsItem = {
      id: `news-${Date.now()}`,
      title,
      message,
      imageUrl,
      createdAt: Date.now(),
    }

    await addNews(newsItem)

    return NextResponse.json({ success: true, news: newsItem })
  } catch (error) {
    console.error('Error creating news:', error)
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    // Verify admin password
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, imageUrl } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'News ID is required' }, { status: 400 })
    }

    // Delete image from blob storage if exists
    if (imageUrl) {
      try {
        await del(imageUrl)
      } catch (e) {
        console.error('Error deleting image:', e)
      }
    }

    await deleteNews(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting news:', error)
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 })
  }
}
