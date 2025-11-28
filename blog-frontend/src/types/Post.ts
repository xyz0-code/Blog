export type Post = {
  id: number | string
  title: string
  category?: string
  author?: string
  thumbnailUrl?: string | null
  excerpt?: string
  createdAt?: string | Date
  publishDate?: string
  content?: string
}

