<template>
  <article class="post-card luxury-card luxury-border" @click="navigateToPost">
    <div class="card-content p-4">
      <!-- Cabeçalho do Post -->
      <div class="card-header flex justify-between items-center mb-3">
        <span class="post-category luxury-bg luxury-border px-3 py-1 text-small">
          {{ post.category }}
        </span>
        <span class="post-date text-xsmall">{{ formatDate(post.date) }}</span>
      </div>

      <!-- Título -->
      <h3 class="post-title h4 mb-2 gold-glow">
        {{ post.title }}
      </h3>

      <!-- Descrição/Resumo -->
      <p class="post-excerpt text-small mb-3">
        {{ post.excerpt }}
      </p>

      <!-- Rodapé - Autor e tempo de leitura -->
      <div class="card-footer luxury-border-top pt-3 flex justify-between items-center">
        <div class="author-info flex items-center gap-2">
          <div class="author-avatar luxury-bg luxury-border">
            <span>{{ getInitials(post.author) }}</span>
          </div>
          <span class="author-name text-small">{{ post.author }}</span>
        </div>
        <span class="read-time text-xsmall">{{ post.readTime }} MIN READ</span>
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
  cursor: pointer;
  transition: all 0.2s var(--ease-snappy);
  border-radius: 0;
}

.post-card:hover {
  border-color: var(--color-gold-300);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 219, 137, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post-category {
  color: var(--color-gold-300);
  letter-spacing: 0.5px;
}

.post-date {
  color: var(--color-text-secondary);
  letter-spacing: 0.5px;
}

.post-title {
  font-weight: normal;
  color: var(--color-text-primary);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  letter-spacing: 0.5px;
}

.post-excerpt {
  color: var(--color-text-secondary);
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: var(--color-gold-300);
  border-radius: 0;
}

.author-name {
  color: var(--color-text-primary);
  letter-spacing: 0.5px;
}

.read-time {
  color: var(--color-text-secondary);
  letter-spacing: 0.5px;
}

/* Utilitários personalizados */
.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.gap-2 {
  gap: 0.5rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.p-4 {
  padding: 1rem;
}

.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.pt-3 {
  padding-top: 0.75rem;
}

/* Responsividade */
@media (max-width: 768px) {
  .card-content {
    padding: 0.75rem;
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

@media (max-width: 480px) {
  .card-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .read-time {
    align-self: flex-end;
  }
}
</style>
