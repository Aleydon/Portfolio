import type { NavItem, SocialLink } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
];

export const HERO_DATA = {
  name: 'Roberto Aleydon',
  title: 'Aleydon',
  bio: 'Desenvolvedor Full Stack dedicado, focado na criação de aplicações web funcionais e responsivas. Gosto de enfrentar novos desafios e transformar ideias em código limpo e funcional, enquanto amplio constantemente meu repertório técnico.',
  resumeUrl: '/resume.pdf',
  avatarUrl: '/images/avatar.png',
  avatarAlt: 'Roberto Aleydon profile photo'
} as const;

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
