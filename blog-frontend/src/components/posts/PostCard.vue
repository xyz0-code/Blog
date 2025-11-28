<template>
  <article class="post-card" @click="navigateToPost">
    <div class="card-content">
      <!-- Cabeçalho do Post -->
      <div class="card-header">
        <span class="post-category">
          {{ post.category }}
        </span>
        <span class="post-date">{{ formatDate(post.date) }}</span>
      </div>

      <!-- Título -->
      <h3 class="post-title">
        {{ post.title }}
      </h3>

      <!-- Descrição/Resumo -->
      <p class="post-excerpt">
        {{ post.excerpt }}
      </p>

      <!-- Rodapé - Autor e tempo de leitura -->
      <div class="card-footer">
        <div class="author-info">
          <div class="author-avatar">
            <span>{{ getInitials(post.author) }}</span>
          </div>
          <span class="author-name">{{ post.author }}</span>
        </div>
        <span class="read-time">{{ post.readTime }} min read</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

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
  post: Post
}

const props = defineProps<Props>()
const router = useRouter()

const navigateToPost = () => {
  router.push(`/posts/${props.post.id}`)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR')
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}
</script>

<style scoped>
.post-card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all 0.2s var(--ease-snappy);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.post-card:hover {
  border-color: var(--color-gold-300);
  transform: translateY(-2px);
}

.card-content {
  padding: 1.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.post-category {
  padding: 0.25rem 0.75rem;
  background: var(--color-bg-primary);
  color: var(--color-gold-300);
  border: 1px solid var(--color-border);
  font-size: 0.875rem;
  letter-spacing: 0.5px;
}

.post-date {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  letter-spacing: 0.5px;
}

.post-title {
  font-size: 1.25rem;
  font-weight: normal;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
  line-height: 1.3;
  font-family: var(--font-mono);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  letter-spacing: 0.5px;
}

.post-excerpt {
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-transform: none;
  letter-spacing: 0.5px;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.author-info {
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 2rem;
  height: 2rem;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-gold-300);
  font-family: var(--font-mono);
}

.author-name {
  font-size: 0.875rem;
  color: var(--color-text-primary);
  letter-spacing: 0.5px;
}

.read-time {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  letter-spacing: 0.5px;
}

/* Responsividade */
@media (max-width: 768px) {
  .card-content {
    padding: 1rem;
  }

  .post-title {
    font-size: 1.125rem;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .post-date {
    align-self: flex-end;
  }
}
</style>
