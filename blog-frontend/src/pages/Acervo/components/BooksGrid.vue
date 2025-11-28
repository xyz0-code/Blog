<template>
  <div class="books-grid">
    <!-- Filtros Rápidos -->
    <div class="filters-section">
      <div class="search-box">
        <input v-model="searchQuery" type="text" placeholder="BUSCAR LIVROS..." class="search-input">
      </div>

      <div class="filter-buttons">
        <button v-for="status in statusOptions" :key="status.value" @click="toggleStatus(status.value)" :class="[
          'status-btn',
          activeStatuses.includes(status.value) ? 'active' : 'inactive'
        ]">
          {{ status.label }}
        </button>
      </div>
    </div>

    <!-- Grid de Livros -->
    <div class="grid-container">
      <div class="books-container">
        <BookCard v-for="book in filteredBooks" :key="book.id" :book="book" />
      </div>

      <!-- Estado Vazio -->
      <div v-if="filteredBooks.length === 0" class="empty-state">
        <p>NENHUM LIVRO ENCONTRADO COM OS FILTROS ATUAIS.</p>
      </div>
    </div>

    <!-- Contador de Resultados -->
    <div class="results-count">
      <p>EXIBINDO {{ filteredBooks.length }} DE {{ books.length }} LIVROS</p>
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
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: 100%;
}

.filters-section {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  font-family: var(--font-mono);
  font-size: 1rem;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.search-input:focus {
  outline: 1px solid var(--color-gold-300);
  border-color: var(--color-gold-300);
}

.search-input::placeholder {
  color: var(--color-text-secondary);
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.status-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s var(--ease-snappy);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-btn.active {
  background: var(--color-gold-300);
  color: var(--color-bg-primary);
  border-color: var(--color-gold-300);
}

.status-btn.inactive {
  background: var(--color-bg-primary);
  color: var(--color-text-secondary);
  border-color: var(--color-border);
}

.status-btn:hover {
  background: var(--color-dark-200);
  color: var(--color-text-primary);
  border-color: var(--color-gold-300);
}

.grid-container {
  width: 100%;
}

.books-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  justify-items: stretch;
  align-items: start;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-secondary);
  font-size: 1.125rem;
  border: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
  width: 100%;
  letter-spacing: 0.5px;
}

.results-count {
  margin-top: 2rem;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  border-top: 1px solid var(--color-border);
  padding-top: 1rem;
  text-align: center;
  width: 100%;
  letter-spacing: 0.5px;
}

/* Ajustes para diferentes tamanhos de tela */
@media (max-width: 768px) {
  .books-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .filters-section {
    padding: 1rem;
  }

  .filter-buttons {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .books-container {
    grid-template-columns: 1fr;
  }

  .status-btn {
    flex: 1;
    min-width: 100px;
    text-align: center;
  }
}

@media (min-width: 1200px) {
  .books-container {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
}

@media (min-width: 1400px) {
  .books-container {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}
</style>
