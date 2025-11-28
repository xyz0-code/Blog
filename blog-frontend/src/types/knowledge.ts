export interface KnowledgeActivity {
  id: string
  timestamp: Date
  category: string
  volume: number // Caracteres adicionados
  filesChanged: string[]
  newFiles?: boolean
  description?: string
}

export interface TimeSlot {
  timestamp: Date
  hasActivity: boolean
  category: string | null
  intensity: number // 0-5
  volume: number
  filesCount: number
}

export interface Category {
  id: string
  name: string
  color: string
  description: string
}
