<template>
  <div class="category-legend luxury-card">
    <h4 class="legend-title h5 gold-glow mb-3">LEGENDA DE CATEGORIAS</h4>

    <div class="categories-list grid grid-2 gap-3 mb-4">
      <div v-for="category in categories" :key="category.id" class="category-item luxury-bg luxury-border p-3">
        <div class="color-sample luxury-border" :style="{ backgroundColor: category.color }"></div>
        <div class="category-info">
          <span class="category-name text-small">{{ category.name }}</span>
          <span class="category-desc text-xsmall">{{ category.description }}</span>
        </div>
      </div>
    </div>

    <div class="volume-legend luxury-border-top pt-4">
      <h5 class="volume-title h6 mb-3">INTENSIDADE POR VOLUME:</h5>
      <div class="volume-levels grid grid-3 gap-2">
        <div v-for="level in volumeLevels" :key="level.value" class="volume-item flex items-center gap-2">
          <div class="volume-sample luxury-border" :class="`level-${level.value}`"></div>
          <span class="volume-desc text-xsmall">{{ level.label }}</span>
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
  { value: 1, label: '100-500 CHARS' },
  { value: 2, label: '500-2K CHARS' },
  { value: 3, label: '2K-5K CHARS' },
  { value: 4, label: '5K-10K CHARS' },
  { value: 5, label: '10K+ CHARS' }
]
</script>

<style scoped>
.category-legend {
  background-color: var(--color-bg-secondary);
  border-radius: 0;
}

.legend-title {
  font-weight: normal;
  color: var(--color-text-primary);
  letter-spacing: 0.5px;
}

.categories-list {
  display: grid;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s var(--ease-snappy);
}

.category-item:hover {
  border-color: var(--color-gold-300) !important;
  transform: translateY(-1px);
}

.color-sample {
  width: 1rem;
  height: 1rem;
  border-radius: 0;
  flex-shrink: 0;
}

.category-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.category-name {
  font-weight: normal;
  color: var(--color-text-primary);
  letter-spacing: 0.5px;
  margin-bottom: 0.125rem;
}

.category-desc {
  color: var(--color-text-secondary);
  line-height: 1.3;
}

.volume-legend {
  border-top: 1px solid var(--color-border);
}

.volume-title {
  font-weight: normal;
  color: var(--color-text-primary);
  letter-spacing: 0.5px;
}

.volume-levels {
  display: grid;
}

.volume-item {
  display: flex;
  align-items: center;
}

.volume-sample {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 0;
  background-color: var(--color-gold-300);
}

.volume-sample.level-1 {
  opacity: 0.3;
}

.volume-sample.level-2 {
  opacity: 0.45;
}

.volume-sample.level-3 {
  opacity: 0.6;
}

.volume-sample.level-4 {
  opacity: 0.75;
}

.volume-sample.level-5 {
  opacity: 0.9;
}

.volume-desc {
  color: var(--color-text-secondary);
  letter-spacing: 0.5px;
}

/* Utilitários personalizados */
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-3 {
  gap: 0.75rem;
}

/* Responsividade */
@media (max-width: 768px) {
  .categories-list {
    grid-template-columns: 1fr;
  }

  .volume-levels {
    grid-template-columns: repeat(2, 1fr);
  }

  .category-item {
    padding: 0.75rem;
  }

  .color-sample {
    width: 0.875rem;
    height: 0.875rem;
  }
}

@media (max-width: 480px) {
  .volume-levels {
    grid-template-columns: 1fr;
  }

  .category-name {
    font-size: 0.875rem;
  }

  .category-desc {
    font-size: 0.7rem;
  }
}
</style>
