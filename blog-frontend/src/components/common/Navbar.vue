<template>
  <nav class="navbar">
    <div class="nav-container">
      <h1 class="site-title">MeuBlog</h1>

      <ul class="nav-menu">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="nav-link-active">
            Home
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/posts" class="nav-link" active-class="nav-link-active">
            Postagens
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/acervo" class="nav-link" active-class="nav-link-active">
            Acervo
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.navbar {
  background: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 0;
  font-family: var(--font-mono);
  text-transform: uppercase;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.site-title {
  font-size: 1.5rem;
  font-weight: normal;
  color: var(--color-text-primary);
  font-family: var(--font-mono);
  margin: 0;
  letter-spacing: 1px;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0;
}

.nav-link {
  color: var(--color-text-primary);
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid transparent;
  transition: all 0.2s var(--ease-snappy);
  letter-spacing: 0.5px;
}

.nav-link:hover {
  border-bottom: 1px solid var(--color-gold-300);
  color: var(--color-gold-300);
}

.nav-link-active {
  border-bottom: 1px solid var(--color-gold-300);
  color: var(--color-gold-300);
}

/* Responsividade */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-menu {
    gap: 1.5rem;
  }

  .site-title {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .nav-menu {
    gap: 1rem;
  }

  .nav-link {
    font-size: 0.875rem;
  }
}
</style>
