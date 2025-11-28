<template>
  <div class="time-range-selector">
    <div class="selector-label">Período:</div>
    <div class="range-buttons">
      <button v-for="range in ranges" :key="range.value" @click="$emit('update:modelValue', range.value)" :class="[
        'range-button',
        modelValue === range.value ? 'active' : 'inactive'
      ]">
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
  background-color: var(--color-bg-secondary);
  border-radius: 0;
  padding: 1rem;
  border: 1px solid var(--color-border);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.selector-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-primary);
}

.range-buttons {
  display: flex;
  gap: 0.5rem;
}

.range-button {
  padding: 0.5rem 1rem;
  border-radius: 0;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s var(--ease-snappy);
  border: 1px solid var(--color-border);
  cursor: pointer;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.range-button.active {
  background-color: var(--color-gold-300);
  color: var(--color-bg-primary);
  border-color: var(--color-gold-300);
}

.range-button.inactive {
  background-color: var(--color-bg-primary);
  color: var(--color-text-secondary);
  border-color: var(--color-border);
}

.range-button.inactive:hover {
  background-color: var(--color-dark-200);
  color: var(--color-text-primary);
  border-color: var(--color-gold-300);
}
</style>
