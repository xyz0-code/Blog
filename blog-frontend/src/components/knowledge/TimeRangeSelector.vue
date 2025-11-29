<template>
  <div class="time-range-selector luxury-bg luxury-border p-3">
    <div class="selector-label text-small">PERÍODO:</div>
    <div class="range-buttons flex gap-2">
      <button 
        v-for="range in ranges" 
        :key="range.value" 
        @click="$emit('update:modelValue', range.value)" 
        :class="[
          'btn',
          'btn-sm',
          modelValue === range.value ? 'btn-primary' : 'btn-tertiary'
        ]"
      >
        {{ range.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TimeRange {
  value: string
  label: string
}

interface Props {
  modelValue: string
  ranges: TimeRange[]
}

defineProps<Props>()
defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.time-range-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 0;
}

.selector-label {
  font-weight: normal;
  color: var(--color-text-primary);
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.range-buttons {
  display: flex;
  flex-wrap: wrap;
}

/* Utilitários personalizados */
.flex {
  display: flex;
}

.gap-2 {
  gap: 0.5rem;
}

/* Responsividade */
@media (max-width: 768px) {
  .time-range-selector {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .selector-label {
    text-align: center;
  }

  .range-buttons {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .range-buttons {
    gap: 0.25rem;
  }
  
  .time-range-selector {
    padding: 0.75rem;
  }
}
</style>
