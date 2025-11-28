<template>
  <div class="knowledge-grid">
    <!-- Cabeçalho do Grid -->
    <div class="grid-header">
      <h3 class="grid-title">Mapa de Volume de Conhecimento</h3>
      <p class="grid-subtitle">Volume de conteúdo adicionado por categoria</p>
    </div>

    <!-- Grid Principal -->
    <div class="grid-container" :style="gridStyles">
      <div v-for="cell in gridCells" :key="cell.id" class="grid-cell" :class="[
        `category-${cell.category}`,
        `volume-level-${cell.volumeLevel}`,
        { 'has-activity': cell.volumeLevel > 0 }
      ]" :title="cell.tooltip" @click="onCellClick(cell)">
        <div class="cell-content">
          <div class="volume-indicator" :style="volumeStyle(cell)"></div>
          <div class="files-badge" v-if="cell.filesCount > 1">
            {{ cell.filesCount }}
          </div>
        </div>
      </div>
    </div>

    <!-- Eixo do Tempo -->
    <div class="time-axis">
      <div v-for="period in timePeriods" :key="period.label" class="time-label">
        {{ period.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { KnowledgeGridCell, KnowledgeActivity } from '@/types/knowledge'

interface Props {
  activities: KnowledgeActivity[]
  timeRange?: string
}

const props = withDefaults(defineProps<Props>(), {
  timeRange: 'month'
})

const emit = defineEmits<{
  cellClick: [cell: KnowledgeGridCell]
}>()

// Calcular células do grid baseado nas atividades
const gridCells = computed(() => {
  const activitiesByDay = new Map()

  props.activities.forEach(activity => {
    const dayKey = activity.timestamp.toDateString()
    const categoryKey = `${dayKey}-${activity.category}`

    if (!activitiesByDay.has(categoryKey)) {
      activitiesByDay.set(categoryKey, {
        date: activity.timestamp,
        category: activity.category,
        totalVolume: 0,
        filesCount: 0,
        activities: []
      })
    }

    const dayData = activitiesByDay.get(categoryKey)
    dayData.totalVolume += activity.volume
    dayData.filesCount += activity.filesChanged.length
    dayData.activities.push(activity)
  })

  return Array.from(activitiesByDay.values()).map((data, index) => {
    const volumeLevel = calculateVolumeLevel(data.totalVolume)

    return {
      id: `cell-${index}`,
      date: data.date,
      category: data.category,
      volumeLevel,
      totalVolume: data.totalVolume,
      filesCount: data.filesCount,
      tooltip: `${data.category}: ${data.totalVolume.toLocaleString()} chars em ${data.filesCount} arquivo(s)`
    } as KnowledgeGridCell
  })
})

const calculateVolumeLevel = (volume: number): number => {
  if (volume >= 10000) return 5
  if (volume >= 5000) return 4
  if (volume >= 2000) return 3
  if (volume >= 500) return 2
  if (volume >= 100) return 1
  return 0
}

const volumeStyle = (cell: KnowledgeGridCell) => {
  if (cell.volumeLevel === 0) return {}

  const opacity = 0.3 + (cell.volumeLevel * 0.14)
  return { opacity: opacity.toString() }
}

const gridStyles = computed(() => ({
  gridTemplateColumns: 'repeat(auto-fit, minmax(20px, 1fr))',
  gap: '2px'
}))

const timePeriods = computed(() => {
  return [
    { label: 'Jan', date: new Date('2024-01-01') },
    { label: 'Fev', date: new Date('2024-02-01') },
    { label: 'Mar', date: new Date('2024-03-01') },
    { label: 'Abr', date: new Date('2024-04-01') },
    { label: 'Mai', date: new Date('2024-05-01') },
    { label: 'Jun', date: new Date('2024-06-01') },
    { label: 'Jul', date: new Date('2024-07-01') },
    { label: 'Ago', date: new Date('2024-08-01') },
    { label: 'Set', date: new Date('2024-09-01') },
    { label: 'Out', date: new Date('2024-10-01') },
    { label: 'Nov', date: new Date('2024-11-01') },
    { label: 'Dez', date: new Date('2024-12-01') }
  ]
})

const onCellClick = (cell: KnowledgeGridCell) => {
  emit('cellClick', cell)
}
</script>

<style scoped>
.knowledge-grid {
  background-color: var(--color-bg-secondary);
  border-radius: 0;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.grid-header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.grid-title {
  font-size: 1.125rem;
  font-weight: normal;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
  font-family: var(--font-mono);
  letter-spacing: 1px;
}

.grid-subtitle {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  letter-spacing: 0.5px;
}

.grid-container {
  display: grid;
  min-height: 120px;
}

.grid-cell {
  aspect-ratio: 1;
  border-radius: 0;
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all 0.2s var(--ease-snappy);
  min-width: 16px;
  min-height: 16px;
  background-color: var(--color-bg-primary);
}

.grid-cell:hover {
  border-color: var(--color-gold-300);
  transform: scale(1.1);
  z-index: 10;
}

.grid-cell.has-activity {
  border-color: transparent;
}

.cell-content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.volume-indicator {
  width: 75%;
  height: 75%;
  border-radius: 0;
  background-color: var(--color-gold-300);
}

.files-badge {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  background-color: var(--color-bg-primary);
  color: var(--color-gold-300);
  font-size: 0.75rem;
  border-radius: 0;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-gold-300);
  font-weight: bold;
}

.time-axis {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  letter-spacing: 0.5px;
}

.time-label {
  text-align: center;
}

/* Cores das categorias - usando tons de dourado da paleta luxury */
.grid-cell.category-vue .volume-indicator {
  background-color: var(--color-gold-300);
}

.grid-cell.category-csharp .volume-indicator {
  background-color: var(--color-gold-400);
}

.grid-cell.category-typescript .volume-indicator {
  background-color: var(--color-gold-200);
}

.grid-cell.category-ai .volume-indicator {
  background-color: var(--color-gold-500);
}

.grid-cell.category-infra .volume-indicator {
  background-color: var(--color-gold-600);
}

.grid-cell.category-design .volume-indicator {
  background-color: var(--color-gold-700);
}

.grid-cell.category-programming .volume-indicator {
  background-color: var(--color-gold-300);
}

.grid-cell.category-research .volume-indicator {
  background-color: var(--color-gold-400);
}

.grid-cell.category-writing .volume-indicator {
  background-color: var(--color-gold-200);
}

.grid-cell.category-ai-ml .volume-indicator {
  background-color: var(--color-gold-500);
}

.grid-cell.category-infrastructure .volume-indicator {
  background-color: var(--color-gold-600);
}

.grid-cell.category-design .volume-indicator {
  background-color: var(--color-gold-700);
}

/* Níveis de volume - diferentes opacidades */
.grid-cell.volume-level-1 .volume-indicator {
  opacity: 0.3;
}

.grid-cell.volume-level-2 .volume-indicator {
  opacity: 0.45;
}

.grid-cell.volume-level-3 .volume-indicator {
  opacity: 0.6;
}

.grid-cell.volume-level-4 .volume-indicator {
  opacity: 0.75;
}

.grid-cell.volume-level-5 .volume-indicator {
  opacity: 0.9;
}
</style>
