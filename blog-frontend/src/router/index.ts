import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/Home/HomePage.vue')
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('@/pages/Posts/PostsListPage.vue')
    },
    {
      path: '/posts/:id',
      name: 'post-details',
      component: () => import('@/pages/Posts/PostDetailsPage.vue')
    },
    {
      path: '/acervo',
      name: 'acervo',
      component: () => import('@/pages/Acervo/AcervoPage.vue')
    }
  ]
})

export default router
