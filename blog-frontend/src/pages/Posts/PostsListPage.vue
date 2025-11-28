<template>
  <div class="posts-list-page">
    <!-- Cabeçalho da Página -->
    <header class="page-header">
      <h1 class="page-title">Postagens</h1>
      <p class="page-subtitle">
        Confira os últimos artigos, tutoriais e pensamentos sobre desenvolvimento e tecnologia.
      </p>
    </header>

    <!-- Filtros e Busca -->
    <div class="filters-section">
      <div class="search-box">
        <input v-model="searchTerm" type="text" placeholder="BUSCAR POSTAGENS..." class="search-input">
      </div>

      <div class="filter-buttons">
        <button v-for="category in categories" :key="category" @click="toggleCategory(category)" :class="[
          'category-btn',
          selectedCategories.includes(category)
            ? 'active'
            : 'inactive'
        ]">
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Grid de Postagens -->
    <PostsGrid :posts="filteredPosts" :loading="loading" />

    <!-- Paginação -->
    <div class="pagination">
      <button class="load-more-btn">
        CARREGAR MAIS
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PostsGrid from '@/components/posts/PostsGrid.vue'

interface Post {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  readTime: number
}

const loading = ref(true)
const searchTerm = ref('')
const selectedCategories = ref<string[]>([])

// Dados mockados
const posts = ref<Post[]>([
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
])

// Categorias disponíveis
const categories = computed(() => {
  const allCategories = posts.value.map(post => post.category)
  return [...new Set(allCategories)]
})

// Posts filtrados
const filteredPosts = computed(() => {
  let filtered = posts.value

  // Filtro por busca
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(post =>
      post.title.toLowerCase().includes(term) ||
      post.excerpt.toLowerCase().includes(term) ||
      post.author.toLowerCase().includes(term)
    )
  }

  // Filtro por categorias
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(post =>
      selectedCategories.value.includes(post.category)
    )
  }

  return filtered
})

const toggleCategory = (category: string) => {
  const index = selectedCategories.value.indexOf(category)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(category)
  }
}

onMounted(() => {
  // Simula carregamento de dados
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<style scoped>
.posts-list-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.page-title {
  font-size: 2rem;
  font-weight: normal;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
  font-family: var(--font-mono);
  letter-spacing: 1px;
}

.page-subtitle {
  font-size: 1rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
  letter-spacing: 0.5px;
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

.category-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s var(--ease-snappy);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.category-btn.active {
  background: var(--color-gold-300);
  color: var(--color-bg-primary);
  border-color: var(--color-gold-300);
}

.category-btn.inactive {
  background: var(--color-bg-primary);
  color: var(--color-text-secondary);
  border-color: var(--color-border);
}

.category-btn:hover {
  background: var(--color-dark-200);
  color: var(--color-text-primary);
  border-color: var(--color-gold-300);
}

.pagination {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}

.load-more-btn {
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  font-family: var(--font-mono);
  cursor: pointer;
  transition: all 0.2s var(--ease-snappy);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.load-more-btn:hover {
  background: var(--color-gold-300);
  color: var(--color-bg-primary);
  border-color: var(--color-gold-300);
}

/* Responsividade */
@media (max-width: 768px) {
  .posts-list-page {
    padding: 1rem 0.5rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .page-subtitle {
    font-size: 0.875rem;
  }

  .filters-section {
    padding: 1rem;
  }

  .filter-buttons {
    justify-content: center;
  }
}
</style>
