<template>
  <div class="category-legend">
    <h4 class="legend-title">Legenda de Categorias</h4>

    <div class="categories-list">
      <div v-for="category in categories" :key="category.id" class="category-item">
        <div class="color-sample" :style="{ backgroundColor: category.color }"></div>
        <div class="category-info">
          <span class="category-name">{{ category.name }}</span>
          <span class="category-desc">{{ category.description }}</span>
        </div>
      </div>
    </div>

    <div class="volume-legend">
      <h5 class="volume-title">Intensidade por Volume:</h5>
      <div class="volume-levels">
        <div v-for="level in volumeLevels" :key="level.value" class="volume-item">
          <div class="volume-sample" :class="`level-${level.value}`"></div>
          <span class="volume-desc">{{ level.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@/types/knowledge'

interface Props {
  categories: Category[]
}

defineProps<Props>()

const volumeLevels = [
  { value: 1, label: '100-500 chars' },
  { value: 2, label: '500-2K chars' },
  { value: 3, label: '2K-5K chars' },
  { value: 4, label: '5K-10K chars' },
  { value: 5, label: '10K+ chars' }
]
</script>

<style scoped>
.category-legend {
  background-color: #ffffff;
  border-radius: 0;
  border: 1px solid #cccccc;
  padding: 1rem;
  font-family: var(--font-sans);
}

.legend-title {
  font-size: 0.875rem;
  font-weight: normal;
  color: #222222;
  margin-bottom: 0.75rem;
  font-family: var(--font-serif);
  border-bottom: 1px solid #cccccc;
  padding-bottom: 0.5rem;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.25rem 0;
}

.color-sample {
  width: 1rem;
  height: 1rem;
  border-radius: 0;
  flex-shrink: 0;
  border: 1px solid #cccccc;
}

.category-info {
  display: flex;
  flex-direction: column;
}

.category-name {
  font-size: 0.875rem;
  font-weight: normal;
  color: #222222;
}

.category-desc {
  font-size: 0.75rem;
  color: #666666;
}

.volume-legend {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #cccccc;
}

.volume-title {
  font-size: 0.875rem;
  font-weight: normal;
  color: #222222;
  margin-bottom: 0.5rem;
  font-family: var(--font-serif);
}

.volume-levels {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.volume-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.volume-sample {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 0;
  border: 1px solid #cccccc;
}

.volume-sample.level-1 {
  background-color: #f0f0f0;
}

.volume-sample.level-2 {
  background-color: #d0d0d0;
}

.volume-sample.level-3 {
  background-color: #b0b0b0;
}

.volume-sample.level-4 {
  background-color: #909090;
}

.volume-sample.level-5 {
  background-color: #707070;
}

.volume-desc {
  font-size: 0.75rem;
  color: #666666;
}
</style>
