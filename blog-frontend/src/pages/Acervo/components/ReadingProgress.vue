<template>
  <div class="reading-progress">
    <div class="progress-header flex justify-between items-center mb-2">
      <span class="progress-label">PROGRESSO</span>
      <span class="progress-percentage">{{ progress }}%</span>
    </div>

    <div class="progress-bar overflow-hidden mb-2">
      <div class="progress-fill h-full" :style="{ width: `${progress}%` }"></div>
    </div>

    <div class="progress-details text-center">
      <span>PÁGINA {{ currentPage }} DE {{ totalPages }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  progress: number
  currentPage?: number
  totalPages: number
}

defineProps<Props>()
</script>

<style scoped>
.reading-progress {
  background: var(--color-bg-secondary);
  padding: 1rem;
  border: 1px solid var(--color-border);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.progress-header {
  margin-bottom: 0.75rem;
}

.progress-label {
  font-size: 0.75rem;
  color: var(--color-text-primary);
  letter-spacing: 0.5px;
}

.progress-percentage {
  font-size: 0.75rem;
  color: var(--color-gold-300);
  letter-spacing: 0.5px;
  font-weight: bold;
}

.progress-bar {
  height: 4px;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
}

.progress-fill {
  background-color: var(--color-gold-300);
  transition: width 0.3s var(--ease-snappy);
}

.progress-details {
  font-size: 0.625rem;
  color: var(--color-text-secondary);
  letter-spacing: 0.5px;
}

/* Estilos para diferentes estados de progresso */
.progress-fill[style*="width: 0%"] {
  background-color: var(--color-gold-700);
}

.progress-fill[style*="width: 100%"] {
  background-color: var(--color-gold-300);
  box-shadow: 0 0 5px var(--color-gold-300);
}
</style>
