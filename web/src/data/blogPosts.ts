import type { ModalId } from '@/context/ModalContext'

export type BlogPost = {
  modalId: ModalId
  category: string
  title: string
  description: string
  image: string
  imageAlt: string
  dateLabel: string
  readTime: string
}

export const blogPosts: BlogPost[] = [
  {
    modalId: 'blog-structural-survey',
    category: 'Construction tips',
    title: '5 Signs Your Home Needs a Structural Survey Before Renovation',
    description:
      'Before undertaking any major renovation, understanding your property’s structural integrity can save tens of thousands and prevent dangerous surprises down the line.',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=960&auto=format&fit=crop&q=80',
    imageAlt: 'Construction site with crane and steel framework',
    dateLabel: 'March 2025',
    readTime: '6 min',
  },
  {
    modalId: 'blog-sustainability-uk',
    category: 'Sustainability',
    title: 'How Sustainable Practices Are Reshaping UK Construction',
    description:
      'From passive house design to reclaimed materials, the industry is undergoing a green revolution — and how we deliver projects is changing with it.',
    image:
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=960&auto=format&fit=crop&q=80',
    imageAlt: 'Modern building with green living wall and glass facade',
    dateLabel: 'February 2025',
    readTime: '8 min',
  },
  {
    modalId: 'blog-extension-budget',
    category: 'Budget guide',
    title: 'How to Budget Your Extension Project: A Complete 2025 Guide',
    description:
      'Material costs, labour rates, and planning fees explained clearly — everything you need to plan a realistic budget for your home extension.',
    image:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=960&auto=format&fit=crop&q=80',
    imageAlt: 'Desk with calculator, documents, and coffee planning finances',
    dateLabel: 'January 2025',
    readTime: '10 min',
  },
]
