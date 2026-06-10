import type { ComponentType } from 'react';

import * as Icons from '@/components/ui/icons';
import type { IconProps } from '@/components/ui/icons/types';

export type IconName =
  | 'react'
  | 'nextjs'
  | 'tailwind'
  | 'css'
  | 'docker'
  | 'postgresql'
  | 'github'
  | 'jest'
  | 'typescript'
  | 'javascript'
  | 'storybook'
  | 'vite'
  | 'prisma'
  | 'drizzle';

export const ICON_MAP: Record<IconName, ComponentType<IconProps>> = {
  react: Icons.ReactIcon,
  nextjs: Icons.NextIcon,
  tailwind: Icons.TailwindIcon,
  css: Icons.CssIcon,
  docker: Icons.DockerIcon,
  postgresql: Icons.PostgreSql,
  github: Icons.GitHubIcon,
  jest: Icons.JestIcon,
  // Mapping missing ones to most relevant or github as fallback for now
  typescript: Icons.ReactIcon, // Placeholder or use a generic one
  javascript: Icons.ReactIcon,
  storybook: Icons.ReactIcon,
  vite: Icons.ReactIcon,
  prisma: Icons.PostgreSql,
  drizzle: Icons.PostgreSql
};

export const TECHNOLOGY_ICONS: Record<string, IconName> = {
  React: 'react',
  'Next.js': 'nextjs',
  Nextjs: 'nextjs',
  Tailwind: 'tailwind',
  'Tailwind CSS': 'tailwind',
  CSS: 'css',
  Docker: 'docker',
  PostgreSQL: 'postgresql',
  Postgres: 'postgresql',
  GitHub: 'github',
  Jest: 'jest',
  TypeScript: 'typescript',
  Javascript: 'javascript',
  Storybook: 'storybook',
  Vite: 'vite',
  Prisma: 'prisma',
  Drizzle: 'drizzle'
};
