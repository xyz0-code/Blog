import type { Book } from '@/types/books'

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'O Estrangeiro',
    author: 'Albert Camus',
    description: 'Romance filosófico que explora o absurdo da existência humana através da história de Meursault.',
    status: 'read',
    progress: 100,
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-02-01'),
    rating: 5,
    categories: ['Filosofia', 'Ficção', 'Existencialismo'],
    pages: 123,
    notes: 'Livro incrível que me fez refletir sobre a liberdade e a autenticidade.'
  },
  {
    id: '2',
    title: 'Domain-Driven Design',
    author: 'Eric Evans',
    description: 'Abordagem para o desenvolvimento de software complexo conectando a implementação a um modelo em evolução.',
    status: 'reading',
    progress: 65,
    startDate: new Date('2024-03-01'),
    categories: ['Programação', 'Arquitetura', 'DDD'],
    pages: 560,
    currentPage: 364,
    notes: 'Releitura para aprofundar nos conceitos de bounded contexts.'
  },
  {
    id: '3',
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    description: 'Guia para escrever sistemas de software sustentáveis e com arquitetura limpa.',
    status: 'read',
    progress: 100,
    startDate: new Date('2024-02-10'),
    endDate: new Date('2024-03-15'),
    rating: 4,
    categories: ['Programação', 'Arquitetura', 'Boas Práticas'],
    pages: 432,
    notes: 'Excelente para entender os princípios SOLID na prática.'
  },
  {
    id: '4',
    title: 'Sapiens: Uma Breve História da Humanidade',
    author: 'Yuval Noah Harari',
    description: 'Narrativa sobre a história da humanidade desde a evolução do Homo sapiens na Idade da Pedra.',
    status: 'to-read',
    categories: ['História', 'Antropologia', 'Não-ficção'],
    pages: 443
  },
  {
    id: '5',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    description: 'O guia definitivo para construir aplicações confiáveis, escaláveis e maintaináveis.',
    status: 'reading',
    progress: 30,
    startDate: new Date('2024-04-01'),
    categories: ['Programação', 'Bancos de Dados', 'Sistemas Distribuídos'],
    pages: 611,
    currentPage: 183
  },
  {
    id: '6',
    title: 'A Revolução dos Bichos',
    author: 'George Orwell',
    description: 'Sátira política que narra uma rebelião dos animais contra seus donos humanos.',
    status: 'read',
    progress: 100,
    startDate: new Date('2024-01-05'),
    endDate: new Date('2024-01-12'),
    rating: 5,
    categories: ['Ficção', 'Política', 'Sátira'],
    pages: 152,
    notes: 'Leitura obrigatória sobre poder e corrupção.'
  },
  {
    id: '7',
    title: 'Structure and Interpretation of Computer Programs',
    author: 'Harold Abelson, Gerald Jay Sussman',
    description: 'Clássico texto introdutório em ciência da computação usando Scheme.',
    status: 'to-read',
    categories: ['Programação', 'Ciência da Computação', 'LISP'],
    pages: 657
  }
]

export const bookCategories = [
  'Programação',
  'Filosofia',
  'Ficção',
  'História',
  'Arquitetura',
  'Ciência da Computação',
  'Política',
  'Antropologia',
  'Não-ficção',
  'Sátira',
  'DDD',
  'Sistemas Distribuídos',
  'Bancos de Dados',
  'Boas Práticas',
  'Existencialismo'
]
