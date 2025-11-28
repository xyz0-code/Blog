export interface Book {
  id: string
  title: string
  author: string
  description: string
  coverUrl?: string
  status: 'read' | 'reading' | 'to-read'
  progress?: number // 0-100 para livros em leitura
  startDate?: Date
  endDate?: Date
  rating?: number // 1-5
  categories: string[]
  pages: number
  currentPage?: number
  notes?: string
}

export interface BookFilters {
  status: ('read' | 'reading' | 'to-read')[]
  categories: string[]
  searchQuery: string
}
