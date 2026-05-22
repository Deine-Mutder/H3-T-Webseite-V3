import { Redis } from '@upstash/redis'
import type { ModItem } from '@/lib/mods-data'

export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export type NewsItem = {
  id: string
  title: string
  message: string
  imageUrl: string | null
  createdAt: number
}

const NEWS_KEY = 'news:items'
const MODS_KEY = 'mods:items'

export async function getNews(): Promise<NewsItem[]> {
  const news = await redis.lrange<NewsItem>(NEWS_KEY, 0, -1)
  return news || []
}

export async function addNews(item: NewsItem): Promise<void> {
  await redis.lpush(NEWS_KEY, item)
}

export async function deleteNews(id: string): Promise<void> {
  const news = await getNews()
  const filtered = news.filter((item) => item.id !== id)
  await redis.del(NEWS_KEY)
  for (const item of filtered.reverse()) {
    await redis.lpush(NEWS_KEY, item)
  }
}

export async function getMods(): Promise<ModItem[]> {
  const mods = await redis.lrange<ModItem>(MODS_KEY, 0, -1)
  return mods || []
}

export async function addMod(item: ModItem): Promise<void> {
  await redis.lpush(MODS_KEY, item)
}
