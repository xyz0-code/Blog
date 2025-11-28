<template>
  <div class="acervo-page">
    <!-- Header -->
    <div class="page-header">
      <h1 class="page-title">ACERVO PESSOAL</h1>
      <p class="page-subtitle">
        MEU UNIVERSO LITERÁRIO - LIVROS LIDOS, EM LEITURA E NA LISTA DE DESEJOS
      </p>
    </div>

    <!-- Estatísticas -->
    <div class="stats-section">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ totalBooks }}</div>
          <div class="stat-label">TOTAL DE LIVROS</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ readingBooks }}</div>
          <div class="stat-label">LENDO AGORA</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ readBooks }}</div>
          <div class="stat-label">JÁ LIDOS</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ totalPages.toLocaleString() }}</div>
          <div class="stat-label">PÁGINAS</div>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="filters-section">
      <div class="search-box">
        <input v-model="filters.searchQuery" type="text" placeholder="BUSCAR POR TÍTULO, AUTOR OU DESCRIÇÃO..."
          class="search-input">
      </div>

      <div class="filter-buttons">
        <button v-for="status in statusOptions" :key="status.value" @click="toggleStatus(status.value)"
          :class="['status-btn', filters.status.includes(status.value) ? 'active' : 'inactive']">
          {{ status.label }}
        </button>
      </div>
    </div>

    <!-- Grid de Livros -->
    <div class="books-section">
      <div class="books-container">
        <BookCard v-for="book in filteredBooks" :key="book.id" :book="book" />
      </div>

      <!-- Empty State -->
      <div v-if="filteredBooks.length === 0" class="empty-state">
        <p>NENHUM LIVRO ENCONTRADO COM OS FILTROS ATUAIS.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BookCard from './components/BookCard.vue'
import { mockBooks } from '@/data/mockBooksData'
import type { Book, BookFilters } from '@/types/books'

// Refs
const books = ref<Book[]>([])
const filters = ref<BookFilters>({
  status: ['reading', 'read', 'to-read'],
  categories: [],
  searchQuery: ''
})

// Opções de status
const statusOptions = [
  { value: 'reading', label: 'LENDO' },
  { value: 'read', label: 'LIDOS' },
  { value: 'to-read', label: 'PARA LER' }
]

// Computed
const filteredBooks = computed(() => {
  return books.value.filter(book => {
    // Filtro por status
    if (!filters.value.status.includes(book.status)) {
      return false
    }

    // Filtro por busca
    if (filters.value.searchQuery) {
      const query = filters.value.searchQuery.toLowerCase()
      const searchable = `${book.title} ${book.author} ${book.description} ${book.categories.join(' ')}`.toLowerCase()
      if (!searchable.includes(query)) {
        return false
      }
    }

    return true
  })
})

// Estatísticas
const totalBooks = computed(() => books.value.length)
const readingBooks = computed(() => books.value.filter(b => b.status === 'reading').length)
const readBooks = computed(() => books.value.filter(b => b.status === 'read').length)
const totalPages = computed(() => books.value.reduce((sum, book) => sum + book.pages, 0))

// Métodos
const toggleStatus = (status: string) => {
  const index = filters.value.status.indexOf(status)
  if (index > -1) {
    filters.value.status.splice(index, 1)
  } else {
    filters.value.status.push(status)
  }
}

// Lifecycle
onMounted(() => {
  books.value = mockBooks
})
</script>

<style scoped>
.acervo-page {
  width: 100%;
  max-width: none;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.page-title {
  font-size: 2.5rem;
  font-weight: normal;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
  font-family: var(--font-mono);
  letter-spacing: 1px;
}

.page-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
  letter-spacing: 0.5px;
}

.stats-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-card {
  background: var(--color-bg-primary);
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  text-align: center;
  transition: all 0.2s var(--ease-snappy);
}

.stat-card:hover {
  border-color: var(--color-gold-300);
  transform: translateY(-2px);
}

.stat-value {
  font-size: 2rem;
  font-weight: normal;
  color: var(--color-gold-300);
  margin-bottom: 0.5rem;
  font-family: var(--font-mono);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filters-section {
  background: var(--color-bg-secondary);
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  font-size: 1rem;
  font-family: var(--font-mono);
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
  font-size: 0.875rem;
  font-weight: normal;
  cursor: pointer;
  transition: all 0.2s var(--ease-snappy);
  border: 1px solid var(--color-border);
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

.books-section {
  margin-bottom: 2rem;
  width: 100%;
}

.books-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
  justify-items: stretch;
  max-width: 1200px;
  margin: 0 auto;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-secondary);
  font-size: 1.125rem;
  border: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
  max-width: 1200px;
  margin: 0 auto;
  letter-spacing: 0.5px;
}

/* Responsividade */
@media (max-width: 768px) {
  .acervo-page {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .books-container {
    grid-template-columns: 1fr;
  }

  .filters-section {
    padding: 1rem;
  }
}

@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .books-container {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
  }
}

@media (min-width: 1200px) {
  .acervo-page {
    padding: 2rem 3rem;
  }

  .books-container {
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  }
}

@media (min-width: 1400px) {
  .books-container {
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 2.5rem;
  }
}
</style>
