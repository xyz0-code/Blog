<template>
  <div class="posts-grid luxury-terminal">
    <div class="grid-container grid grid-3 gap-4">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state luxury-bg luxury-border p-6 text-center mt-4">
      <p class="text-small gold-glow">CARREGANDO POSTAGENS...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="posts.length === 0" class="empty-state luxury-card luxury-border text-center p-6 mt-4">
      <p class="h5 gold-gradient">NENHUMA POSTAGEM ENCONTRADA.</p>
      <p class="text-small mt-2">Tente ajustar os filtros ou verificar novamente mais tarde.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import PostCard from './PostCard.vue'

interface Post {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  readTime: number
}

interface Props {
  posts: Post[]
  loading?: boolean
}

defineProps<Props>()
</script>

<style scoped>
.posts-grid {
  font-family: 'PPMondwest', monospace;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.grid-container {
  display: grid;
}

.loading-state {
  border-radius: 0;
  transition: all 0.2s var(--ease-snappy);
}

.empty-state {
  border-radius: 0;
  transition: all 0.2s var(--ease-snappy);
}

.empty-state p {
  margin: 0;
  letter-spacing: 0.5px;
}

/* Utilitários personalizados */
.text-center {
  text-align: center;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-4 {
  margin-top: 1rem;
}

.p-6 {
  padding: 1.5rem;
}

/* Responsividade */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .empty-state {
    padding: 1rem;
    margin: 0;
  }

  .empty-state p {
    font-size: 1rem;
  }
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .grid-container {
    gap: 2rem;
  }
}

/* Ajuste para grid responsiva automática */
.grid.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

/* Aplicar fonte quando carregada */
.fonts-loaded .posts-grid {
  font-family: 'PPMondwest', monospace !important;
}
</style>
