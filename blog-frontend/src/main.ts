import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// ⚠️ IMPORTANTE: Importe o arquivo CSS aqui!
import '@/assets/css/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Verificar se as fontes carregaram e adicionar classe ao body
document.fonts.ready.then(() => {
  document.body.classList.add('fonts-loaded')
  console.log('✅ Fontes carregadas com sucesso!')
}).catch((error) => {
  console.warn('⚠️ Fontes não carregadas, usando fallback:', error)
  document.body.classList.add('fonts-fallback')
})

app.mount('#app')
