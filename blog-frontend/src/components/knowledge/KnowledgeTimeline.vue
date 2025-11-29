<template>
  <div class="knowledge-timeline luxury-card">
    <!-- Cabeçalho -->
    <div class="timeline-header text-center mb-4">
      <h3 class="timeline-title display-2 gold-glow">MAPA TEMPORAL DO CONHECIMENTO</h3>
      <p class="timeline-subtitle text-small">
        CADA CÉLULA REPRESENTA 1 HORA.
        <span class="positive">+</span> = ATIVIDADE,
        <span class="negative">-</span> = INATIVIDADE
      </p>
    </div>

    <!-- Controles -->
    <div class="timeline-controls luxury-bg p-3 mb-4">
      <div class="time-unit-selector">
        <button 
          v-for="unit in timeUnits" 
          :key="unit.value" 
          @click="currentTimeUnit = unit.value"
          :class="['btn', 'btn-sm', currentTimeUnit === unit.value ? 'btn-primary' : 'btn-tertiary']"
        >
          {{ unit.label }}
        </button>
      </div>

      <div class="date-range text-small">
        {{ currentDateRange }}
      </div>
    </div>

    <!-- Timeline Visual -->
    <div class="timeline-visual luxury-bg luxury-border p-3 mb-4" :style="containerStyle">
      <div class="timeline-grid" :style="gridStyle">
        <div 
          v-for="(slot, index) in visibleSlots" 
          :key="index" 
          class="time-slot" 
          :class="{
            'active': slot.hasActivity,
            'inactive': !slot.hasActivity,
            [`category-${slot.category}`]: slot.hasActivity
          }" 
          :style="slot.hasActivity ? getSlotStyle(slot) : {}" 
          :title="getSlotTooltip(slot)"
          @click="handleSlotClick(slot)"
        >
          {{ slot.hasActivity ? '+' : '-' }}
        </div>
      </div>
    </div>

    <!-- Detalhes do Slot Selecionado -->
    <div v-if="selectedSlot" class="slot-details luxury-bg luxury-border p-4 mb-4">
      <h4 class="details-title h5 mb-3">DETALHES DA HORA</h4>
      <div class="details-content">
        <div class="detail-row luxury-border-bottom py-2">
          <span class="detail-label text-small">DATA/HORA:</span>
          <span class="detail-value text-small">{{ formatSlotDate(selectedSlot.timestamp) }}</span>
        </div>
        <div v-if="selectedSlot.hasActivity" class="detail-row luxury-border-bottom py-2">
          <span class="detail-label text-small">STATUS:</span>
          <span class="detail-value text-small positive">ATIVO</span>
        </div>
        <div v-else class="detail-row luxury-border-bottom py-2">
          <span class="detail-label text-small">STATUS:</span>
          <span class="detail-value text-small negative">INATIVO</span>
        </div>
        <div v-if="selectedSlot.hasActivity" class="detail-row luxury-border-bottom py-2">
          <span class="detail-label text-small">CATEGORIA:</span>
          <span class="detail-value text-small" :style="{ color: getCategoryColor(selectedSlot.category) }">
            {{ getCategoryName(selectedSlot.category) }}
          </span>
        </div>
        <div v-if="selectedSlot.hasActivity" class="detail-row luxury-border-bottom py-2">
          <span class="detail-label text-small">VOLUME:</span>
          <span class="detail-value text-small">{{ selectedSlot.volume.toLocaleString() }} CARACTERES</span>
        </div>
        <div v-if="selectedSlot.hasActivity" class="detail-row luxury-border-bottom py-2">
          <span class="detail-label text-small">ARQUIVOS:</span>
          <span class="detail-value text-small">{{ selectedSlot.filesCount }} ARQUIVO(S)</span>
        </div>
        <div v-if="selectedSlot.hasActivity" class="detail-row py-2">
          <span class="detail-label text-small">INTENSIDADE:</span>
          <span class="detail-value text-small">NÍVEL {{ selectedSlot.intensity }}/5</span>
        </div>
      </div>
    </div>

    <!-- Legenda Compacta -->
    <div class="compact-legend luxury-bg luxury-border p-4 mb-4">
      <div class="legend-section">
        <h4 class="legend-title h5 mb-3">LEGENDA</h4>
        <div class="legend-items grid grid-3 gap-2">
          <div class="legend-item flex items-center gap-2">
            <span class="legend-char negative">-</span>
            <span class="legend-name text-small">INATIVO</span>
          </div>
          <div v-for="category in categories" :key="category.id" class="legend-item flex items-center gap-2">
            <span class="legend-char" :style="{ color: category.color }">+</span>
            <span class="legend-name text-small">{{ category.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Estatísticas Resumidas -->
    <div class="timeline-stats luxury-border-top pt-4">
      <div class="stat text-center">
        <span class="stat-value display-1 gold-gradient">{{ activityPercentage }}%</span>
        <span class="stat-label text-small">PRODUTIVO</span>
      </div>
      <div class="stat text-center">
        <span class="stat-value display-1 gold-gradient">{{ totalActiveSlots }}</span>
        <span class="stat-label text-small">ATIVOS</span>
      </div>
      <div class="stat text-center">
        <span class="stat-value display-1 gold-gradient">{{ totalVolume.toLocaleString() }}</span>
        <span class="stat-label text-small">CHARS</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { KnowledgeActivity, TimeSlot, Category } from '@/types/knowledge'

// Categorias com cores distintas e variadas
const categories: Category[] = [
  { id: 'programming', name: 'PROGRAMAÇÃO', color: '#4ECDC4', description: 'Código, algoritmos, desenvolvimento' },
  { id: 'research', name: 'PESQUISA', color: '#45B7D1', description: 'Artigos, papers, investigação acadêmica' },
  { id: 'writing', name: 'ESCRITA', color: '#96CEB4', description: 'Documentação, anotações, conteúdo' },
  { id: 'design', name: 'DESIGN', color: '#FECA57', description: 'UX/UI, interfaces, experiência' },
  { id: 'ai-ml', name: 'IA & ML', color: '#FF9FF3', description: 'Inteligência artificial, modelos, dados' },
  { id: 'infrastructure', name: 'INFRAESTRUTURA', color: '#54A0FF', description: 'DevOps, cloud, sistemas' },
  { id: 'learning', name: 'ESTUDO', color: '#5F27CD', description: 'Cursos, tutoriais, aprendizado' },
  { id: 'planning', name: 'PLANEJAMENTO', color: '#00D2D3', description: 'Estratégia, planejamento, organização' }
]

interface Props {
  activities: KnowledgeActivity[]
}

const props = defineProps<Props>()

// Refs
const currentTimeUnit = ref<'hour' | 'day' | 'week' | 'month' | 'year'>('day')
const selectedSlot = ref<TimeSlot | null>(null)

// Configuração
const timeUnits = [
  { value: 'hour', label: 'HORA' },
  { value: 'day', label: 'DIA' },
  { value: 'week', label: 'SEMANA' },
  { value: 'month', label: 'MÊS' },
  { value: 'year', label: 'ANO' }
]

// Constantes matemáticas precisas
const HOURS_IN = {
  day: 24,
  week: 168,
  month: 730.001,
  year: 8760
}

// Configuração de visualização por unidade
const viewConfig = {
  hour: { rows: 1, cols: 24, totalSlots: 24 },
  day: { rows: 1, cols: 24, totalSlots: 24 },
  week: { rows: 7, cols: 24, totalSlots: 168 },
  month: { rows: 31, cols: 24, totalSlots: 744 },
  year: { rows: 52, cols: 168, totalSlots: 8736 }
}

// Gerar slots de tempo baseado na unidade atual
const timeSlots = computed(() => {
  const slots: TimeSlot[] = []
  const now = new Date()
  const config = viewConfig[currentTimeUnit.value]

  let startDate = new Date()

  // Definir data de início baseado na unidade
  switch (currentTimeUnit.value) {
    case 'hour':
      startDate.setHours(now.getHours() - 23)
      break
    case 'day':
      startDate.setHours(0, 0, 0, 0)
      break
    case 'week':
      startDate.setDate(now.getDate() - now.getDay())
      startDate.setHours(0, 0, 0, 0)
      break
    case 'month':
      startDate.setDate(1)
      startDate.setHours(0, 0, 0, 0)
      break
    case 'year':
      startDate.setMonth(0, 1)
      startDate.setHours(0, 0, 0, 0)
      break
  }

  // Gerar slots para cada hora no período
  for (let i = 0; i < config.totalSlots; i++) {
    const slotDate = new Date(startDate)

    switch (currentTimeUnit.value) {
      case 'year':
        const week = Math.floor(i / 168)
        const hourInWeek = i % 168
        slotDate.setDate(slotDate.getDate() + (week * 7) + Math.floor(hourInWeek / 24))
        slotDate.setHours(hourInWeek % 24)
        break
      default:
        slotDate.setHours(slotDate.getHours() + i)
        break
    }

    slots.push(createSlot(slotDate))
  }

  return slots
})

// Função para criar um slot
const createSlot = (slotDate: Date): TimeSlot => {
  const slotActivities = props.activities.filter(activity => {
    const activityDate = new Date(activity.timestamp)
    return activityDate.getFullYear() === slotDate.getFullYear() &&
      activityDate.getMonth() === slotDate.getMonth() &&
      activityDate.getDate() === slotDate.getDate() &&
      activityDate.getHours() === slotDate.getHours()
  })

  const hasActivity = slotActivities.length > 0
  const totalVolume = slotActivities.reduce((sum, act) => sum + act.volume, 0)
  const dominantCategory = findDominantCategory(slotActivities)

  return {
    timestamp: slotDate,
    hasActivity,
    category: dominantCategory,
    intensity: calculateIntensity(totalVolume),
    volume: totalVolume,
    filesCount: slotActivities.reduce((sum, act) => sum + act.filesChanged.length, 0)
  }
}

// Encontrar categoria dominante
const findDominantCategory = (activities: KnowledgeActivity[]): string | null => {
  if (activities.length === 0) return null

  const categoryVolumes: Record<string, number> = {}
  activities.forEach(activity => {
    categoryVolumes[activity.category] = (categoryVolumes[activity.category] || 0) + activity.volume
  })

  return Object.keys(categoryVolumes).reduce((a, b) =>
    categoryVolumes[a] > categoryVolumes[b] ? a : b
  )
}

// Calcular intensidade baseada no volume
const calculateIntensity = (volume: number): number => {
  if (volume >= 10000) return 5
  if (volume >= 5000) return 4
  if (volume >= 2000) return 3
  if (volume >= 500) return 2
  if (volume >= 100) return 1
  return 0
}

// Slots visíveis
const visibleSlots = computed(() => timeSlots.value)

// Estilo do grid
const gridStyle = computed(() => {
  const config = viewConfig[currentTimeUnit.value]
  return {
    gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
    gridTemplateRows: `repeat(${config.rows}, 1fr)`,
    gap: '1px'
  }
})

// Estilo do container para scroll
const containerStyle = computed(() => {
  const config = viewConfig[currentTimeUnit.value]
  const maxHeight = config.rows > 20 ? '500px' : 'auto'
  return {
    maxHeight,
    overflowY: config.rows > 20 ? 'auto' : 'visible'
  }
})

// Estatísticas
const totalActiveSlots = computed(() =>
  timeSlots.value.filter(slot => slot.hasActivity).length
)

const activityPercentage = computed(() =>
  Math.round((totalActiveSlots.value / timeSlots.value.length) * 100)
)

const totalVolume = computed(() =>
  timeSlots.value.reduce((sum, slot) => sum + slot.volume, 0)
)

// Estilo para slots ativos
const getSlotStyle = (slot: TimeSlot) => {
  const category = categories.find(c => c.id === slot.category)
  if (!category) return {}

  const opacity = 0.7 + (slot.intensity * 0.06)
  return {
    color: category.color,
    opacity: opacity.toString(),
    backgroundColor: `${category.color}15`
  }
}

// Tooltip para slots
const getSlotTooltip = (slot: TimeSlot) => {
  if (!slot.hasActivity) {
    return `INATIVO - ${formatSlotDate(slot.timestamp)}`
  }

  const category = categories.find(c => c.id === slot.category)
  return `${category?.name || 'DESCONHECIDO'} - ${slot.volume} CHARS - ${formatSlotDate(slot.timestamp)}`
}

// Manipular clique no slot
const handleSlotClick = (slot: TimeSlot) => {
  selectedSlot.value = slot
}

// Formatar data do slot
const formatSlotDate = (date: Date) => {
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Informações do período atual
const currentDateRange = computed(() => {
  const slots = timeSlots.value
  if (slots.length === 0) return ''

  const start = slots[0].timestamp
  const end = slots[slots.length - 1].timestamp

  return `${formatSlotDate(start)} → ${formatSlotDate(end)}`
})

// Métodos auxiliares
const getCategoryColor = (categoryId: string | null) => {
  if (!categoryId) return '#666'
  const category = categories.find(c => c.id === categoryId)
  return category?.color || '#666'
}

const getCategoryName = (categoryId: string | null) => {
  if (!categoryId) return 'NENHUMA'
  const category = categories.find(c => c.id === categoryId)
  return category?.name || categoryId
}

// Selecionar automaticamente o último slot com atividade
onMounted(() => {
  setTimeout(() => {
    const activeSlots = timeSlots.value.filter(slot => slot.hasActivity)
    if (activeSlots.length > 0) {
      selectedSlot.value = activeSlots[activeSlots.length - 1]
    } else if (timeSlots.value.length > 0) {
      selectedSlot.value = timeSlots.value[timeSlots.value.length - 1]
    }
  }, 100)
})
</script>

<style scoped>
.knowledge-timeline {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border-radius: 0;
}

.timeline-header {
  text-align: center;
}

.timeline-title {
  font-weight: normal;
  color: var(--color-text-primary);
  letter-spacing: 1px;
}

.timeline-subtitle {
  color: var(--color-text-secondary);
  line-height: 1.4;
  letter-spacing: 0.5px;
}

.timeline-subtitle .positive {
  color: var(--color-gold-300);
}

.timeline-subtitle .negative {
  color: #ff4444;
}

.timeline-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time-unit-selector {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.date-range {
  color: var(--color-text-secondary);
  font-weight: normal;
  letter-spacing: 0.5px;
}

.timeline-visual {
  overflow-x: auto;
}

.timeline-grid {
  display: grid;
  font-size: 0.9rem;
  line-height: 1;
  min-width: min-content;
}

.time-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 0;
  transition: all 0.2s var(--ease-snappy);
  min-width: 16px;
  height: 18px;
  cursor: pointer;
  border: 1px solid transparent;
  background: var(--color-bg-secondary);
}

.time-slot.inactive {
  color: #ff4444;
  background: var(--color-bg-secondary);
}

.time-slot.active {
  font-weight: bold;
}

.time-slot:hover {
  border: 1px solid var(--color-gold-300);
  transform: scale(1.1);
}

/* Cores das categorias */
.time-slot.category-programming { color: #4ECDC4; }
.time-slot.category-research { color: #45B7D1; }
.time-slot.category-writing { color: #96CEB4; }
.time-slot.category-design { color: #FECA57; }
.time-slot.category-ai-ml { color: #FF9FF3; }
.time-slot.category-infrastructure { color: #54A0FF; }
.time-slot.category-learning { color: #5F27CD; }
.time-slot.category-planning { color: #00D2D3; }

/* Detalhes do Slot */
.slot-details {
  border-left: 4px solid var(--color-border);
}

.details-title {
  font-weight: normal;
  color: var(--color-text-primary);
  letter-spacing: 0.5px;
}

.details-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  color: var(--color-text-secondary);
  font-weight: normal;
  letter-spacing: 0.5px;
}

.detail-value {
  color: var(--color-text-primary);
  letter-spacing: 0.5px;
}

.detail-value.positive {
  color: var(--color-gold-300);
}

.detail-value.negative {
  color: #ff4444;
}

/* Legenda Compacta */
.legend-title {
  font-weight: normal;
  color: var(--color-text-primary);
  letter-spacing: 0.5px;
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.legend-char {
  font-weight: bold;
  font-size: 0.9rem;
}

.legend-char.negative {
  color: #ff4444;
}

.legend-name {
  color: var(--color-text-secondary);
  letter-spacing: 0.5px;
}

/* Estatísticas */
.timeline-stats {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
}

.stat-value {
  font-weight: normal;
  color: var(--color-gold-300);
  margin-bottom: 0.25rem;
}

.stat-label {
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Utilitários personalizados */
.luxury-border-bottom {
  border-bottom: 1px solid var(--color-border);
}

.text-center {
  text-align: center;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.gap-2 {
  gap: 0.5rem;
}

/* Responsividade */
@media (max-width: 768px) {
  .timeline-controls {
    flex-direction: column;
    gap: 1rem;
  }

  .time-unit-selector {
    justify-content: center;
  }

  .timeline-stats {
    flex-direction: column;
    gap: 0.75rem;
  }

  .legend-items {
    gap: 0.5rem;
  }

  .timeline-grid {
    font-size: 0.8rem;
  }

  .time-slot {
    min-width: 14px;
    height: 16px;
  }
}

/* Ajustes para visualizações muito grandes (ano) */
@media (min-width: 1200px) {
  .timeline-grid {
    font-size: 0.8rem;
  }

  .time-slot {
    min-width: 14px;
    height: 16px;
  }
}
</style>
