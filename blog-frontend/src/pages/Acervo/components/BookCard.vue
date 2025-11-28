<template>
  <div class="book-card" :class="`status-${book.status}`">
    <div class="book-cover relative h-48 flex items-center justify-center text-xl border-b"
      :class="book.coverUrl ? 'has-image' : 'no-image'">
      <div class="cover-placeholder text-center font-mono" v-if="!book.coverUrl">
        {{book.title.split(' ').map(w => w[0]).join('').toUpperCase()}}
      </div>
      <img v-else :src="book.coverUrl" :alt="book.title" class="cover-image w-full h-full object-cover">

      <div class="book-status absolute top-2 right-2 text-xs uppercase border px-2 py-1 font-mono">
        {{ statusLabel }}
      </div>
    </div>

    <div class="book-content p-4">
      <h3 class="book-title text-xl font-mono mb-2 leading-tight">{{ book.title }}</h3>
      <p class="book-author text-base italic mb-4">{{ book.author }}</p>
      <p class="book-description text-sm leading-relaxed mb-4 line-clamp-3">
        {{ book.description }}
      </p>

      <div class="book-meta flex justify-between items-center mb-4 text-sm">
        <span class="pages">{{ book.pages }} PÁGINAS</span>
        <span class="rating" v-if="book.rating">
          ⭐ {{ book.rating }}/5
        </span>
      </div>

      <div class="book-categories flex flex-wrap gap-1 mb-4">
        <span v-for="category in book.categories" :key="category"
          class="category-tag text-xs px-2 py-1 border font-mono">
          {{ category }}
        </span>
      </div>

      <ReadingProgress v-if="book.status === 'reading'" :progress="book.progress || 0" :current-page="book.currentPage"
        :total-pages="book.pages" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Book } from '@/types/books'
import ReadingProgress from './ReadingProgress.vue'

interface Props {
  book: Book
}

const props = defineProps<Props>()

const statusLabels = {
  'read': 'LIDO',
  'reading': 'LENDO',
  'to-read': 'PARA LER'
}

const statusLabel = computed(() => statusLabels[props.book.status])
</script>

<style scoped>
.book-card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  overflow: hidden;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s var(--ease-snappy);
}

.book-card:hover {
  border-color: var(--color-gold-300);
  transform: translateY(-2px);
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Book Cover */
.book-cover {
  background: var(--color-bg-primary);
  border-color: var(--color-border);
}

.book-cover.no-image {
  color: var(--color-text-secondary);
}

.book-cover.has-image {
  color: var(--color-text-primary);
}

.cover-placeholder {
  opacity: 0.7;
  letter-spacing: 1px;
}

.cover-image {
  filter: grayscale(20%);
}

/* Book Status */
.book-status {
  background: var(--color-bg-primary);
  color: var(--color-gold-300);
  border-color: var(--color-border);
  letter-spacing: 0.5px;
}

/* Book Content */
.book-title {
  color: var(--color-text-primary);
  letter-spacing: 0.5px;
}

.book-author {
  color: var(--color-text-secondary);
  letter-spacing: 0.5px;
}

.book-description {
  color: var(--color-text-primary);
  text-transform: none;
  letter-spacing: 0.5px;
}

.book-meta {
  color: var(--color-text-secondary);
}

.book-meta .pages {
  letter-spacing: 0.5px;
}

.book-meta .rating {
  color: var(--color-gold-300);
  letter-spacing: 0.5px;
}

/* Categories */
.category-tag {
  background: var(--color-bg-primary);
  color: var(--color-gold-300);
  border-color: var(--color-border);
  letter-spacing: 0.5px;
}

/* Estilos específicos para status com bordas laterais */
.book-card.status-reading {
  border-left: 3px solid var(--color-gold-300);
}

.book-card.status-read {
  border-left: 3px solid var(--color-gold-400);
}

.book-card.status-to-read {
  border-left: 3px solid var(--color-gold-700);
}
</style>
