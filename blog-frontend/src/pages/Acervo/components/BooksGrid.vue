<template>
  <div class="books-grid luxury-terminal">
    <!-- Filtros Rápidos -->
    <div class="filters-section luxury-bg luxury-border p-4 mb-6">
      <div class="search-box mb-4">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="BUSCAR LIVROS..." 
          class="search-input luxury-input"
        >
      </div>

      <div class="filter-buttons flex gap-2 flex-wrap">
        <button 
          v-for="status in statusOptions" 
          :key="status.value" 
          @click="toggleStatus(status.value)" 
          :class="[
            'btn',
            'btn-sm',
            activeStatuses.includes(status.value) ? 'btn-primary' : 'btn-tertiary'
          ]"
        >
          {{ status.label }}
        </button>
      </div>
    </div>

    <!-- Grid de Livros -->
    <div class="grid-container">
      <div class="books-container grid grid-3 gap-4">
        <BookCard v-for="book in filteredBooks" :key="book.id" :book="book" />
      </div>

      <!-- Estado Vazio -->
      <div v-if="filteredBooks.length === 0" class="empty-state luxury-card luxury-border text-center p-6">
        <p class="h5 gold-gradient mb-2">NENHUM LIVRO ENCONTRADO</p>
        <p class="text-small">Tente ajustar os filtros de busca ou status.</p>
      </div>
    </div>

    <!-- Contador de Resultados -->
    <div class="results-count luxury-border-top pt-4 mt-6 text-center">
      <p class="text-small">EXIBINDO {{ filteredBooks.length }} DE {{ books.length }} LIVROS</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type PropType } from 'vue'
import BookCard from './BookCard.vue'
import type { Book } from '@/types/books'

interface Props {
  books: Book[]
}

const props = defineProps({
  books: {
    type: Array as PropType<Book[]>,
    required: true
  }
})

// Refs para filtros
const searchQuery = ref('')
const activeStatuses = ref<string[]>(['reading', 'read', 'to-read'])

// Opções de status
const statusOptions = [
  { value: 'reading', label: 'LENDO' },
  { value: 'read', label: 'LIDOS' },
  { value: 'to-read', label: 'PARA LER' }
]

// Computed para livros filtrados
const filteredBooks = computed(() => {
  return props.books.filter(book => {
    // Filtro por status
    if (!activeStatuses.value.includes(book.status)) {
      return false
    }

    // Filtro por busca
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      const searchable = `${book.title} ${book.author} ${book.description} ${book.categories?.join(' ') || ''}`.toLowerCase()
      if (!searchable.includes(query)) {
        return false
      }
    }

    return true
  })
})

// Métodos
const toggleStatus = (status: string) => {
  const index = activeStatuses.value.indexOf(status)
  if (index > -1) {
    activeStatuses.value.splice(index, 1)
  } else {
    activeStatuses.value.push(status)
  }
}

// Expor métodos se necessário
defineExpose({
  filteredBooks
})
</script>

<style scoped>
.books-grid {
  font-family: 'PPMondwest', monospace;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: 100%;
}

.filters-section {
  border-radius: 0;
}

.search-input {
  width: 100%;
  font-family: 'PPMondwest', monospace;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-buttons {
  display: flex;
}

.books-container {
  display: grid;
  width: 100%;
  justify-items: stretch;
  align-items: start;
}

.empty-state {
  border-radius: 0;
  transition: all 0.2s var(--ease-snappy);
}

.empty-state p {
  letter-spacing: 0.5px;
}

.results-count {
  border-top: 1px solid var(--color-border);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  letter-spacing: 0.5px;
}

/* Utilitários personalizados */
.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-4 {
  gap: 1rem;
}

.text-center {
  text-align: center;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.p-4 {
  padding: 1rem;
}

.p-6 {
  padding: 1.5rem;
}

.pt-4 {
  padding-top: 1rem;
}

/* Aplicar fonte quando carregada */
.fonts-loaded .books-grid {
  font-family: 'PPMondwest', monospace !important;
}

/* Ajustes para diferentes tamanhos de tela */
@media (max-width: 768px) {
  .books-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .filters-section {
    padding: 0.75rem;
  }

  .filter-buttons {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .books-container {
    grid-template-columns: 1fr;
  }

  .filter-buttons {
    gap: 0.25rem;
  }
}

@media (min-width: 1200px) {
  .books-container {
    gap: 2rem;
  }
}

/* Grid responsivo automático */
.grid.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
</style>
