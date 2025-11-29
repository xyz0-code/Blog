<template>
  <div class="book-card luxury-card luxury-border" :class="`status-${book.status}`">
    <div class="book-cover relative h-48 flex items-center justify-center text-xl luxury-border-bottom"
      :class="book.coverUrl ? 'has-image' : 'no-image luxury-bg'">
      <div class="cover-placeholder text-center font-mono gold-glow" v-if="!book.coverUrl">
        {{book.title.split(' ').map(w => w[0]).join('').toUpperCase()}}
      </div>
      <img v-else :src="book.coverUrl" :alt="book.title" class="cover-image w-full h-full object-cover">

      <div class="book-status absolute top-2 right-2 text-xs uppercase luxury-border px-2 py-1 font-mono luxury-bg">
        {{ statusLabel }}
      </div>
    </div>

    <div class="book-content p-4">
      <h3 class="book-title h4 mb-2 gold-glow">{{ book.title }}</h3>
      <p class="book-author text-small italic mb-3">{{ book.author }}</p>
      <p class="book-description text-small leading-relaxed mb-4 line-clamp-3">
        {{ book.description }}
      </p>

      <div class="book-meta flex justify-between items-center mb-4 text-small">
        <span class="pages">{{ book.pages }} PÁGINAS</span>
        <span class="rating gold-gradient" v-if="book.rating">
          ⭐ {{ book.rating }}/5
        </span>
      </div>

      <div class="book-categories flex flex-wrap gap-1 mb-4">
        <span v-for="category in book.categories" :key="category"
          class="category-tag text-xsmall px-2 py-1 luxury-border luxury-bg font-mono">
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
  overflow: hidden;
  font-family: 'PPMondwest', monospace;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s var(--ease-snappy);
  border-radius: 0;
}

.book-card:hover {
  border-color: var(--color-gold-300);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 219, 137, 0.1);
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

/* Utilitários personalizados */
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.top-2 {
  top: 0.5rem;
}

.right-2 {
  right: 0.5rem;
}

.w-full {
  width: 100%;
}

.h-48 {
  height: 12rem;
}

.h-full {
  height: 100%;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.flex-wrap {
  flex-wrap: wrap;
}

.gap-1 {
  gap: 0.25rem;
}

.text-center {
  text-align: center;
}

.text-xl {
  font-size: 1.25rem;
}

.text-xs {
  font-size: 0.75rem;
}

.text-sm {
  font-size: 0.875rem;
}

.leading-tight {
  line-height: 1.25;
}

.leading-relaxed {
  line-height: 1.625;
}

.italic {
  font-style: italic;
}

.object-cover {
  object-fit: cover;
}

/* Aplicar fonte quando carregada */
.fonts-loaded .book-card {
  font-family: 'PPMondwest', monospace !important;
}

/* Responsividade */
@media (max-width: 768px) {
  .book-content {
    padding: 0.75rem;
  }

  .h-48 {
    height: 10rem;
  }

  .text-xl {
    font-size: 1.125rem;
  }
}
</style>
