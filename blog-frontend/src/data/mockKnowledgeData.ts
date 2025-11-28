import type { KnowledgeActivity, Category } from '@/types/knowledge'

export const categories: Category[] = [
  {
    id: 'programming',
    name: 'Programação',
    color: '#41b883',
    description: 'Código, algoritmos, desenvolvimento'
  },
  {
    id: 'research',
    name: 'Pesquisa',
    color: '#3178c6',
    description: 'Artigos, papers, investigação acadêmica'
  },
  {
    id: 'writing',
    name: 'Escrita',
    color: '#9f7aea',
    description: 'Documentação, anotações, conteúdo'
  },
  {
    id: 'design',
    name: 'Design',
    color: '#ec4899',
    description: 'UX/UI, interfaces, experiência'
  },
  {
    id: 'ai-ml',
    name: 'IA & Machine Learning',
    color: '#f59e0b',
    description: 'Inteligência artificial, modelos, dados'
  },
  {
    id: 'infrastructure',
    name: 'Infraestrutura',
    color: '#ef4444',
    description: 'DevOps, cloud, sistemas'
  }
]

// 🔥 DADOS FICTÍCIOS ATUALIZADOS - compatíveis com o modelo de horas
export const mockActivities: KnowledgeActivity[] = [
  // Atividades RECENTES (últimas 24 horas)
  {
    id: '1',
    timestamp: new Date(), // Agora mesmo
    category: 'programming',
    volume: 3500,
    filesChanged: ['vue-composition-guide.md'],
    description: 'Finalizando guia Composition API'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
    category: 'research',
    volume: 2800,
    filesChanged: ['ml-papers.md', 'transformer-arch.md'],
    description: 'Estudo arquiteturas Transformer'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 horas atrás
    category: 'writing',
    volume: 4200,
    filesChanged: ['project-docs.md'],
    description: 'Documentação do projeto'
  },

  // Ontem
  {
    id: '4',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 horas atrás
    category: 'design',
    volume: 1800,
    filesChanged: ['ui-patterns.md'],
    description: 'Padrões de interface'
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000), // 26 horas atrás
    category: 'ai-ml',
    volume: 7500,
    filesChanged: ['neural-networks.md', 'training-methods.md'],
    description: 'Redes neurais e métodos de treino'
  },

  // Esta semana
  {
    id: '6',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 dias atrás
    category: 'programming',
    volume: 5200,
    filesChanged: ['typescript-advanced.md', 'generics-examples.md'],
    description: 'TypeScript avançado'
  },
  {
    id: '7',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 dias atrás
    category: 'infrastructure',
    volume: 3200,
    filesChanged: ['docker-setup.md'],
    description: 'Configuração Docker'
  },
  {
    id: '8',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 dias atrás
    category: 'research',
    volume: 6100,
    filesChanged: ['academic-papers.md'],
    description: 'Revisão bibliográfica'
  },

  // Última semana
  {
    id: '9',
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 dias atrás
    category: 'writing',
    volume: 8900,
    filesChanged: ['technical-writing.md', 'blog-post.md'],
    description: 'Escrita técnica'
  },
  {
    id: '10',
    timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 dias atrás
    category: 'ai-ml',
    volume: 12500,
    filesChanged: ['deep-learning.md', 'pytorch-guide.md'],
    description: 'Deep Learning com PyTorch'
  },

  // Este mês
  {
    id: '11',
    timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 dias atrás
    category: 'programming',
    volume: 6800,
    filesChanged: ['vue-performance.md'],
    description: 'Otimização Vue.js'
  },
  {
    id: '12',
    timestamp: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000), // 18 dias atrás
    category: 'design',
    volume: 2400,
    filesChanged: ['color-theory.md'],
    description: 'Teoria das cores'
  },
  {
    id: '13',
    timestamp: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000), // 22 dias atrás
    category: 'infrastructure',
    volume: 5300,
    filesChanged: ['ci-cd-pipeline.md'],
    description: 'Pipeline CI/CD'
  },

  // Último mês
  {
    id: '14',
    timestamp: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000), // 35 dias atrás
    category: 'research',
    volume: 7200,
    filesChanged: ['literature-review.md'],
    description: 'Revisão de literatura'
  },
  {
    id: '15',
    timestamp: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000), // 40 dias atrás
    category: 'writing',
    volume: 4500,
    filesChanged: ['documentation-style.md'],
    description: 'Estilo de documentação'
  },

  // Este ano (distribuído)
  {
    id: '16',
    timestamp: new Date('2024-03-15T10:00:00'),
    category: 'programming',
    volume: 8200,
    filesChanged: ['web-components.md'],
    description: 'Web Components'
  },
  {
    id: '17',
    timestamp: new Date('2024-02-10T14:30:00'),
    category: 'ai-ml',
    volume: 15600,
    filesChanged: ['nlp-basics.md', 'word-embeddings.md'],
    description: 'Processamento de linguagem natural'
  },
  {
    id: '18',
    timestamp: new Date('2024-01-20T09:15:00'),
    category: 'infrastructure',
    volume: 6700,
    filesChanged: ['cloud-architecture.md'],
    description: 'Arquitetura cloud'
  },
  {
    id: '19',
    timestamp: new Date('2024-04-05T16:45:00'),
    category: 'design',
    volume: 3100,
    filesChanged: ['ux-research.md'],
    description: 'Pesquisa UX'
  },
  {
    id: '20',
    timestamp: new Date('2024-05-12T11:20:00'),
    category: 'research',
    volume: 9400,
    filesChanged: ['scientific-method.md'],
    description: 'Método científico'
  }
]
