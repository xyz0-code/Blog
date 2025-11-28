<template>
  <div class="post-details-page">

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <p>CARREGANDO POST...</p>
    </div>

    <!-- Conteúdo do Post -->
    <article v-else-if="post" class="post-article">

      <!-- Cabeçalho -->
      <header class="post-header">
        <span class="post-category">
          {{ post.category }}
        </span>

        <h1 class="post-title">
          {{ post.title }}
        </h1>

        <div class="post-meta">
          <div class="author-info">
            <div class="author-avatar">
              <span>{{ getInitials(post.author) }}</span>
            </div>
            <div class="author-details">
              <p class="author-name">{{ post.author }}</p>
              <p class="post-date">{{ formatDate(post.date) }} • {{ post.readTime }} MIN READ</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Conteúdo -->
      <div class="post-content">
        <p class="post-excerpt">
          {{ post.excerpt }}
        </p>

        <!-- Conteúdo específico de cada post -->
        <div class="content-body">
          <h2>CONTEÚDO EXCLUSIVO DO POST {{ post.id }}</h2>
          <p>Este é o conteúdo único do post <strong>"{{ post.title }}"</strong>.</p>
          <p>Autor: <strong>{{ post.author }}</strong></p>
          <p>Categoria: <strong>{{ post.category }}</strong></p>
          <p>Tempo de leitura: <strong>{{ post.readTime }} MINUTOS</strong></p>
        </div>
      </div>

      <!-- Rodapé do Post -->
      <footer class="post-footer">
        <div class="footer-content">
          <button @click="$router.push('/posts')" class="back-button">
            ← VOLTAR PARA POSTAGENS
          </button>

          <div class="action-buttons">
            <button class="action-button">
              📤
            </button>
          </div>
        </div>
      </footer>
    </article>

    <!-- Post não encontrado -->
    <div v-else class="not-found">
      <p>POST NÃO ENCONTRADO.</p>
      <button @click="$router.push('/posts')" class="back-to-posts">
        VOLTAR PARA POSTAGENS
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

interface Post {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  readTime: number
  content?: string
}

const route = useRoute()
const loading = ref(true)
const post = ref<Post | null>(null)

// Dados mockados - todos os posts disponíveis
const allPosts: Post[] = [
  {
    id: '1',
    title: 'Introdução ao Vue 3 e Composition API',
    excerpt: 'Aprenda os conceitos básicos do Vue 3 e como utilizar a Composition API para criar componentes mais organizados e reutilizáveis.',
    category: 'Vue.js',
    date: '2024-01-15',
    author: 'João Silva',
    readTime: 5
  },
  {
    id: '2',
    title: 'TypeScript para Desenvolvedores JavaScript',
    excerpt: 'Descubra como o TypeScript pode melhorar sua experiência de desenvolvimento e reduzir bugs em suas aplicações.',
    category: 'TypeScript',
    date: '2024-01-10',
    author: 'Maria Santos',
    readTime: 8
  },
  {
    id: '3',
    title: 'Construindo APIs REST com C# e .NET',
    excerpt: 'Guia completo para criar APIs REST robustas utilizando C# e o framework .NET seguindo as melhores práticas.',
    category: 'C#',
    date: '2024-01-05',
    author: 'Pedro Oliveira',
    readTime: 12
  },
  {
    id: '4',
    title: 'Gerenciamento de Estado com Pinia',
    excerpt: 'Entenda como implementar e utilizar o Pinia para gerenciamento de estado em aplicações Vue.js modernas.',
    category: 'Vue.js',
    date: '2024-01-03',
    author: 'Ana Costa',
    readTime: 6
  },
  {
    id: '5',
    title: 'Padrões de Design em Aplicações .NET',
    excerpt: 'Explore os principais padrões de design e arquitetura para criar aplicações .NET escaláveis e maintaináveis.',
    category: 'C#',
    date: '2023-12-28',
    author: 'Carlos Lima',
    readTime: 10
  },
  {
    id: '6',
    title: 'Testes Unitários com Vitest',
    excerpt: 'Aprenda a escrever testes unitários eficientes para seus componentes Vue.js utilizando o framework Vitest.',
    category: 'Testing',
    date: '2023-12-20',
    author: 'Fernanda Rocha',
    readTime: 7
  }
]

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

// Função para carregar o post baseado no ID da rota
const loadPost = () => {
  loading.value = true
  const postId = route.params.id as string

  // Simula busca assíncrona
  setTimeout(() => {
    // Busca o post correto pelo ID
    const foundPost = allPosts.find(p => p.id === postId)
    post.value = foundPost || null
    loading.value = false
  }, 500)
}

// Carrega o post quando o componente é montado
onMounted(() => {
  loadPost()
})

// Observa mudanças na rota (quando clica em outro post)
watch(
  () => route.params.id,
  () => {
    loadPost()
  }
)
</script>

<style scoped>
.post-details-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.loading-state {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-secondary);
  letter-spacing: 0.5px;
}

.post-article {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
}

.post-header {
  padding: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.post-category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--color-bg-primary);
  color: var(--color-gold-300);
  border: 1px solid var(--color-border);
  font-size: 0.875rem;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
}

.post-title {
  font-size: 2rem;
  font-weight: normal;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  font-family: var(--font-mono);
  line-height: 1.3;
  letter-spacing: 0.5px;
}

.post-meta {
  margin-top: 1.5rem;
}

.author-info {
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 2.5rem;
  height: 2.5rem;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  font-size: 0.875rem;
  color: var(--color-gold-300);
  font-family: var(--font-mono);
}

.author-name {
  font-weight: normal;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
  letter-spacing: 0.5px;
}

.post-date {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  letter-spacing: 0.5px;
}

.post-content {
  padding: 2rem;
}

.post-excerpt {
  font-size: 1.125rem;
  color: var(--color-text-primary);
  line-height: 1.6;
  margin-bottom: 2rem;
  text-transform: none;
  letter-spacing: 0.5px;
}

.content-body {
  color: var(--color-text-primary);
  line-height: 1.6;
  text-transform: none;
}

.content-body h2 {
  font-size: 1.5rem;
  font-weight: normal;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.content-body p {
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
}

.content-body strong {
  font-weight: normal;
  color: var(--color-gold-300);
}

.post-footer {
  padding: 1.5rem 2rem;
  background: var(--color-bg-primary);
  border-top: 1px solid var(--color-border);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-button {
  color: var(--color-text-primary);
  background: none;
  border: none;
  font-family: var(--font-mono);
  font-size: 1rem;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s var(--ease-snappy);
}

.back-button:hover {
  text-decoration: none;
  color: var(--color-gold-300);
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  background: none;
  border: 1px solid var(--color-border);
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.5rem;
  transition: all 0.2s var(--ease-snappy);
}

.action-button:hover {
  background: var(--color-gold-300);
  border-color: var(--color-gold-300);
  color: var(--color-bg-primary);
}

.not-found {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
}

.back-to-posts {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  font-family: var(--font-mono);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s var(--ease-snappy);
}

.back-to-posts:hover {
  background: var(--color-gold-300);
  color: var(--color-bg-primary);
  border-color: var(--color-gold-300);
}

/* Responsividade */
@media (max-width: 768px) {
  .post-details-page {
    padding: 1rem 0.5rem;
  }

  .post-header {
    padding: 1.5rem;
  }

  .post-title {
    font-size: 1.5rem;
  }

  .post-content {
    padding: 1.5rem;
  }

  .post-excerpt {
    font-size: 1rem;
  }

  .post-footer {
    padding: 1rem 1.5rem;
  }

  .footer-content {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .action-buttons {
    align-self: flex-end;
  }
}
</style>
