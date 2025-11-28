<template>
  <div class="home-page">
    <!-- Cabeçalho Centralizado -->
    <div class="page-header">
      <h1 class="page-title">Meu Espaço Digital</h1>
      <p class="page-subtitle">
        Registro do meu progresso e atividades de conhecimento
      </p>
    </div>

    <!-- Container Principal Centralizado -->
    <div class="main-container">
      <!-- Conteúdo com Sidebar -->
      <div class="home-content">
        <!-- Sidebar com Perfil -->
        <aside class="profile-sidebar">
          <div class="profile-card">
            <div class="profile-header">
              <div class="profile-avatar">
                <span>EU</span>
              </div>
              <div class="profile-info">
                <h2 class="profile-name">Seu Nome</h2>
                <p class="profile-title">Desenvolvedor & Estudante</p>
              </div>
            </div>

            <div class="profile-stats">
              <div class="stat-item">
                <span class="stat-value">{{ totalPosts }}</span>
                <span class="stat-label">POSTAGENS</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ totalBooks }}</span>
                <span class="stat-label">LIVROS</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ readingNow }}</span>
                <span class="stat-label">LENDO</span>
              </div>
            </div>

            <div class="profile-bio">
              <p>Focado em criar experiências digitais simples e funcionais.</p>
            </div>
          </div>
        </aside>

        <!-- Conteúdo Principal -->
        <main class="main-content">
          <!-- Seção Estudando -->
          <div class="studying-section" v-if="currentReadingBooks.length > 0">
            <div class="section-header">
              <h2 class="section-title">📚 Estudando Atualmente</h2>
              <p class="section-subtitle">Livros em andamento no momento</p>
            </div>

            <div class="books-list">
              <div v-for="book in currentReadingBooks" :key="book.id" class="book-item">
                <span class="book-title">{{ book.title }}</span>
                <span class="book-author">por {{ book.author }}</span>
                <div class="reading-progress" v-if="book.progress">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: `${book.progress}%` }"></div>
                  </div>
                  <span class="progress-text">{{ book.progress }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Timeline de Conhecimento -->
          <div class="knowledge-section">
            <KnowledgeTimeline :activities="activities" />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import KnowledgeTimeline from '@/components/knowledge/KnowledgeTimeline.vue'
import { mockActivities } from '@/data/mockKnowledgeData'
import { mockBooks } from '@/data/mockBooksData'
import type { KnowledgeActivity } from '@/types/knowledge'
import type { Book } from '@/types/books'

// Dados das atividades
const activities = ref<KnowledgeActivity[]>([])

// Dados mockados para estatísticas
const totalPosts = ref(24)
const totalBooks = ref(18)
const readingNow = ref(3)

// Computed para livros atualmente sendo lidos
const currentReadingBooks = computed(() => {
  return mockBooks.filter(book => book.status === 'reading')
})

// Lifecycle
onMounted(() => {
  // Carregar dados mockados diretamente
  activities.value = mockActivities
})
</script>

<style scoped>
.home-page {
  width: 100%;
  min-height: 100vh;
  background: var(--color-bg-primary);
  font-family: var(--font-mono);
  color: var(--color-text-primary);
  text-transform: uppercase;
}

/* Cabeçalho Centralizado */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 1rem 1rem 1rem;
  border-bottom: 1px solid var(--color-border);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
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

/* Container Principal Centralizado */
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Layout de duas colunas */
.home-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  align-items: start;
}

/* Sidebar de Perfil */
.profile-sidebar {
  position: sticky;
  top: 2rem;
}

.profile-card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  padding: 1.5rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.profile-avatar {
  width: 60px;
  height: 60px;
  background: var(--color-dark-100);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: var(--color-gold-300);
  font-weight: normal;
  font-family: var(--font-mono);
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 1.25rem;
  font-weight: normal;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
  font-family: var(--font-mono);
  letter-spacing: 0.5px;
}

.profile-title {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
  letter-spacing: 0.5px;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.25rem;
  font-weight: normal;
  color: var(--color-gold-300);
  margin-bottom: 0.25rem;
  font-family: var(--font-mono);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.profile-bio {
  border-top: 1px solid var(--color-border);
  padding-top: 1rem;
}

.profile-bio p {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin: 0;
  text-align: center;
  letter-spacing: 0.5px;
}

/* Conteúdo Principal */
.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Seção Estudando */
.studying-section {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  padding: 1.5rem;
}

.section-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: normal;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
  font-family: var(--font-mono);
  letter-spacing: 0.5px;
}

.section-subtitle {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  letter-spacing: 0.5px;
}

.books-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.book-item {
  background: var(--color-dark-100);
  border: 1px solid var(--color-border);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.2s var(--ease-snappy);
}

.book-item:hover {
  border-color: var(--color-gold-300);
}

.book-title {
  font-size: 1.125rem;
  font-weight: normal;
  color: var(--color-text-primary);
  font-family: var(--font-mono);
  letter-spacing: 0.5px;
}

.book-author {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  font-style: italic;
  letter-spacing: 0.5px;
}

.reading-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: var(--color-dark-100);
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-gold-300);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  min-width: 3rem;
  text-align: right;
  letter-spacing: 0.5px;
}

.knowledge-section {
  background: transparent;
  border-radius: 0;
  padding: 0;
  border: none;
}

/* Responsividade */
@media (max-width: 1024px) {
  .home-content {
    grid-template-columns: 280px 1fr;
    gap: 1.5rem;
  }

  .main-container {
    padding: 0 1.5rem;
  }
}

@media (max-width: 768px) {
  .home-page {
    padding: 0;
  }

  .page-header {
    padding: 1.5rem 1rem 1rem 1rem;
    margin-bottom: 2rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .page-subtitle {
    font-size: 0.875rem;
  }

  .main-container {
    padding: 0 1rem;
  }

  .home-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .profile-sidebar {
    position: static;
  }

  .profile-card {
    padding: 1rem;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }

  .studying-section {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .books-list {
    gap: 0.75rem;
  }

  .book-item {
    padding: 0.75rem;
  }

  .reading-progress {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }

  .progress-text {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .profile-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  .stat-value {
    font-size: 1.125rem;
  }

  .book-title {
    font-size: 1rem;
  }

  .main-container {
    padding: 0 0.5rem;
  }
}
</style>
