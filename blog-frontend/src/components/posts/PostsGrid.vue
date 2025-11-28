<template>
  <div class="posts-grid">
    <div class="grid-container">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <p>Carregando postagens...</p>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && posts.length === 0" class="empty-state">
      <p>Nenhuma postagem encontrada.</p>
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
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.loading-state {
  text-align: center;
  padding: 2rem;
  color: var(--color-text-secondary);
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
}

.empty-state p {
  font-size: 1.125rem;
  margin: 0;
  letter-spacing: 0.5px;
}

/* Responsividade */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .empty-state {
    padding: 2rem;
    margin: 0 1rem;
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
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
</style>
