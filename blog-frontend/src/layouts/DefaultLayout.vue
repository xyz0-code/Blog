<template>
  <div class="default-layout luxury-terminal">
    <Navbar />

    <main class="main-content luxury-bg">
      <div class="container">
        <slot />
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/common/Navbar.vue'
import Footer from '@/components/common/Footer.vue'
</script>

<style scoped>
.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: 'PPMondwest', monospace;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-primary);
}

/* Aplicar fonte quando carregada */
.fonts-loaded .default-layout {
  font-family: 'PPMondwest', monospace !important;
}

/* Container responsivo */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Responsividade */
@media (max-width: 768px) {
  .container {
    padding: 1.5rem 1rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 1rem 0.75rem;
  }
}
</style>
