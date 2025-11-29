<template>
  <div class="reading-progress luxury-bg luxury-border p-3">
    <div class="progress-header flex justify-between items-center mb-2">
      <span class="progress-label text-xsmall">PROGRESSO</span>
      <span class="progress-percentage text-xsmall gold-gradient">{{ progress }}%</span>
    </div>

    <div class="progress-bar luxury-border overflow-hidden mb-2">
      <div class="progress-fill h-full" :style="{ width: `${progress}%` }"></div>
    </div>

    <div class="progress-details text-center text-xsmall">
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
  font-family: 'PPMondwest', monospace;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 0;
  transition: all 0.2s var(--ease-snappy);
}

.progress-header {
  margin-bottom: 0.75rem;
}

.progress-label {
  color: var(--color-text-primary);
  letter-spacing: 0.5px;
}

.progress-percentage {
  letter-spacing: 0.5px;
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
  color: var(--color-text-secondary);
  letter-spacing: 0.5px;
}

/* Utilitários personalizados */
.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.text-center {
  text-align: center;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.p-3 {
  padding: 0.75rem;
}

.h-full {
  height: 100%;
}

.overflow-hidden {
  overflow: hidden;
}

/* Estilos para diferentes estados de progresso */
.progress-fill[style*="width: 0%"] {
  background-color: var(--color-gold-700);
}

.progress-fill[style*="width: 100%"] {
  background-color: var(--color-gold-300);
  box-shadow: 0 0 5px var(--color-gold-300);
}

/* Efeitos de hover para interatividade */
.reading-progress:hover {
  border-color: var(--color-gold-300);
}

.reading-progress:hover .progress-fill {
  box-shadow: 0 0 3px var(--color-gold-200);
}

/* Aplicar fonte quando carregada */
.fonts-loaded .reading-progress {
  font-family: 'PPMondwest', monospace !important;
}

/* Estados de progresso intermediários com cores diferentes */
.progress-fill[style*="width: 25%"] {
  background-color: var(--color-gold-600);
}

.progress-fill[style*="width: 50%"] {
  background-color: var(--color-gold-500);
}

.progress-fill[style*="width: 75%"] {
  background-color: var(--color-gold-400);
}

/* Responsividade */
@media (max-width: 768px) {
  .reading-progress {
    padding: 0.5rem;
  }
  
  .progress-bar {
    height: 3px;
  }
}
</style>
