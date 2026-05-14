import type { NavItem, Project, SocialLink } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
];

export const HERO_DATA = {
  name: 'Roberto Aleydon',
  title: 'Aleydon',
  bio: 'A dedicated Full Stack Developer focused on building functional and responsive web applications. I enjoy tackling new challenges and transforming ideas into clean, working code while constantly expanding my technical toolkit.',
  resumeUrl: '/resume.pdf',
  avatarUrl: '/images/avatar.jpeg',
  avatarAlt: 'Roberto Aleydon profile photo'
} as const;

// Keeping only relevant projects or an empty array if we want only GitHub ones
// But having some manual control is good for descriptions
export const PROJECTS: Project[] = [
  {
    id: 'e-commerce',
    title: 'Bewear E-commerce',
    year: '2024',
    tag: 'Full Stack',
    excerpt:
      'A modern e-commerce platform built with Next.js, featuring a robust product catalog, shopping cart, and secure authentication.',
    imageUrl: '/images/dashboard-preview.svg', // Fallback, but lib/github will override if it finds a better one
    imageAlt: 'E-commerce preview',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind',
      'PostgreSQL',
      'Docker',
      'Jest',
      'Storybook'
    ],
    repoUrl: 'https://github.com/Aleydon/e-commerce'
  },
  {
    id: 'Pomodoro-Timer',
    title: 'Chronos Pomodoro',
    year: '2024',
    tag: 'Productivity',
    excerpt:
      'Efficient time management tool based on the Pomodoro Technique to help users stay focused and productive.',
    imageUrl: '/images/chronos-pomodoro.png',
    imageAlt: 'Pomodoro timer preview',
    technologies: ['React', 'Vite', 'Tailwind', 'CSS', 'TypeScript'],
    repoUrl: 'https://github.com/Aleydon/Pomodoro-Timer'
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'fb',
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: 'facebook'
  },
  {
    id: 'ig',
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: 'instagram'
  },
  { id: 'tw', label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  {
    id: 'li',
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: 'linkedin'
  },
  {
    id: 'gh',
    label: 'GitHub',
    href: 'https://github.com/Aleydon',
    icon: 'github'
  }
];
